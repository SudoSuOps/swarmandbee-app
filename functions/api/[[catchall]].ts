// /api/* catchall — returns clean JSON for any /api/* path that no other
// function handles. Without this, unknown /api/* GETs fall through to the SPA
// fallback and return 200+HTML, which breaks scripted clients (the CLI hit
// this on `free <bad-slug>` audits — server returned HTML 200, client parsed
// it as garbage JSONL).
//
// CF Pages routes [[catchall]].ts AFTER all explicit /api/<name>.ts handlers,
// so this only fires for unmatched paths.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 404): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, { headers: CORS });

export const onRequest: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const method = request.method;
  if (method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }
  // Distinguish "wrong method" (the path matches a known endpoint but with GET)
  // from "unknown path" — both still get JSON, just different copy + status.
  const knownPaths = new Set([
    "/api/bakery-intake",
    "/api/bounty-intake",
    "/api/box-checkout",
    "/api/account-lookup",
    "/api/orders-list",
    "/api/hand-us-a-deal",
  ]);
  if (knownPaths.has(url.pathname)) {
    return json(
      {
        ok: false,
        error: "method_not_allowed",
        path: url.pathname,
        method,
        hint: "this endpoint accepts POST only; see https://swarmandbee.ai/llms.txt for the API contract",
      },
      405,
    );
  }
  return json(
    {
      ok: false,
      error: "not_found",
      path: url.pathname,
      hint: "unknown /api/* path. See https://swarmandbee.ai/llms.txt for available endpoints.",
    },
    404,
  );
};
