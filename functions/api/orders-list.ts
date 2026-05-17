// /api/orders-list — CF Pages Function
//
// POST { email, proof_order_id } → brief list of orders for this email.
// Requires the caller to present a known order_id for that email as proof —
// stops email-enumeration attacks (you can't list orders for an email you've
// never placed an order for).
//
// Anti-enumeration: same 404 returned whether the email has zero orders OR
// the proof_order_id doesn't match — never reveal whether an email exists.

import { OrderBookClient, type OrderBookEnv } from "../lib/orderbook";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export const onRequestOptions: PagesFunction<OrderBookEnv> = async () =>
  new Response(null, { headers: CORS });

export const onRequestPost: PagesFunction<OrderBookEnv> = async ({ request, env }) => {
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const proof_order_id = typeof body.proof_order_id === "string" ? body.proof_order_id.trim().toUpperCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "valid email required" }, 400);
  }
  if (!proof_order_id || !/^BAK-\d{8}-[A-Z0-9]{4}$/.test(proof_order_id)) {
    return json(
      {
        ok: false,
        error: "proof_order_id required (must match an order placed under this email). Use the order_id from any prior receipt email as proof.",
      },
      400,
    );
  }

  let ob: OrderBookClient;
  try {
    ob = OrderBookClient.fromEnv(env);
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 503);
  }

  // 1. Verify the proof: lookup the supplied order_id under the supplied email.
  //    Returns null if not found OR email mismatch (anti-enumeration shape).
  let proof;
  try {
    proof = await ob.lookupOrder(proof_order_id, email);
  } catch (e) {
    return json({ ok: false, error: "order book unreachable", detail: (e as Error).message?.slice(0, 500) }, 502);
  }
  if (!proof) {
    // Same shape as a "no orders" response — never confirm existence
    return json({ ok: false, error: "proof_order_id does not match an order for this email" }, 404);
  }

  // 2. Proof valid — list orders for this email.
  let orders;
  try {
    orders = await ob.listOrdersForEmail(email, 100);
  } catch (e) {
    return json({ ok: false, error: "order book unreachable", detail: (e as Error).message?.slice(0, 500) }, 502);
  }

  const brief = orders.map((o: any) => ({
    order_id: o.order_id,
    created_at: o.created_at,
    status: o.status,
    channel: o.channel,
    sku: o.sku,
    domain: o.domain,
    pairs_requested: o.pairs_requested,
    settlement_rail: o.settlement_rail,
  }));
  return json({ ok: true, email, count: brief.length, orders: brief });
};
