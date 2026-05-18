// Order book client — talks to the sovereign FastAPI shim on the Synology NAS.
//
// Two independent public paths to the same shim:
//   Primary:   ORDERBOOK_BASE_URL          (default: https://orderbook.swarmandbee.ai · CF Tunnel)
//   Fallback:  ORDERBOOK_FALLBACK_BASE_URL (default: https://minechain-nas-1.tail80f341.ts.net · Tailscale Funnel)
//
// Both terminate at the same FastAPI shim at 192.168.0.102:18489. If the
// primary returns 5xx or times out on a mutating call, the client retries
// once against the fallback. Read paths (lookup/list/healthz/canary) do NOT
// fail over — the watchdog Worker probes both paths and tells us which leg
// is sick.
//
// Auth: X-Orderbook-Key header (same key works against both legs because
// it's the same shim).

export interface OrderBookEnv {
  ORDERBOOK_BASE_URL?: string;
  ORDERBOOK_FALLBACK_BASE_URL?: string;
  ORDERBOOK_API_KEY?: string;
  RESEND_API_KEY?: string;
  ORDER_RECEIPT_FROM?: string;
}

export interface OrderInput {
  channel: "cli" | "web-box" | "web-bounty";
  email: string;
  name: string;
  company?: string;
  sku?: string;
  sku_id?: string;
  domain?: string;
  pairs_requested?: number;
  failure_mode?: string;
  notes?: string;
  budget?: string;
  deadline?: string;
  settlement_rail?: "stripe" | "swarmusdc" | "either";
  picks_json?: string;
  bundle_hash?: string;
  payload_sha256: string;
  user_agent?: string;
}

export interface OrderRow {
  order_id: string;
  email: string;
  name: string;
  company: string | null;
  channel: string;
  sku: string | null;
  sku_id: string | null;
  domain: string | null;
  pairs_requested: number | null;
  failure_mode: string | null;
  notes: string | null;
  budget: string | null;
  deadline: string | null;
  settlement_rail: string | null;
  status: string;
  status_updated_at: string;
  invoice_url: string | null;
  invoice_amount_usd: number | null;
  paid_at: string | null;
  payment_tx_ref: string | null;
  assembled_at: string | null;
  shipped_at: string | null;
  bundle_sha256: string | null;
  download_url: string | null;
  download_expires_at: string | null;
  hedera_anchor_tx: string | null;
  payload_sha256: string;
  user_agent: string | null;
  created_at: string;
}

const DEFAULT_BASE = "https://orderbook.swarmandbee.ai";
const DEFAULT_FALLBACK_BASE = "https://minechain-nas-1.tail80f341.ts.net";

// Routes that may failover from CF Tunnel → Tailscale Funnel.
// Failover ONLY on mutating order-flow paths so a read-side outage doesn't
// silently mask itself.
const FAILOVER_PATHS = new Set(["/orders"]);

export interface PostResult<T> {
  status: number;
  body: T;
  via: "primary" | "fallback";
  primary_status?: number;
  primary_error?: string;
}

export class OrderBookClient {
  constructor(
    private baseUrl: string,
    private fallbackBaseUrl: string,
    private apiKey: string,
  ) {}

  static fromEnv(env: OrderBookEnv): OrderBookClient {
    const base = (env.ORDERBOOK_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
    const fallback = (env.ORDERBOOK_FALLBACK_BASE_URL || DEFAULT_FALLBACK_BASE).replace(/\/+$/, "");
    const key = env.ORDERBOOK_API_KEY;
    if (!key) {
      throw new Error("ORDERBOOK_API_KEY env var not set on CF Pages — shim auth will fail.");
    }
    return new OrderBookClient(base, fallback, key);
  }

  private async _fetchOne(baseUrl: string, path: string, body: unknown, timeoutMs = 12_000): Promise<Response> {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Orderbook-Key": this.apiKey,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(t);
    }
  }

  private async _post<T>(path: string, body: unknown): Promise<PostResult<T>> {
    const allowFailover = FAILOVER_PATHS.has(path);

    let primary_status: number | undefined;
    let primary_error: string | undefined;

    try {
      const r = await this._fetchOne(this.baseUrl, path, body);
      primary_status = r.status;
      // Failover only on 5xx (server-side). 4xx is a client mistake; same
      // mistake will hit fallback identically, so don't retry.
      if (r.status < 500) {
        let parsed: T;
        try {
          parsed = (await r.json()) as T;
        } catch {
          throw new Error(`shim ${path} returned non-JSON (status ${r.status})`);
        }
        return { status: r.status, body: parsed, via: "primary" };
      }
      primary_error = `HTTP ${r.status}`;
    } catch (e) {
      primary_error = (e as Error).message;
    }

    if (!allowFailover || !this.fallbackBaseUrl || this.fallbackBaseUrl === this.baseUrl) {
      throw new Error(
        `shim ${path} primary failed (${primary_status ?? "fetch-error"}: ${primary_error}); no failover for this path`,
      );
    }

    const r2 = await this._fetchOne(this.fallbackBaseUrl, path, body);
    let parsed: T;
    try {
      parsed = (await r2.json()) as T;
    } catch {
      throw new Error(`shim ${path} fallback returned non-JSON (status ${r2.status})`);
    }
    return {
      status: r2.status,
      body: parsed,
      via: "fallback",
      primary_status,
      primary_error,
    };
  }

  async createOrder(
    input: OrderInput,
  ): Promise<{ order_id: string; via: "primary" | "fallback"; primary_status?: number; primary_error?: string }> {
    const r = await this._post<{ ok: boolean; order_id?: string; detail?: string }>("/orders", input);
    if (r.status >= 200 && r.status < 300 && r.body.ok && r.body.order_id) {
      return {
        order_id: r.body.order_id,
        via: r.via,
        primary_status: r.primary_status,
        primary_error: r.primary_error,
      };
    }
    throw new Error(`shim createOrder failed (${r.status}): ${r.body.detail || JSON.stringify(r.body)}`);
  }

  async lookupOrder(
    order_id: string,
    email: string,
  ): Promise<{ order: OrderRow; events: Array<Record<string, unknown>> } | null> {
    const { status, body } = await this._post<{
      ok: boolean;
      order?: OrderRow;
      events?: Array<Record<string, unknown>>;
    }>("/orders/lookup", { order_id, email });
    if (status === 404) return null;
    if (status >= 200 && status < 300 && body.ok && body.order) {
      return { order: body.order, events: body.events ?? [] };
    }
    throw new Error(`shim lookupOrder failed (${status})`);
  }

  async listOrdersForEmail(email: string, limit = 50): Promise<OrderRow[]> {
    const { status, body } = await this._post<{ ok: boolean; orders?: OrderRow[] }>(
      "/orders/list",
      { email, limit },
    );
    if (status >= 200 && status < 300 && body.ok) {
      return body.orders ?? [];
    }
    throw new Error(`shim listOrders failed (${status})`);
  }

  async logEvent(
    order_id: string,
    event: {
      event_type: string;
      actor: string;
      from_status?: string;
      to_status?: string;
      detail?: string;
    },
  ): Promise<void> {
    await this._post("/events", { order_id, ...event });
  }

  async recordReceipt(
    order_id: string,
    receipt: {
      receipt_type: string;
      email_to: string;
      email_subject?: string;
      email_provider?: string;
      email_provider_id?: string;
      delivered?: boolean;
      error?: string;
    },
  ): Promise<void> {
    await this._post("/receipts", { order_id, ...receipt });
  }
}

// ─── helpers (still useful at the function layer) ───────────────────────────

export async function sha256Hex(payload: object | string): Promise<string> {
  const text =
    typeof payload === "string"
      ? payload
      : JSON.stringify(payload, Object.keys(payload as object).sort());
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
