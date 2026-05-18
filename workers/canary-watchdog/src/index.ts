// canary-watchdog · CF Worker
//
// Two cron triggers + a webhook receiver:
//   * * * * *   → probe BOTH ingress legs (CF Tunnel + Tailscale Funnel).
//                 Alerts independently: [DOWN-CF], [DOWN-TS], [DOWN-BOTH].
//                 Only [DOWN-BOTH] means customers can't buy.
//   5 0 * * *   → daily /healthz n_orders snapshot diff vs yesterday.
//                 Alert on drop or weekday flatline.
//
// /webhooks/tailscale → receives HMAC-signed events from Tailscale admin
//                       (nodeKeyExpiringSoon, nodeDeleted, policyUpdate, etc.)
//                       Routes to Resend with severity per event type.
//
// State lives in CANARY_KV. Alerts go via Resend to env.ALERT_TO.

export interface Env {
  CANARY_KV: KVNamespace;
  RESEND_API_KEY: string;
  ALERT_TO: string;
  ALERT_FROM?: string;
  // Ingress URLs — two independent public paths to the same NAS shim
  CANARY_URL_CF?: string;   // primary, via CF Tunnel
  CANARY_URL_TS?: string;   // secondary, via Tailscale Funnel
  HEALTHZ_URL_CF?: string;
  HEALTHZ_URL_TS?: string;
  // Legacy single-URL fallback (read if dual not configured)
  CANARY_URL?: string;
  HEALTHZ_URL?: string;
  ALERT_DEBOUNCE_MIN?: string;
  TRIGGER_KEY?: string;
  TS_WEBHOOK_SECRET?: string;  // shared secret with Tailscale admin webhook
}

const DEFAULT_CANARY_CF = "https://bakery.swarmandbee.ai/api/canary";
const DEFAULT_HEALTHZ_CF = "https://bakery.swarmandbee.ai/healthz";
const DEFAULT_CANARY_TS = "https://minechain-nas-1.tail80f341.ts.net/canary";
const DEFAULT_HEALTHZ_TS = "https://minechain-nas-1.tail80f341.ts.net/healthz";
const DEFAULT_ALERT_FROM = "Swarm Watchdog <watchdog@swarmandbee.ai>";

type Leg = "cf" | "ts";

interface LegState {
  last_status: "ok" | "fail";
  consecutive_fails: number;
  last_check_at: number;
  last_elapsed_ms: number;
  last_detail: string;
  last_alert_sent_at: number;
  last_status_change_at: number;
}

interface CanaryState {
  cf: LegState;
  ts: LegState;
}

const DEFAULT_LEG_STATE: LegState = {
  last_status: "ok",
  consecutive_fails: 0,
  last_check_at: 0,
  last_elapsed_ms: 0,
  last_detail: "",
  last_alert_sent_at: 0,
  last_status_change_at: 0,
};

const DEFAULT_STATE: CanaryState = {
  cf: { ...DEFAULT_LEG_STATE },
  ts: { ...DEFAULT_LEG_STATE },
};

// ─── entry points ─────────────────────────────────────────────────────────

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    const cron = event.cron;
    if (cron === "* * * * *") {
      ctx.waitUntil(runCanary(env).catch((e) => console.error("[canary] fatal:", e)));
      return;
    }
    if (cron === "5 0 * * *") {
      ctx.waitUntil(runDailyOrderCount(env).catch((e) => console.error("[daily] fatal:", e)));
      return;
    }
    console.warn(`[scheduled] unknown cron: ${cron}`);
  },

  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === "/status") {
      const state = await getState(env);
      return json({ ok: true, state, now: Date.now() });
    }

    if (path === "/history") {
      const hist = (await env.CANARY_KV.get("canary_history", "json")) || [];
      return json({ ok: true, history: hist });
    }

    if (path === "/run-canary" && method === "POST") {
      if (!authorizeTrigger(request, env)) return json({ ok: false, error: "unauthorized" }, 401);
      const r = await runCanary(env);
      return json(r);
    }

    if (path === "/run-daily" && method === "POST") {
      if (!authorizeTrigger(request, env)) return json({ ok: false, error: "unauthorized" }, 401);
      const r = await runDailyOrderCount(env);
      return json(r);
    }

    if (path === "/webhooks/tailscale" && method === "POST") {
      return handleTailscaleWebhook(request, env);
    }

    if (path === "/" || path === "/help") {
      return new Response(
        [
          "canary-watchdog · Swarm & Bee",
          "",
          "Cron probes:",
          "  * * * * *   probe BOTH ingress legs (CF Tunnel + Tailscale Funnel)",
          "  5 0 * * *   daily n_orders diff vs yesterday (uses CF leg's /healthz)",
          "",
          "Alert subjects:",
          "  [DOWN-CF]    CF Tunnel down, TS Funnel still serving — degraded",
          "  [DOWN-TS]    TS Funnel down, CF Tunnel still serving — degraded",
          "  [DOWN-BOTH]  both legs down — customers cannot buy",
          "  [RECOVERED-*] when a previously-failing leg comes back",
          "",
          "Endpoints:",
          "  GET  /status              current per-leg KV state",
          "  GET  /history             last ~24h ring buffer",
          "  POST /run-canary          manual probe (X-Trigger-Key if set)",
          "  POST /run-daily           manual daily check (X-Trigger-Key if set)",
          "  POST /webhooks/tailscale  Tailscale admin event receiver (HMAC-signed)",
          "",
        ].join("\n"),
        { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    }

    return new Response("not found\n", { status: 404 });
  },
};

// ─── auth + helpers ────────────────────────────────────────────────────────

function authorizeTrigger(request: Request, env: Env): boolean {
  if (!env.TRIGGER_KEY) return true;
  return request.headers.get("X-Trigger-Key") === env.TRIGGER_KEY;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function getState(env: Env): Promise<CanaryState> {
  const raw = (await env.CANARY_KV.get("canary_state", "json")) as Partial<CanaryState> | null;
  return {
    cf: { ...DEFAULT_LEG_STATE, ...(raw?.cf || {}) },
    ts: { ...DEFAULT_LEG_STATE, ...(raw?.ts || {}) },
  };
}

async function putState(env: Env, state: CanaryState): Promise<void> {
  await env.CANARY_KV.put("canary_state", JSON.stringify(state));
}

// ─── probe one ingress leg ────────────────────────────────────────────────

interface ProbeResult {
  leg: Leg;
  ok: boolean;
  http_status: number;
  elapsed_ms: number;
  detail: string;
  body_snippet: string;
  url: string;
}

function urlForLeg(env: Env, leg: Leg): string {
  if (leg === "cf") return env.CANARY_URL_CF || env.CANARY_URL || DEFAULT_CANARY_CF;
  return env.CANARY_URL_TS || DEFAULT_CANARY_TS;
}

async function probeOne(env: Env, leg: Leg): Promise<ProbeResult> {
  const url = urlForLeg(env, leg);
  const started = Date.now();
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 15_000);
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      cf: { cacheTtl: 0, cacheEverything: false },
      signal: controller.signal,
    });
    clearTimeout(t);
    const text = await r.text().catch(() => "");
    const elapsed = Date.now() - started;
    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch { /* leave null */ }
    const ok = r.ok && parsed && parsed.ok === true;
    return {
      leg,
      ok,
      http_status: r.status,
      elapsed_ms: elapsed,
      detail: ok ? "" : `HTTP ${r.status}${parsed?.error ? ` ${parsed.error}` : ""}`,
      body_snippet: text.slice(0, 300),
      url,
    };
  } catch (e) {
    return {
      leg,
      ok: false,
      http_status: 0,
      elapsed_ms: Date.now() - started,
      detail: `fetch error: ${(e as Error).message}`,
      body_snippet: "",
      url,
    };
  }
}

async function pushHistory(env: Env, entry: object): Promise<void> {
  const hist = ((await env.CANARY_KV.get("canary_history", "json")) || []) as object[];
  hist.push(entry);
  const trimmed = hist.length > 1440 ? hist.slice(-1440) : hist;
  await env.CANARY_KV.put("canary_history", JSON.stringify(trimmed));
}

// ─── runCanary: probe both legs, route alerts ─────────────────────────────

export async function runCanary(env: Env): Promise<object> {
  const [cfProbe, tsProbe] = await Promise.all([probeOne(env, "cf"), probeOne(env, "ts")]);
  const state = await getState(env);
  const now = Date.now();
  const debounceMin = parseInt(env.ALERT_DEBOUNCE_MIN || "15", 10);

  const updateLeg = (leg: Leg, probe: ProbeResult): { alert: boolean; recovered: boolean } => {
    const ls = state[leg];
    const wasOk = ls.last_status === "ok";
    let alert = false;
    let recovered = false;
    if (probe.ok) {
      if (ls.consecutive_fails >= 2) recovered = true;
      ls.consecutive_fails = 0;
      ls.last_status = "ok";
      ls.last_detail = "";
      if (!wasOk) ls.last_status_change_at = now;
    } else {
      ls.consecutive_fails += 1;
      ls.last_status = "fail";
      ls.last_detail = probe.detail;
      if (wasOk) ls.last_status_change_at = now;
      const cooledOff = now - ls.last_alert_sent_at > debounceMin * 60_000;
      if (ls.consecutive_fails === 2 || (ls.consecutive_fails > 2 && cooledOff)) {
        alert = true;
        ls.last_alert_sent_at = now;
      }
    }
    ls.last_check_at = now;
    ls.last_elapsed_ms = probe.elapsed_ms;
    return { alert, recovered };
  };

  const cfResult = updateLeg("cf", cfProbe);
  const tsResult = updateLeg("ts", tsProbe);

  // Build combined alert
  const cfDown = !cfProbe.ok;
  const tsDown = !tsProbe.ok;
  let alertSubject = "";
  let alertBody = "";
  let severity: "BOTH" | "CF" | "TS" | "RECOVERED" | "" = "";

  if (cfDown && tsDown && (cfResult.alert || tsResult.alert)) {
    severity = "BOTH";
    alertSubject = `[DOWN-BOTH] bakery cash register · both ingress legs failing`;
    alertBody = legSummary(cfProbe, "CF Tunnel", state.cf) + "\n\n" + legSummary(tsProbe, "Tailscale Funnel", state.ts) +
      "\n\nBoth public paths to the shim are down. Customers cannot buy. Check NAS health first (192.168.0.102), then container state, then both tunnel sidecars.";
  } else if (cfDown && cfResult.alert) {
    severity = "CF";
    alertSubject = `[DOWN-CF] bakery CF Tunnel down · TS Funnel still serving (DEGRADED, not down)`;
    alertBody = legSummary(cfProbe, "CF Tunnel", state.cf) +
      "\n\nTS Funnel is still up — customer orders failover automatically. This is degraded, not an outage. Investigate cloudflared container on NAS.";
  } else if (tsDown && tsResult.alert) {
    severity = "TS";
    alertSubject = `[DOWN-TS] bakery Tailscale Funnel down · CF Tunnel still serving (DEGRADED)`;
    alertBody = legSummary(tsProbe, "Tailscale Funnel", state.ts) +
      "\n\nCF Tunnel is still serving customer orders. Fallback path is dark. Check tailscaled on NAS (`tailscale status`, `tailscale funnel status`).";
  } else if (cfResult.recovered && tsResult.recovered) {
    severity = "RECOVERED";
    alertSubject = "[RECOVERED-BOTH] bakery · both ingress legs back online";
    alertBody = `CF Tunnel back: ${cfProbe.elapsed_ms}ms\nTS Funnel back: ${tsProbe.elapsed_ms}ms`;
  } else if (cfResult.recovered) {
    severity = "RECOVERED";
    alertSubject = "[RECOVERED-CF] bakery CF Tunnel back";
    alertBody = `CF Tunnel back online: ${cfProbe.elapsed_ms}ms response.`;
  } else if (tsResult.recovered) {
    severity = "RECOVERED";
    alertSubject = "[RECOVERED-TS] bakery Tailscale Funnel back";
    alertBody = `TS Funnel back online: ${tsProbe.elapsed_ms}ms response.`;
  }

  if (alertSubject) {
    await sendAlert(env, alertSubject, alertBody);
  }

  await putState(env, state);
  await pushHistory(env, {
    ts: now,
    cf_ok: cfProbe.ok,
    cf_status: cfProbe.http_status,
    cf_ms: cfProbe.elapsed_ms,
    ts_ok: tsProbe.ok,
    ts_status: tsProbe.http_status,
    ts_ms: tsProbe.elapsed_ms,
    alert: severity,
  });

  return {
    cf: { ok: cfProbe.ok, status: cfProbe.http_status, ms: cfProbe.elapsed_ms, consecutive_fails: state.cf.consecutive_fails },
    ts: { ok: tsProbe.ok, status: tsProbe.http_status, ms: tsProbe.elapsed_ms, consecutive_fails: state.ts.consecutive_fails },
    alert: severity || "none",
  };
}

function legSummary(probe: ProbeResult, label: string, ls: LegState): string {
  const downForMin = ls.last_status_change_at
    ? Math.round((Date.now() - ls.last_status_change_at) / 60_000)
    : 0;
  return [
    `=== ${label} ===`,
    `URL: ${probe.url}`,
    `HTTP: ${probe.http_status}`,
    `Elapsed: ${probe.elapsed_ms} ms`,
    `Consecutive fails: ${ls.consecutive_fails}`,
    `Down for: ~${downForMin} min`,
    `Detail: ${probe.detail}`,
    `Response snippet: ${probe.body_snippet || "(empty)"}`,
  ].join("\n");
}

// ─── daily order count check ──────────────────────────────────────────────

interface DailyResult {
  ok: boolean;
  n_orders_today: number;
  n_orders_yesterday: number;
  delta: number;
  is_weekday: boolean;
  alert_sent: boolean;
  reason: string;
}

export async function runDailyOrderCount(env: Env): Promise<DailyResult> {
  const url = env.HEALTHZ_URL_CF || env.HEALTHZ_URL || DEFAULT_HEALTHZ_CF;
  let n_orders_today = -1;
  try {
    const r = await fetch(url, { cf: { cacheTtl: 0, cacheEverything: false } });
    const j: any = await r.json();
    n_orders_today = typeof j.n_orders === "number" ? j.n_orders : -1;
  } catch (e) {
    await sendAlert(
      env,
      "[DAILY-ERR] bakery count check could not reach /healthz",
      `URL: ${url}\nError: ${(e as Error).message}`,
    );
    return {
      ok: false,
      n_orders_today: -1,
      n_orders_yesterday: -1,
      delta: 0,
      is_weekday: false,
      alert_sent: true,
      reason: "healthz_unreachable",
    };
  }

  if (n_orders_today < 0) {
    return {
      ok: false,
      n_orders_today: -1,
      n_orders_yesterday: -1,
      delta: 0,
      is_weekday: false,
      alert_sent: false,
      reason: "no_count_field",
    };
  }

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const yKey = `n_orders_${yesterday}`;
  const todayKey = `n_orders_${today}`;
  const yRaw = await env.CANARY_KV.get(yKey);
  const n_orders_yesterday = yRaw ? parseInt(yRaw, 10) : -1;

  const dow = new Date().getUTCDay();
  const is_weekday = dow >= 1 && dow <= 5;

  let alertSent = false;
  let reason = "first_run_no_baseline";
  let delta = 0;

  if (n_orders_yesterday >= 0) {
    delta = n_orders_today - n_orders_yesterday;
    if (delta < 0) {
      reason = `count dropped by ${-delta} (yesterday ${n_orders_yesterday}, today ${n_orders_today})`;
      await sendAlert(
        env,
        "[ANOMALY] bakery order count DROPPED",
        `Yesterday (${yesterday}): ${n_orders_yesterday}\nToday (${today}): ${n_orders_today}\nDelta: ${delta}\n\nCount going backwards = manual deletion, DB corruption, or restore-from-backup. Investigate.`,
      );
      alertSent = true;
    } else if (delta === 0 && is_weekday) {
      reason = `count flatlined on weekday (still ${n_orders_today})`;
      await sendAlert(
        env,
        "[ANOMALY] bakery order count FLATLINED on weekday",
        `Yesterday (${yesterday}): ${n_orders_yesterday}\nToday (${today}): ${n_orders_today}\nDelta: 0\n\nZero net new orders on a weekday — pipeline may be dry, intake may be silently broken, or marketing is dark.`,
      );
      alertSent = true;
    } else {
      reason = `delta=${delta} (no alert)`;
    }
  }

  await env.CANARY_KV.put(todayKey, String(n_orders_today), { expirationTtl: 90 * 86_400 });

  return {
    ok: true,
    n_orders_today,
    n_orders_yesterday,
    delta,
    is_weekday,
    alert_sent: alertSent,
    reason,
  };
}

// ─── Tailscale webhook receiver ───────────────────────────────────────────

async function handleTailscaleWebhook(request: Request, env: Env): Promise<Response> {
  if (!env.TS_WEBHOOK_SECRET) {
    return json({ ok: false, error: "TS_WEBHOOK_SECRET not configured" }, 501);
  }

  const sig = request.headers.get("Tailscale-Webhook-Signature") || "";
  const body = await request.text();

  const valid = await verifyTailscaleSignature(env.TS_WEBHOOK_SECRET, body, sig);
  if (!valid) {
    return json({ ok: false, error: "invalid signature" }, 401);
  }

  let events: any[] = [];
  try {
    const parsed = JSON.parse(body);
    events = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return json({ ok: false, error: "invalid JSON" }, 400);
  }

  for (const ev of events) {
    await handleTailscaleEvent(env, ev);
  }

  return json({ ok: true, received: events.length });
}

interface TailscaleEvent {
  timestamp?: string;
  version?: number;
  type?: string;
  tailnet?: string;
  message?: string;
  data?: any;
}

async function handleTailscaleEvent(env: Env, ev: TailscaleEvent): Promise<void> {
  const type = ev.type || "unknown";
  const data = ev.data || {};

  // Severity routing: high-priority events get [TS-CRITICAL], others [TS-INFO]
  const critical = new Set([
    "nodeKeyExpired",
    "nodeDeleted",
    "userDeleted",
    "subnetIpForwardingNotEnabled",
    "exitNodeIpForwardingNotEnabled",
    "tailnetLockLocked",
  ]);
  const warning = new Set([
    "nodeKeyExpiringSoon",
    "policyUpdate",
    "nodeAuthorized",
    "nodeCreated",
    "nodeApprovalRequested",
    "subnetRouteApproved",
    "userApproved",
  ]);

  const sev = critical.has(type) ? "CRITICAL" : warning.has(type) ? "WARNING" : "INFO";
  const subject = `[TS-${sev}] Tailscale event: ${type}`;
  const lines = [
    `Event: ${type}`,
    `Tailnet: ${ev.tailnet || "—"}`,
    `Time: ${ev.timestamp || new Date().toISOString()}`,
    `Message: ${ev.message || "—"}`,
    ``,
    `Raw data:`,
    JSON.stringify(data, null, 2).slice(0, 2000),
  ];

  // Store in KV ring buffer for /history-like lookups
  try {
    const histKey = "tailscale_event_history";
    const hist = ((await env.CANARY_KV.get(histKey, "json")) || []) as object[];
    hist.push({ ts: Date.now(), type, severity: sev, message: ev.message, tailnet: ev.tailnet });
    const trimmed = hist.length > 500 ? hist.slice(-500) : hist;
    await env.CANARY_KV.put(histKey, JSON.stringify(trimmed));
  } catch (e) {
    console.error("[ts-webhook] history write failed:", (e as Error).message);
  }

  // INFO events: log only, don't email (avoid noise)
  if (sev === "INFO") {
    console.log(`[ts-webhook/info] ${type}: ${ev.message || ""}`);
    return;
  }

  await sendAlert(env, subject, lines.join("\n"));
}

async function verifyTailscaleSignature(
  secret: string,
  rawBody: string,
  sigHeader: string,
): Promise<boolean> {
  // Header format per Tailscale docs:
  //   Tailscale-Webhook-Signature: t=<unix-ts>,v1=<hex-hmac-sha256>
  const parts = sigHeader.split(",").map((s) => s.trim());
  const tPart = parts.find((p) => p.startsWith("t="));
  const v1Part = parts.find((p) => p.startsWith("v1="));
  if (!tPart || !v1Part) return false;
  const ts = tPart.slice(2);
  const v1 = v1Part.slice(3);
  if (!/^\d+$/.test(ts) || !/^[0-9a-f]+$/i.test(v1)) return false;

  // Reject replays older than 5 minutes
  const age = Math.abs(Math.floor(Date.now() / 1000) - parseInt(ts, 10));
  if (age > 300) return false;

  const signed = `${ts}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signed));
  const macHex = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time compare
  if (macHex.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < macHex.length; i++) diff |= macHex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

// ─── Resend alert ─────────────────────────────────────────────────────────

async function sendAlert(env: Env, subject: string, body: string): Promise<void> {
  if (!env.RESEND_API_KEY || !env.ALERT_TO) {
    console.error(`[ALERT] Resend not configured. Subject: ${subject}\n${body}`);
    return;
  }
  const recipients = env.ALERT_TO.split(",").map((s) => s.trim()).filter(Boolean);
  const payload = {
    from: env.ALERT_FROM || DEFAULT_ALERT_FROM,
    to: recipients,
    subject,
    text: `${body}\n\n— canary-watchdog · ${new Date().toISOString()}`,
  };
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      console.error(`[ALERT/RESEND-FAIL] HTTP ${r.status} ${text.slice(0, 300)}`);
    }
  } catch (e) {
    console.error(`[ALERT/SEND-EXC] ${(e as Error).message}`);
  }
}
