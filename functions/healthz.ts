// /healthz — CF Pages Function
//
// Public health probe. Proxies to the sovereign NAS shim /healthz so monitors
// (UptimeRobot, the canary-watchdog Worker, etc.) get a real JSON answer
// instead of the React SPA index.html that the catch-all was serving.
//
// Returns the shim payload verbatim ({ ok, version, n_orders, ts }) with
// no-store caching so monitors always see fresh state.

interface Env {
  ORDERBOOK_BASE_URL?: string;
}

const DEFAULT_BASE = "https://orderbook.swarmandbee.ai";

export const onRequest: PagesFunction<Env> = async ({ env }) => {
  const base = (env.ORDERBOOK_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
  const started = Date.now();
  try {
    const r = await fetch(`${base}/healthz`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    const text = await r.text();
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { ok: false, error: "shim_returned_non_json", raw: text.slice(0, 500) };
    }
    parsed.edge_ms = Date.now() - started;
    parsed.proxied_by = "cf-pages/healthz";
    return new Response(JSON.stringify(parsed), {
      status: r.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "shim_unreachable",
        detail: (e as Error).message,
        edge_ms: Date.now() - started,
        proxied_by: "cf-pages/healthz",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
};
