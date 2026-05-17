// Email send via Resend (https://resend.com/docs/api-reference/emails/send-email).
// Branded HTML order receipts with the Swarm & Bee logo + thank-you message.
//
// Env var: RESEND_API_KEY (set in CF Pages Settings → Environment Variables).
// Optional: ORDER_RECEIPT_FROM (default: "Swarm & Bee <orders@swarmandbee.ai>")
//
// The Resend sender domain (swarmandbee.ai) must be verified in your Resend account
// for the `from` address to actually send. Until verified, Resend will reject sends.

export interface OrderEmailFields {
  order_id: string;
  name: string;
  email: string;
  channel: string;
  sku?: string | null;
  sku_id?: string | null;
  domain?: string | null;
  pairs_requested?: number | null;
  failure_mode?: string | null;
  notes?: string | null;
  settlement_rail?: string | null;
  payload_sha256: string;
  picks_json?: string | null;
  bundle_hash?: string | null;
}

export interface SendResult {
  ok: boolean;
  message_id?: string;
  status?: number;
  error?: string;
}

export async function sendOrderReceipt(
  apiKey: string,
  fromAddress: string,
  fields: OrderEmailFields,
): Promise<SendResult> {
  const subject = `Order ${fields.order_id} received · Swarm & Bee`;
  const html = renderOrderReceiptHTML(fields);
  const text = renderOrderReceiptText(fields);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [fields.email],
        subject,
        html,
        text,
        reply_to: "build@swarmandbee.ai",
      }),
    });
    const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (res.status >= 200 && res.status < 300) {
      return { ok: true, message_id: String(body.id ?? ""), status: res.status };
    }
    return {
      ok: false,
      status: res.status,
      error: typeof body.message === "string" ? body.message : `Resend status ${res.status}`,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── HTML template ──────────────────────────────────────────────────────────
// Inline styles only — Gmail/Outlook safe. No external CSS.

function renderOrderReceiptHTML(f: OrderEmailFields): string {
  const detailRow = (label: string, value: string | null | undefined) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#737373;font-size:13px;white-space:nowrap;">${label}</td>
         <td style="padding:6px 0;color:#171717;font-size:13px;font-family:monospace;">${escape(value)}</td></tr>`
      : "";

  const settlementCopy =
    f.settlement_rail === "stripe"
      ? "We'll email you a Stripe invoice link within one business day."
      : f.settlement_rail === "swarmusdc"
      ? "We'll email you the USDC settlement address (swarmusdc.eth → 0xBDe2153C…) within one business day."
      : "We'll email you the invoice link (Stripe) or settlement address (swarmusdc.eth) within one business day — whichever rail you prefer.";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Order ${escape(f.order_id)}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#e5e5e5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#171717;border:1px solid #262626;border-radius:8px;">

  <!-- header -->
  <tr><td style="padding:32px 32px 16px;border-bottom:1px solid #262626;">
    <img src="https://swarmandbee.ai/og-bakery.png" width="120" alt="Swarm &amp; Bee"
         style="display:block;border:0;outline:none;text-decoration:none;border-radius:4px;" />
    <div style="margin-top:14px;color:#fbbf24;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:monospace;">
      The organic dataset bakery · CCIR
    </div>
  </td></tr>

  <!-- thank-you -->
  <tr><td style="padding:32px;">
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#fafafa;line-height:1.3;">
      Thank you for your order, ${escape(f.name.split(" ")[0] || "fren")}.
    </h1>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#d4d4d4;">
      We received your order and it's now in the book. A human will read it within
      one business day and reach out with next steps.
    </p>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#a3a3a3;">
      Your order ID is your receipt. Keep it safe — you'll use it to check status anytime.
    </p>
  </td></tr>

  <!-- order ID highlight -->
  <tr><td style="padding:0 32px 32px;">
    <div style="background:#0a0a0a;border:1px solid #fbbf24;border-radius:6px;padding:20px;text-align:center;">
      <div style="color:#737373;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:monospace;margin-bottom:8px;">
        Order ID
      </div>
      <div style="color:#fbbf24;font-size:24px;font-weight:700;font-family:monospace;letter-spacing:1px;">
        ${escape(f.order_id)}
      </div>
    </div>
  </td></tr>

  <!-- order details table -->
  <tr><td style="padding:0 32px 32px;">
    <div style="color:#737373;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:monospace;margin-bottom:12px;">
      ▍ Order details
    </div>
    <table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #262626;border-radius:6px;padding:16px;">
      ${detailRow("Channel", f.channel)}
      ${detailRow("SKU", f.sku ?? null)}
      ${detailRow("Flavor / sku_id", f.sku_id ?? null)}
      ${detailRow("Domain", f.domain ?? null)}
      ${f.pairs_requested ? detailRow("Pairs requested", f.pairs_requested.toLocaleString()) : ""}
      ${detailRow("Failure mode", f.failure_mode ?? null)}
      ${detailRow("Notes", f.notes ?? null)}
      ${detailRow("Settlement preference", f.settlement_rail ?? null)}
      ${detailRow("Bundle hash", f.bundle_hash ?? null)}
      ${detailRow("Payload sha256", f.payload_sha256)}
    </table>
  </td></tr>

  <!-- next steps -->
  <tr><td style="padding:0 32px 32px;">
    <div style="color:#737373;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:monospace;margin-bottom:12px;">
      ▍ What happens next
    </div>
    <ol style="margin:0;padding-left:20px;color:#d4d4d4;font-size:14px;line-height:1.8;">
      <li>We review your order, scope the deliverable, confirm pricing.</li>
      <li>${escape(settlementCopy)}</li>
      <li>You pay. We assemble the bundle from rails &amp; NAS · sha256 manifest · optional Hedera anchor.</li>
      <li>Signed download URL lands in your inbox.</li>
    </ol>
  </td></tr>

  <!-- check status block -->
  <tr><td style="padding:0 32px 32px;">
    <div style="background:#0a0a0a;border:1px solid #262626;border-radius:6px;padding:16px;">
      <div style="color:#737373;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:monospace;margin-bottom:8px;">
        Check status anytime
      </div>
      <pre style="margin:0;color:#fbbf24;font-size:12px;font-family:monospace;white-space:pre;overflow:auto;">
swarmbee-bakery account \\
  --order ${escape(f.order_id)} \\
  --email ${escape(f.email)}</pre>
    </div>
  </td></tr>

  <!-- footer -->
  <tr><td style="padding:24px 32px;border-top:1px solid #262626;text-align:center;">
    <div style="color:#737373;font-size:12px;line-height:1.6;">
      Swarm and Bee LLC · <a href="https://swarmandbee.ai" style="color:#fbbf24;text-decoration:none;">swarmandbee.ai</a>
      · <a href="mailto:build@swarmandbee.ai" style="color:#fbbf24;text-decoration:none;">build@swarmandbee.ai</a>
    </div>
    <div style="color:#525252;font-size:11px;font-family:monospace;margin-top:8px;">
      Fresh every day. Less is better. Compassionate intelligence.
    </div>
  </td></tr>

</table>
</td></tr>
</table>

</body></html>`;
}

function renderOrderReceiptText(f: OrderEmailFields): string {
  const lines = [
    `SWARM & BEE · ORDER RECEIPT`,
    ``,
    `Thank you for your order, ${f.name.split(" ")[0] || "fren"}.`,
    ``,
    `We received your order and it's now in the book. A human will read it within`,
    `one business day and reach out with next steps.`,
    ``,
    `Your order ID is your receipt — keep it safe.`,
    ``,
    `─── ORDER ID ──────────────────────────────`,
    ``,
    `  ${f.order_id}`,
    ``,
    `─── ORDER DETAILS ─────────────────────────`,
    ``,
    `  Channel              : ${f.channel}`,
    f.sku ? `  SKU                  : ${f.sku}` : null,
    f.sku_id ? `  Flavor               : ${f.sku_id}` : null,
    f.domain ? `  Domain               : ${f.domain}` : null,
    f.pairs_requested ? `  Pairs requested      : ${f.pairs_requested.toLocaleString()}` : null,
    f.failure_mode ? `  Failure mode         : ${f.failure_mode}` : null,
    f.notes ? `  Notes                : ${f.notes}` : null,
    f.settlement_rail ? `  Settlement preference: ${f.settlement_rail}` : null,
    `  Payload sha256       : ${f.payload_sha256}`,
    ``,
    `─── WHAT HAPPENS NEXT ─────────────────────`,
    ``,
    `  1. We review your order, scope, confirm pricing.`,
    `  2. We email you a Stripe invoice or USDC settlement address (swarmusdc.eth).`,
    `  3. You pay. We assemble the bundle (sha256 manifest, optional Hedera anchor).`,
    `  4. Signed download URL lands in your inbox.`,
    ``,
    `─── CHECK STATUS ANYTIME ──────────────────`,
    ``,
    `  swarmbee-bakery account --order ${f.order_id} --email ${f.email}`,
    ``,
    `─── BAKERY ────────────────────────────────`,
    ``,
    `  Swarm and Bee LLC`,
    `  https://swarmandbee.ai`,
    `  build@swarmandbee.ai`,
    ``,
    `  Fresh every day. Less is better. Compassionate intelligence.`,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

function escape(s: unknown): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
