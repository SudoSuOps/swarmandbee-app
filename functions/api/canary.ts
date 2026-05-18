// /api/canary — CF Pages Function
//
// Synthetic probe. Proxies to NAS shim POST /canary. Exercises the full
// customer-buy path infra (CF edge → Pages Function → CF Tunnel →
// cloudflared on NAS → FastAPI shim → SQLite roundtrip) WITHOUT persisting
// an order or triggering email.
//
// Called by the canary-watchdog Worker every 60s. Public, no auth — same
// contract as /healthz; the canary is a liveness probe, not a private path.

interface Env {
  ORDERBOOK_BASE_URL?: string;
}

const DEFAULT_BASE = "https://orderbook.swarmandbee.ai";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { headers: CORS });

const handler: PagesFunction<Env> = async ({ env }) => {
  const base = (env.ORDERBOOK_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
  const started = Date.now();
  try {
    const r = await fetch(`${base}/canary`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    const text = await r.text();
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { ok: false, canary: true, error: "shim_returned_non_json", raw: text.slice(0, 500) };
    }
    parsed.edge_ms = Date.now() - started;
    parsed.proxied_by = "cf-pages/api/canary";
    return new Response(JSON.stringify(parsed), {
      status: r.status,
      headers: {
        ...CORS,
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        ok: false,
        canary: true,
        error: "shim_unreachable",
        detail: (e as Error).message,
        edge_ms: Date.now() - started,
        proxied_by: "cf-pages/api/canary",
      }),
      {
        status: 503,
        headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" },
      },
    );
  }
};

export const onRequestPost = handler;
export const onRequestGet = handler;
