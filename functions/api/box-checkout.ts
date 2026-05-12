// POST /api/box-checkout
//
// The register. A customer's Build-a-Box submission lands here. We:
//   1. validate the box shape (12 picks · email present · bundle hash present)
//   2. mint a short, human-friendly order id (BAK-YYYYMMDD-XXXX)
//   3. POST the order to the Discord webhook so Donovan + Claude see it instantly
//   4. return { ok, order_id } to the client so the receipt screen can render
//
// What we DON'T do here (V1 manual-fulfillment doctrine):
//   - touch a Stripe API directly (the human relays a checkout link or LN invoice)
//   - sign the Hedera HCS anchor (we anchor post-payment, not pre-payment)
//   - write to D1 (we keep state in Discord for now · D1 wire-up is V2)
//
// Cloudflare Pages Functions runtime. Bindings:
//   DISCORD_BOUNTY_WEBHOOK_URL — env var (same webhook the bounty intake uses)

interface Env {
  DISCORD_BOUNTY_WEBHOOK_URL?: string;
}

interface BoxOrder {
  picks: string[];
  bundle_hash: string;
  email: string;
  org_name?: string;
  intended_use?: string;
  pay_rail: "stripe" | "lightning";
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  let body: BoxOrder;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }

  // validate
  if (!Array.isArray(body.picks) || body.picks.length !== 12) {
    return json({ ok: false, error: "box must contain exactly 12 picks" }, 400);
  }
  if (!body.bundle_hash || !/^[0-9a-f]{64}$/i.test(body.bundle_hash)) {
    return json({ ok: false, error: "bundle_hash must be a 64-char hex sha256" }, 400);
  }
  if (!body.email || !body.email.includes("@") || body.email.length < 5 || body.email.length > 200) {
    return json({ ok: false, error: "email required" }, 400);
  }
  if (body.pay_rail !== "stripe" && body.pay_rail !== "lightning") {
    return json({ ok: false, error: "pay_rail must be stripe or lightning" }, 400);
  }

  const orderId = mintOrderId();

  // ship to discord (fire-and-forget · we don't fail the order if discord 503s)
  const webhook = ctx.env.DISCORD_BOUNTY_WEBHOOK_URL;
  if (webhook) {
    const lines = [
      `**📦 BAKERY ORDER · ${orderId}** · $149 · ${body.pay_rail}`,
      `\`email\` ${body.email}` + (body.org_name ? `  ·  \`org\` ${body.org_name}` : ""),
      body.intended_use ? `> ${truncate(body.intended_use, 400)}` : "",
      `\`bundle.sha256\` \`${body.bundle_hash}\``,
      ``,
      `**picks (${body.picks.length}):**`,
      "```",
      body.picks.join("\n"),
      "```",
      `_action_: mint payment link (${body.pay_rail}), reply to email, assemble bundle from rails, anchor Hedera HCS post-pay.`,
    ].filter(Boolean);

    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: lines.join("\n"),
          allowed_mentions: { parse: [] },
        }),
      });
    } catch {
      /* swallow · the order id is the customer's receipt of record */
    }
  }

  return json({ ok: true, order_id: orderId });
};

function mintOrderId(): string {
  const d = new Date();
  const stamp =
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate());
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BAK-${stamp}-${rnd}`;
}

function pad(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max - 1) + "…";
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
