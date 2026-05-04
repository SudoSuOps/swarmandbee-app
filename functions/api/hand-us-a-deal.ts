// /api/hand-us-a-deal — Cloudflare Pages Function
//
// Receives the "Hand us a deal" form, validates, sends via Resend.
//
// Required env var (CF Pages → Settings → Environment Variables · Production):
//   RESEND_API_KEY    — re_... · NAME must be exactly RESEND_API_KEY · no
//                       trailing whitespace · no equals sign in name field
//
// Optional but RECOMMENDED env vars:
//   FROM_ADDRESS     — must use a domain verified in Resend, e.g.
//                      "Swarm & Bee <build@swarmandbee.ai>"
//                      defaults to "Swarm & Bee <onboarding@resend.dev>" which
//                      ONLY works in Resend testing mode (sends only to account owner)
//   TO_ADDRESS       — defaults to "build@swarmandbee.ai" (must have MX records
//                      pointing to a real mailbox provider)

interface Env {
  RESEND_API_KEY?: string;
  FROM_ADDRESS?: string;
  TO_ADDRESS?: string;
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

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Outer try/catch — no unhandled throw can ever produce a CF 502
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
    }

    // Honeypot — bots fill the hidden 'website' field
    if (body && typeof body.website === "string" && body.website.length > 0) {
      return jsonResponse({ ok: true });
    }

    // Required fields
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const property = typeof body.property === "string" ? body.property.trim() : "";
    const task = typeof body.task === "string" ? body.task.trim() : "";

    if (!name || !email || !property || !task) {
      return jsonResponse({ ok: false, error: "Missing required field (name, email, property, task)" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "Invalid email" }, 400);
    }
    if (name.length > 200 || email.length > 200 || property.length > 500 || task.length > 200) {
      return jsonResponse({ ok: false, error: "Field length exceeded" }, 400);
    }

    const apiKey = (env.RESEND_API_KEY || "").trim();
    if (!apiKey) {
      return jsonResponse({ ok: false, error: "Email service not configured" }, 500);
    }

    // Optional fields
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 50) : "";
    const assetClass = typeof body.assetClass === "string" ? body.assetClass.trim().slice(0, 200) : "";
    const background = typeof body.background === "string" ? body.background.trim().slice(0, 5000) : "";

    const fromAddress = (env.FROM_ADDRESS || "Swarm and Bee <onboarding@resend.dev>").trim();
    const toAddress = (env.TO_ADDRESS || "build@swarmandbee.ai").trim();

    const subject = "Hand us a deal - " + property.slice(0, 80);
    const text = [
      "New deal submission via swarmandbee.ai",
      "",
      "PROPERTY: " + property,
      "ASSET CLASS: " + (assetClass || "(not specified)"),
      "TASK: " + task,
      "",
      "BACKGROUND:",
      background || "(none provided)",
      "",
      "CONTACT:",
      "Name: " + name,
      "Company: " + (company || "-"),
      "Email: " + email,
      "Phone: " + (phone || "-"),
      "",
      "Submitted: " + new Date().toISOString(),
      "Source: swarmandbee.ai (Hand us a deal form)",
    ].join("\n");

    // Resend send · explicit AbortSignal + explicit fetch try/catch
    let resendStatus = 0;
    let resendBodyText = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const resendResp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [toAddress],
          reply_to: email,
          subject: subject,
          text: text,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      resendStatus = resendResp.status;
      try {
        resendBodyText = (await resendResp.text()).slice(0, 800);
      } catch {
        // body-read failure is non-fatal · we still know the status
      }
    } catch (fetchErr) {
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      return jsonResponse(
        { ok: false, error: "Resend fetch failed", detail: msg.slice(0, 500), from: fromAddress, to: toAddress },
        502
      );
    }

    if (resendStatus < 200 || resendStatus >= 300) {
      return jsonResponse(
        {
          ok: false,
          error: "Resend rejected the send",
          resend_status: resendStatus,
          resend_body: resendBodyText,
          from: fromAddress,
          to: toAddress,
          hint: resendStatus === 403
            ? "If using onboarding@resend.dev as FROM, sends are limited to your Resend account email. Set FROM_ADDRESS env var to use your verified domain (e.g. 'Swarm & Bee <build@swarmandbee.ai>')."
            : undefined,
        },
        502
      );
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonResponse({ ok: false, error: "Function exception", detail: msg.slice(0, 500) }, 500);
  }
};
