// /api/account-lookup — CF Pages Function
// POST { order_id, email } → order detail + event history.
// Thin proxy to orderbook.swarmandbee.ai/orders/lookup (sovereign NAS shim).

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
  const order_id = typeof body.order_id === "string" ? body.order_id.trim().toUpperCase() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!order_id || !email) {
    return json({ ok: false, error: "order_id and email required" }, 400);
  }
  if (!/^BAK-\d{8}-[A-Z0-9]{4}$/.test(order_id)) {
    return json({ ok: false, error: "invalid order_id format (expected BAK-YYYYMMDD-XXXX)" }, 400);
  }

  let ob: OrderBookClient;
  try {
    ob = OrderBookClient.fromEnv(env);
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 503);
  }

  let result;
  try {
    result = await ob.lookupOrder(order_id, email);
  } catch (e) {
    return json({ ok: false, error: "order book unreachable", detail: (e as Error).message?.slice(0, 500) }, 502);
  }
  if (!result) {
    // Same response for not-found vs wrong-email (anti-enumeration)
    return json({ ok: false, error: "order not found (or email does not match)" }, 404);
  }

  // Public-facing subset (drop heavyweight internal fields).
  const o = result.order;
  return json({
    ok: true,
    order: {
      order_id: o.order_id,
      status: o.status,
      status_updated_at: o.status_updated_at,
      created_at: o.created_at,
      channel: o.channel,
      sku: o.sku,
      sku_id: o.sku_id,
      domain: o.domain,
      pairs_requested: o.pairs_requested,
      failure_mode: o.failure_mode,
      settlement_rail: o.settlement_rail,
      invoice_url: o.invoice_url,
      invoice_amount_usd: o.invoice_amount_usd,
      paid_at: o.paid_at,
      assembled_at: o.assembled_at,
      shipped_at: o.shipped_at,
      bundle_sha256: o.bundle_sha256,
      download_url: o.download_url,
      download_expires_at: o.download_expires_at,
      hedera_anchor_tx: o.hedera_anchor_tx,
      payload_sha256: o.payload_sha256,
      name: o.name,
      company: o.company,
      notes: o.notes,
    },
    events: result.events,
  });
};
