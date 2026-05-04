// Minimal probe endpoint — to isolate Pages Functions deploy issues.
// If GET /api/ping returns 200 with JSON, the Functions runtime is healthy.

export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ ok: true, message: "pong", ts: new Date().toISOString() }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  let body: unknown = null;
  try { body = await request.json(); } catch {}
  return new Response(JSON.stringify({ ok: true, message: "post received", echo: body }), {
    headers: { "Content-Type": "application/json" },
  });
};
