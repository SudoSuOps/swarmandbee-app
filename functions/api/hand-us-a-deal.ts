// MINIMAL HELLO TEST — proves whether CF Pages is actually deploying this file.
// If POST returns "hello-from-hand-us-a-deal-v2", deploy works → bug is logic-side.
// If still 502, deploy is stuck on this path → file rename / dashboard intervention needed.

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

export const onRequestPost: PagesFunction = async () => {
  return new Response(
    JSON.stringify({ ok: true, message: "hello-from-hand-us-a-deal-v2" }),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
};
