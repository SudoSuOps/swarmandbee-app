// Order book client — talks to the sovereign FastAPI shim on the Synology NAS.
//
// Shim URL: https://orderbook.swarmandbee.ai (CF Tunnel → 192.168.0.102:18489)
// Auth:     X-Orderbook-Key header (must match shim env ORDERBOOK_API_KEY)
//
// CF Pages Functions get the URL + key from env. The shim owns the database;
// this module is just a typed HTTPS client.

export interface OrderBookEnv {
  ORDERBOOK_BASE_URL?: string;
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

export class OrderBookClient {
  constructor(private baseUrl: string, private apiKey: string) {}

  static fromEnv(env: OrderBookEnv): OrderBookClient {
    const base = (env.ORDERBOOK_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
    const key = env.ORDERBOOK_API_KEY;
    if (!key) {
      throw new Error("ORDERBOOK_API_KEY env var not set on CF Pages — shim auth will fail.");
    }
    return new OrderBookClient(base, key);
  }

  private async _post<T>(path: string, body: unknown): Promise<{ status: number; body: T }> {
    const r = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Orderbook-Key": this.apiKey,
      },
      body: JSON.stringify(body),
    });
    let parsed: T;
    try {
      parsed = (await r.json()) as T;
    } catch {
      throw new Error(`shim ${path} returned non-JSON (status ${r.status})`);
    }
    return { status: r.status, body: parsed };
  }

  async createOrder(input: OrderInput): Promise<string> {
    const { status, body } = await this._post<{ ok: boolean; order_id?: string; detail?: string }>(
      "/orders",
      input,
    );
    if (status >= 200 && status < 300 && body.ok && body.order_id) {
      return body.order_id;
    }
    throw new Error(`shim createOrder failed (${status}): ${body.detail || JSON.stringify(body)}`);
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
