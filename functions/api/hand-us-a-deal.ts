// /api/hand-us-a-deal — Cloudflare Pages Function
//
// Receives a POST from the "Hand us a deal" form on swarmandbee.ai
// Validates, sanitizes, sends via Resend → build@swarmandbee.ai
//
// Required env vars (Cloudflare Pages → Settings → Environment Variables):
//   RESEND_API_KEY   — your re_... secret from resend.com/api-keys
//
// Optional env vars:
//   FROM_ADDRESS     — defaults to "Swarm & Bee <onboarding@resend.dev>"
//                      switch to "Swarm & Bee <build@swarmandbee.ai>" once
//                      swarmandbee.ai is verified in Resend (DNS records added)
//   TO_ADDRESS       — defaults to "build@swarmandbee.ai"

interface Env {
  RESEND_API_KEY: string;
  FROM_ADDRESS?: string;
  TO_ADDRESS?: string;
}

interface DealSubmission {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  property?: string;
  assetClass?: string;
  task?: string;
  background?: string;
  // honeypot — bots fill this; humans never see it
  website?: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function escapeText(s: string): string {
  // Strip control characters (CRLF in headers etc.) — Resend escapes its own JSON,
  // this just sanitizes user-submitted text for the email body.
  return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Parse + basic validation
  let body: DealSubmission;
  try {
    body = (await request.json()) as DealSubmission;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Honeypot — bots fill the hidden 'website' field
  if (body.website && body.website.length > 0) {
    // Pretend success to avoid revealing the trap
    return jsonResponse({ ok: true });
  }

  // Required fields
  const name = body.name && escapeText(body.name);
  const email = body.email && escapeText(body.email);
  const property = body.property && escapeText(body.property);
  const task = body.task && escapeText(body.task);

  if (!name || !email || !property || !task) {
    return jsonResponse(
      { ok: false, error: "Missing required field (name, email, property, task)" },
      400
    );
  }

  // Email format sanity
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ ok: false, error: "Invalid email" }, 400);
  }

  // Length limits (defensive — keeps oversized payloads out)
  if (
    name.length > 200 ||
    email.length > 200 ||
    property.length > 500 ||
    task.length > 200 ||
    (body.background?.length ?? 0) > 5000
  ) {
    return jsonResponse({ ok: false, error: "Field length exceeded" }, 400);
  }

  // Whitespace-tolerant key lookup — CF Pages dashboard sometimes
  // captures stray whitespace in env var names. Loop keys, find any
  // that trims to "RESEND_API_KEY", verify value is a string.
  let apiKey: string | undefined;
  try {
    const envObj = env as unknown as Record<string, unknown>;
    for (const k of Object.keys(envObj)) {
      if (typeof k === "string" && k.trim() === "RESEND_API_KEY") {
        const v = envObj[k];
        if (typeof v === "string" && v.length > 0) {
          apiKey = v;
          break;
        }
      }
    }
  } catch (e) {
    // Fall through with apiKey undefined
  }

  if (!apiKey) {
    return jsonResponse({ ok: false, error: "Email service not configured" }, 500);
  }

  // Optional fields (sanitized)
  const company = body.company ? escapeText(body.company) : "";
  const phone = body.phone ? escapeText(body.phone) : "";
  const assetClass = body.assetClass ? escapeText(body.assetClass) : "";
  const background = body.background ? escapeText(body.background) : "";

  const subject = `Hand us a deal · ${property.slice(0, 80)}`;

  const text = `New deal submission via swarmandbee.ai

────────────────────────────────────────
PROPERTY / DEAL
${property}

ASSET CLASS
${assetClass || "(not specified)"}

TASK REQUESTED
${task}

BACKGROUND
${background || "(none provided)"}

────────────────────────────────────────
CONTACT
Name:    ${name}
Company: ${company || "(not provided)"}
Email:   ${email}
Phone:   ${phone || "(not provided)"}

────────────────────────────────────────
Submitted: ${new Date().toISOString()}
Source:    https://swarmandbee.ai (Hand us a deal form)
`;

  const html = `<!doctype html>
<html><body style="font-family: -apple-system, system-ui, sans-serif; color: #1a1a1a; max-width: 640px;">
<h2 style="border-bottom: 2px solid #d97706; padding-bottom: 8px;">New deal submission · swarmandbee.ai</h2>

<table cellpadding="6" style="border-collapse: collapse; margin-top: 16px;">
  <tr><td style="font-weight:600; vertical-align:top; min-width: 120px;">Property</td><td>${property}</td></tr>
  <tr><td style="font-weight:600; vertical-align:top;">Asset class</td><td>${assetClass || "<em>not specified</em>"}</td></tr>
  <tr><td style="font-weight:600; vertical-align:top;">Task</td><td>${task}</td></tr>
  <tr><td style="font-weight:600; vertical-align:top;">Background</td><td>${(background || "<em>none provided</em>").replace(/\n/g, "<br>")}</td></tr>
</table>

<h3 style="margin-top: 24px;">Contact</h3>
<table cellpadding="6" style="border-collapse: collapse;">
  <tr><td style="font-weight:600; vertical-align:top; min-width: 120px;">Name</td><td>${name}</td></tr>
  <tr><td style="font-weight:600; vertical-align:top;">Company</td><td>${company || "<em>—</em>"}</td></tr>
  <tr><td style="font-weight:600; vertical-align:top;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
  <tr><td style="font-weight:600; vertical-align:top;">Phone</td><td>${phone || "<em>—</em>"}</td></tr>
</table>

<p style="margin-top: 24px; color: #666; font-size: 12px; border-top: 1px solid #e5e5e5; padding-top: 12px;">
  Submitted: ${new Date().toISOString()}<br>
  Source: <a href="https://swarmandbee.ai">swarmandbee.ai</a> · Hand us a deal form
</p>
</body></html>`;

  const fromAddress = (env.FROM_ADDRESS || "Swarm & Bee <onboarding@resend.dev>").trim();
  const toAddress = (env.TO_ADDRESS || "build@swarmandbee.ai").trim();

  // Top-level try/catch so any throw becomes a proper JSON response (no CF 502)
  try {
    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!resendResp.ok) {
      const errBody = await resendResp.text().catch(() => "");
      console.error("Resend API error:", resendResp.status, errBody);
      // VERBOSE for debugging — return the Resend error so we can see what's wrong.
      // Tighten this down to a generic message once the form is verified working.
      return jsonResponse(
        {
          ok: false,
          error: "Resend rejected the send",
          resend_status: resendResp.status,
          resend_body: errBody.slice(0, 500),
          from: fromAddress,
          to: toAddress,
        },
        502
      );
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Function exception:", msg);
    return jsonResponse(
      { ok: false, error: "Function exception", detail: msg.slice(0, 500) },
      500
    );
  }
};
