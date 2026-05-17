// /api/orders-list — CF Pages Function
// POST { email } → brief list of orders for this email.
// Thin proxy to orderbook.swarmandbee.ai/orders/list (sovereign NAS shim).

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
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "valid email required" }, 400);
  }

  let ob: OrderBookClient;
  try {
    ob = OrderBookClient.fromEnv(env);
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 503);
  }

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
