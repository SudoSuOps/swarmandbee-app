// /api/box-checkout — CF Pages Function · 12-pack browser orders.
// Writes through to the sovereign NAS shim + sends email + pings Discord.

import { OrderBookClient, sha256Hex, type OrderBookEnv } from "../lib/orderbook";
import { sendOrderReceipt } from "../lib/email";

interface Env extends OrderBookEnv {
  DISCORD_BAKERY_WEBHOOK_URL?: string;
  DISCORD_BOUNTY_WEBHOOK_URL?: string;
  DISCORD_WEBHOOK_URL?: string;
}

interface BoxOrder {
  picks: string[];
  bundle_hash: string;
  email: string;
  name?: string;
  org_name?: string;
  intended_use?: string;
  settlement_rail?: "stripe" | "swarmusdc" | "either";
  pay_rail?: "stripe" | "lightning"; // legacy
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

function resolveDiscordWebhook(env: Env): string {
  for (const cand of [
    env.DISCORD_BAKERY_WEBHOOK_URL,
    env.DISCORD_BOUNTY_WEBHOOK_URL,
    env.DISCORD_WEBHOOK_URL,
  ]) {
    if (typeof cand === "string" && cand.trim().length > 0) {
      return cand.replace(/\s+/g, "");
    }
  }
  return "";
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }

  // Honeypot: real users don't fill this field. Mirror of bakery-intake pattern.
  if (typeof body.company_website === "string" && body.company_website.length > 0) {
    return json({ ok: true });  // pretend success, drop silently
  }

  if (!Array.isArray(body.picks) || body.picks.length !== 12) {
    return json({ ok: false, error: "box must contain exactly 12 picks" }, 400);
  }
  if (!body.bundle_hash || !/^[0-9a-f]{64}$/i.test(body.bundle_hash)) {
    return json({ ok: false, error: "bundle_hash must be a 64-char hex sha256" }, 400);
  }
  // Tight email regex (was just .includes("@") — would accept "a@" or "@b")
  if (!body.email || typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.email.length > 200) {
    return json({ ok: false, error: "valid email required" }, 400);
  }
  const email = body.email.trim().toLowerCase();
  const name = (body.name || body.org_name || "Customer").trim().slice(0, 200);

  let settlement_rail: "stripe" | "swarmusdc" | "either" = "either";
  if (body.settlement_rail === "stripe" || body.settlement_rail === "swarmusdc") {
    settlement_rail = body.settlement_rail;
  } else if (body.pay_rail === "stripe") {
    settlement_rail = "stripe";
  }

  const intakePayload = {
    channel: "web-box",
    picks: [...body.picks].sort(),
    bundle_hash: body.bundle_hash,
    email, name,
    org_name: body.org_name ?? "",
    intended_use: body.intended_use ?? "",
    settlement_rail,
  };
  const payload_sha256 = await sha256Hex(intakePayload);

  let ob: OrderBookClient;
  try {
    ob = OrderBookClient.fromEnv(env);
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 503);
  }

  let order_id: string;
  try {
    order_id = await ob.createOrder({
      channel: "web-box",
      email, name,
      company: body.org_name,
      sku: "12-pack",
      domain: "mixed",
      pairs_requested: 12,
      notes: body.intended_use,
      settlement_rail,
      picks_json: JSON.stringify(body.picks),
      bundle_hash: body.bundle_hash,
      payload_sha256,
      user_agent: request.headers.get("User-Agent") ?? "",
    });
  } catch (shimErr) {
    return json(
      { ok: false, error: "order book unreachable", detail: (shimErr as Error).message?.slice(0, 500) },
      502,
    );
  }

  // email receipt
  let receipt_email: { sent: boolean; error?: string } = { sent: false };
  if (env.RESEND_API_KEY) {
    const fromAddress = env.ORDER_RECEIPT_FROM || "Swarm & Bee <orders@swarmandbee.ai>";
    try {
      const sent = await sendOrderReceipt(env.RESEND_API_KEY, fromAddress, {
        order_id, name, email, channel: "web-box",
        sku: "12-pack", sku_id: null, domain: "mixed",
        pairs_requested: 12, failure_mode: null,
        notes: body.intended_use, settlement_rail,
        payload_sha256, bundle_hash: body.bundle_hash,
      });
      receipt_email = { sent: sent.ok, error: sent.error };
      try {
        await ob.recordReceipt(order_id, {
          receipt_type: "order_created",
          email_to: email,
          email_subject: `Order ${order_id} received · Swarm & Bee`,
          email_provider: "resend",
          email_provider_id: sent.message_id,
          delivered: sent.ok,
          error: sent.error,
        });
        await ob.logEvent(order_id, {
          event_type: "email_sent",
          actor: "system",
          detail: sent.ok ? `resend ${sent.message_id}` : `resend FAILED: ${sent.error}`,
        });
      } catch {
        /* swallow */
      }
    } catch (emailErr) {
      receipt_email = { sent: false, error: (emailErr as Error).message };
    }
  } else {
    receipt_email = { sent: false, error: "RESEND_API_KEY not configured" };
  }

  // Discord notify
  const webhook = resolveDiscordWebhook(env);
  if (webhook) {
    const lines = [
      `**📦 BOX ORDER · ${order_id}** · 12-pack · ${settlement_rail}`,
      `\`email\` ${email}` + (body.org_name ? `  ·  \`org\` ${body.org_name}` : ""),
      body.intended_use ? `> ${truncate(body.intended_use, 400)}` : "",
      `\`bundle.sha256\` \`${body.bundle_hash}\``,
      `\`payload.sha256\` \`${payload_sha256}\``,
      `\`email receipt\` ${receipt_email.sent ? "✓ sent" : "✗ failed: " + (receipt_email.error || "?")}`,
      ``,
      `**picks (${body.picks.length}):**`,
      "```",
      body.picks.join("\n"),
      "```",
      `_action_: mint Stripe invoice or send USDC address (swarmusdc.eth), assemble bundle, anchor Hedera HCS post-pay.`,
    ].filter(Boolean);
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: lines.join("\n"), allowed_mentions: { parse: [] } }),
      });
    } catch {
      /* swallow */
    }
  }

  return json({
    ok: true,
    order_id,
    payload_sha256,
    status: "pending",
    receipt_email,
    check_status: `swarmbee-bakery account --order ${order_id} --email ${email}`,
  });
};
