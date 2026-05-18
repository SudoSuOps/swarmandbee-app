// /api/bakery-intake — CF Pages Function
//
// Write-through to the sovereign NAS shim:
//   1. Validate input
//   2. Compute payload sha256
//   3. POST to orderbook.swarmandbee.ai/orders  (PRIMARY — fails request if shim down)
//   4. Fire Resend email receipt (best-effort, logged via /receipts on shim)
//   5. Ping Discord (best-effort)
//   6. Return { ok, order_id, payload_sha256, receipt_email }
//
// Required env: ORDERBOOK_API_KEY, ORDERBOOK_BASE_URL (default https://orderbook.swarmandbee.ai)
// Required env: RESEND_API_KEY, ORDER_RECEIPT_FROM
// Optional env: DISCORD_BAKERY_WEBHOOK_URL, DISCORD_BOUNTY_WEBHOOK_URL, DISCORD_WEBHOOK_URL

import { OrderBookClient, sha256Hex, type OrderBookEnv, type OrderInput } from "../lib/orderbook";
import { sendOrderReceipt, type OrderEmailFields } from "../lib/email";

interface Env extends OrderBookEnv {
  DISCORD_BAKERY_WEBHOOK_URL?: string;
  DISCORD_BOUNTY_WEBHOOK_URL?: string;
  DISCORD_WEBHOOK_URL?: string;
}

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

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 3) + "...";
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

function extractFromDescription(description: string, label: string): string | undefined {
  const m = new RegExp(`^${label}:\\s*(.+)$`, "m").exec(description);
  return m ? m[1].trim() : undefined;
}

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { headers: CORS });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // 1. parse + validate
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }
  // honeypot
  if (body && typeof body.company_website === "string" && body.company_website.length > 0) {
    return json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  const work_type = typeof body.work_type === "string" ? body.work_type.trim().slice(0, 60) : "";
  const description = typeof body.description === "string" ? body.description.trim().slice(0, 6000) : "";

  if (!name || !email || !work_type || !description) {
    return json({ ok: false, error: "Missing required field" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Invalid email" }, 400);
  }
  if (description.length < 20) {
    return json({ ok: false, error: "Description too short" }, 400);
  }

  const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
  const budget = typeof body.budget === "string" ? body.budget.trim().slice(0, 120) : "";
  const deadline = typeof body.deadline === "string" ? body.deadline.trim().slice(0, 120) : "";
  const sku = typeof body.sku === "string" ? body.sku.trim().slice(0, 40) : extractFromDescription(description, "SKU");
  const sku_id = typeof body.sku_id === "string" ? body.sku_id.trim().slice(0, 80) : undefined;
  const domain = typeof body.domain === "string" ? body.domain.trim().slice(0, 80) : extractFromDescription(description, "Domain");
  const failure_mode = typeof body.failure_mode === "string" ? body.failure_mode.trim().slice(0, 500) : extractFromDescription(description, "Failure mode");
  const settlement_rail: "stripe" | "swarmusdc" | "either" =
    body.settlement_rail === "stripe" || body.settlement_rail === "swarmusdc"
      ? body.settlement_rail
      : "either";
  const channel: "cli" | "web-box" | "web-bounty" =
    body.channel === "web-box" ? "web-box" : body.channel === "web-bounty" ? "web-bounty" : "cli";

  const userAgent = request.headers.get("User-Agent") ?? "";

  // 2. payload sha256
  const intakePayload = {
    name, email, work_type, description, company, budget, deadline,
    sku, sku_id, domain, failure_mode, settlement_rail, channel,
  };
  const payload_sha256 = await sha256Hex(intakePayload);

  // 3. POST to NAS shim (required — order book is source of truth)
  let ob: OrderBookClient;
  try {
    ob = OrderBookClient.fromEnv(env);
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 503);
  }

  const orderInput: OrderInput = {
    channel, email, name, company,
    sku, sku_id, domain,
    failure_mode, notes: description, budget, deadline, settlement_rail,
    payload_sha256, user_agent: userAgent,
  };

  let order_id: string;
  let ingress_via: "primary" | "fallback" = "primary";
  let primary_error: string | undefined;
  try {
    const r = await ob.createOrder(orderInput);
    order_id = r.order_id;
    ingress_via = r.via;
    primary_error = r.primary_error;
  } catch (shimErr) {
    return json(
      {
        ok: false,
        error: "order book unreachable on both primary and fallback ingress",
        detail: (shimErr as Error).message?.slice(0, 500),
      },
      502,
    );
  }

  // If we served the order via fallback, leave a breadcrumb in the order's
  // event log so post-hoc audits can see which ingress carried which order.
  if (ingress_via === "fallback") {
    try {
      await ob.logEvent(order_id, {
        event_type: "ingress_fallback",
        actor: "system",
        detail: `served via Tailscale Funnel after primary CF Tunnel failed: ${primary_error || "unknown"}`,
      });
    } catch {
      /* swallow — order is already persisted */
    }
  }

  // 4. Resend receipt (best-effort)
  let receipt_email: { sent: boolean; error?: string } = { sent: false };
  if (env.RESEND_API_KEY) {
    const fromAddress = env.ORDER_RECEIPT_FROM || "Swarm & Bee <orders@swarmandbee.ai>";
    const fields: OrderEmailFields = {
      order_id, name, email, channel,
      sku: sku ?? null,
      sku_id: sku_id ?? null,
      domain: domain ?? null,
      failure_mode: failure_mode ?? null,
      notes: description,
      settlement_rail,
      payload_sha256,
    };
    try {
      const sent = await sendOrderReceipt(env.RESEND_API_KEY, fromAddress, fields);
      receipt_email = { sent: sent.ok, error: sent.error };
      // Best-effort log to shim; swallow shim errors here
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
        /* swallow — order is already persisted */
      }
    } catch (emailErr) {
      receipt_email = { sent: false, error: (emailErr as Error).message };
    }
  } else {
    receipt_email = { sent: false, error: "RESEND_API_KEY not configured" };
  }

  // 5. Discord notify (best-effort)
  const webhook = resolveDiscordWebhook(env);
  if (webhook) {
    const discordPayload = {
      embeds: [
        {
          title: truncate(
            `${ingress_via === "fallback" ? "⚠️ " : "📦 "}BAKERY ORDER · ${order_id}`,
            256,
          ),
          // Yellow normally, orange on fallback so the row stands out
          color: ingress_via === "fallback" ? 0xf97316 : 0xfbbf24,
          fields: [
            { name: "Channel", value: channel, inline: true },
            { name: "SKU", value: sku || "—", inline: true },
            { name: "Settlement", value: settlement_rail, inline: true },
            { name: "Domain", value: domain || "—", inline: true },
            { name: "Pairs", value: String(body.pairs_requested ?? "—"), inline: true },
            { name: "Email receipt", value: receipt_email.sent ? "✓ sent" : "✗ failed", inline: true },
            {
              name: "Ingress",
              value:
                ingress_via === "primary"
                  ? "CF Tunnel (primary)"
                  : `Tailscale Funnel (FAILOVER · primary said: ${truncate(primary_error || "unknown", 80)})`,
              inline: false,
            },
            { name: "Brief", value: truncate(description, 1024), inline: false },
            { name: "Name", value: truncate(name, 256), inline: true },
            { name: "Email", value: truncate(email, 256), inline: true },
            { name: "Company", value: truncate(company || "—", 256), inline: true },
            { name: "payload.sha256", value: `\`${payload_sha256}\``, inline: false },
          ],
          footer: { text: "swarmandbee.ai · /api/bakery-intake · CF Tunnel + Tailscale Funnel (NAS)" },
          timestamp: new Date().toISOString(),
        },
      ],
    };
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 10000);
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload),
        signal: controller.signal,
      });
      clearTimeout(t);
    } catch {
      /* swallow */
    }
  }

  // 6. respond
  return json({
    ok: true,
    order_id,
    payload_sha256,
    status: "pending",
    ingress_via,
    receipt_email,
    next_step: "A human reads your order within one business day. You will receive a Stripe invoice or USDC settlement address by email.",
    check_status: `swarmbee-bakery account --order ${order_id} --email ${email}`,
  });
};
