// canary-watchdog · CF Worker
//
// Two cron triggers:
//   * * * * *   → /api/canary on bakery.swarmandbee.ai. Alerts on 2 consecutive
//                 failures (debounced 15min after that) and on recovery.
//   5 0 * * *   → /healthz n_orders snapshot diff vs yesterday. Alerts if count
//                 dropped, or flatlined on a weekday.
//
// State lives in CANARY_KV. Alerts go via Resend to env.ALERT_TO.
//
// Manual hooks (handy for debugging — Worker fetch handler):
//   GET /status        → current canary_state JSON
//   POST /run-canary   → run a probe right now
//   POST /run-daily    → run the daily order-count check right now
//   GET /history       → last 24h of probe results (KV-backed ring buffer)

export interface Env {
  CANARY_KV: KVNamespace;
  RESEND_API_KEY: string;
  ALERT_TO: string;
  ALERT_FROM?: string;
  CANARY_URL?: string;
  HEALTHZ_URL?: string;
  ALERT_DEBOUNCE_MIN?: string;
  // Optional shared secret for manual triggers — if set, /run-* requires X-Trigger-Key.
  TRIGGER_KEY?: string;
}

const DEFAULT_CANARY_URL = "https://bakery.swarmandbee.ai/api/canary";
const DEFAULT_HEALTHZ_URL = "https://bakery.swarmandbee.ai/healthz";
const DEFAULT_ALERT_FROM = "Swarm Watchdog <watchdog@swarmandbee.ai>";

interface CanaryState {
  last_status: "ok" | "fail";
  consecutive_fails: number;
  last_check_at: number;        // ms epoch
  last_elapsed_ms: number;
  last_detail: string;
  last_alert_sent_at: number;   // ms epoch
  last_status_change_at: number;
}

const DEFAULT_STATE: CanaryState = {
  last_status: "ok",
  consecutive_fails: 0,
  last_check_at: 0,
  last_elapsed_ms: 0,
  last_detail: "",
  last_alert_sent_at: 0,
  last_status_change_at: 0,
};

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

  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/status") {
      const state = await getState(env);
      return json({ ok: true, state, now: Date.now() });
    }

    if (path === "/history") {
      const hist = (await env.CANARY_KV.get("canary_history", "json")) || [];
      return json({ ok: true, history: hist });
    }

    if (path === "/run-canary" && request.method === "POST") {
      if (!authorizeTrigger(request, env)) return json({ ok: false, error: "unauthorized" }, 401);
      const r = await runCanary(env);
      return json(r);
    }

    if (path === "/run-daily" && request.method === "POST") {
      if (!authorizeTrigger(request, env)) return json({ ok: false, error: "unauthorized" }, 401);
      const r = await runDailyOrderCount(env);
      return json(r);
    }

    if (path === "/" || path === "/help") {
      return new Response(
        [
          "canary-watchdog · Swarm & Bee",
          "",
          "Crons:",
          "  * * * * *   probe /api/canary, alert on 2 consecutive fails + on recovery",
          "  5 0 * * *   daily n_orders diff vs yesterday, alert on drop/flatline",
          "",
          "Manual:",
          "  GET  /status",
          "  GET  /history",
          "  POST /run-canary    (X-Trigger-Key required if TRIGGER_KEY set)",
          "  POST /run-daily     (X-Trigger-Key required if TRIGGER_KEY set)",
          "",
        ].join("\n"),
        { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    }

    return new Response("not found\n", { status: 404 });
  },
};

function authorizeTrigger(request: Request, env: Env): boolean {
  if (!env.TRIGGER_KEY) return true; // no key configured = open
  return request.headers.get("X-Trigger-Key") === env.TRIGGER_KEY;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function getState(env: Env): Promise<CanaryState> {
  const raw = await env.CANARY_KV.get("canary_state", "json");
  return raw ? { ...DEFAULT_STATE, ...(raw as object) } : { ...DEFAULT_STATE };
}

async function putState(env: Env, state: CanaryState): Promise<void> {
  await env.CANARY_KV.put("canary_state", JSON.stringify(state));
}

interface ProbeResult {
  ok: boolean;
  http_status: number;
  elapsed_ms: number;
  detail: string;
  body_snippet: string;
}

async function probeCanary(env: Env): Promise<ProbeResult> {
  const url = env.CANARY_URL || DEFAULT_CANARY_URL;
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
    try { parsed = JSON.parse(text); } catch { /* leave parsed null */ }
    const ok = r.ok && parsed && parsed.ok === true;
    return {
      ok,
      http_status: r.status,
      elapsed_ms: elapsed,
      detail: ok ? "" : `HTTP ${r.status}${parsed?.error ? ` ${parsed.error}` : ""}`,
      body_snippet: text.slice(0, 300),
    };
  } catch (e) {
    return {
      ok: false,
      http_status: 0,
      elapsed_ms: Date.now() - started,
      detail: `fetch error: ${(e as Error).message}`,
      body_snippet: "",
    };
  }
}

async function pushHistory(env: Env, entry: object): Promise<void> {
  const hist = ((await env.CANARY_KV.get("canary_history", "json")) || []) as object[];
  hist.push(entry);
  // Keep last 1440 entries (~24h at 1/min)
  const trimmed = hist.length > 1440 ? hist.slice(-1440) : hist;
  await env.CANARY_KV.put("canary_history", JSON.stringify(trimmed));
}

export async function runCanary(env: Env): Promise<object> {
  const probe = await probeCanary(env);
  const state = await getState(env);
  const now = Date.now();

  const wasOk = state.last_status === "ok";
  let alertSent = false;
  let alertReason = "";

  if (probe.ok) {
    if (state.consecutive_fails >= 2) {
      // RECOVERY — we previously alerted DOWN, now we're back
      const downForMin = Math.round((now - state.last_status_change_at) / 60_000);
      const subject = "[RECOVERED] bakery cash register · canary back";
      const body = [
        `Canary back online after ${state.consecutive_fails} consecutive failures (~${downForMin} min).`,
        `Probe HTTP: ${probe.http_status}`,
        `Elapsed: ${probe.elapsed_ms} ms`,
        `Last failure detail: ${state.last_detail || "—"}`,
        `URL: ${env.CANARY_URL || DEFAULT_CANARY_URL}`,
      ].join("\n");
      await sendAlert(env, subject, body);
      alertSent = true;
      alertReason = "recovery";
    }
    state.consecutive_fails = 0;
    state.last_status = "ok";
    state.last_detail = "";
    if (!wasOk) state.last_status_change_at = now;
  } else {
    state.consecutive_fails += 1;
    state.last_status = "fail";
    state.last_detail = probe.detail;
    if (wasOk) state.last_status_change_at = now;

    const debounceMin = parseInt(env.ALERT_DEBOUNCE_MIN || "15", 10);
    const cooledOff = now - state.last_alert_sent_at > debounceMin * 60_000;

    // First DOWN alert on 2nd consecutive fail; re-alert no more than every <debounce> min
    const shouldAlert =
      state.consecutive_fails === 2 || (state.consecutive_fails > 2 && cooledOff);

    if (shouldAlert) {
      const subject = `[DOWN] bakery cash register · canary ${state.consecutive_fails}× in a row`;
      const body = [
        `Canary failing ${state.consecutive_fails}× consecutively.`,
        `Probe HTTP: ${probe.http_status}`,
        `Elapsed: ${probe.elapsed_ms} ms`,
        `Detail: ${probe.detail}`,
        `Response snippet: ${probe.body_snippet || "(empty)"}`,
        `URL: ${env.CANARY_URL || DEFAULT_CANARY_URL}`,
        ``,
        `Action: customer buy button likely broken. Check NAS @ 192.168.0.102,`,
        `cloudflared container, sb-orderbook-shim container.`,
      ].join("\n");
      await sendAlert(env, subject, body);
      state.last_alert_sent_at = now;
      alertSent = true;
      alertReason = "down";
    }
  }

  state.last_check_at = now;
  state.last_elapsed_ms = probe.elapsed_ms;
  await putState(env, state);

  await pushHistory(env, {
    ts: now,
    ok: probe.ok,
    http_status: probe.http_status,
    elapsed_ms: probe.elapsed_ms,
    detail: probe.detail,
    alert_sent: alertSent,
  });

  return {
    ok: probe.ok,
    http_status: probe.http_status,
    elapsed_ms: probe.elapsed_ms,
    consecutive_fails: state.consecutive_fails,
    alert_sent: alertSent,
    alert_reason: alertReason,
    detail: probe.detail,
  };
}

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
  const url = env.HEALTHZ_URL || DEFAULT_HEALTHZ_URL;
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

  // UTC day-of-week: 0=Sun, 1=Mon ... 6=Sat. Weekday = 1..5.
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
        `Yesterday (${yesterday}): ${n_orders_yesterday}\nTo day (${today}): ${n_orders_today}\nDelta: 0\n\nZero net new orders on a weekday — pipeline may be dry, intake may be silently broken, or marketing is dark.`,
      );
      alertSent = true;
    } else {
      reason = `delta=${delta} (no alert)`;
    }
  }

  // 90-day TTL on per-day counts
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
