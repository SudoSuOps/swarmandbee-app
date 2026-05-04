// /api/hand-us-a-deal — DEBUG VERSION
// Wraps ENTIRE handler in try/catch so no unhandled throw can ever produce
// a CF 502. Once we've identified the root cause, the original cleaner
// version can be restored.

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
  // EVERYTHING wrapped in try/catch · no unhandled throw can produce a 502
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch (e) {
      return jsonResponse({ ok: false, error: "Invalid JSON", phase: "parse" }, 400);
    }

    // Honeypot
    if (body.website) return jsonResponse({ ok: true });

    // Required fields
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const property = typeof body.property === "string" ? body.property.trim() : "";
    const task = typeof body.task === "string" ? body.task.trim() : "";

    if (!name || !email || !property || !task) {
      return jsonResponse({ ok: false, error: "Missing required field", phase: "validate" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "Invalid email", phase: "validate" }, 400);
    }

    // Whitespace-tolerant API key lookup
    let apiKey: string | undefined;
    const envObj = (env as unknown) as Record<string, unknown>;
    for (const k of Object.keys(envObj)) {
      if (k.trim() === "RESEND_API_KEY") {
        const v = envObj[k];
        if (typeof v === "string" && v.length > 0) {
          apiKey = v.trim();
          break;
        }
      }
    }

    if (!apiKey) {
      return jsonResponse({ ok: false, error: "Email service not configured", phase: "env" }, 500);
    }

    // Optional fields
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const assetClass = typeof body.assetClass === "string" ? body.assetClass.trim() : "";
    const background = typeof body.background === "string" ? body.background.trim() : "";

    const fromAddress = (envObj.FROM_ADDRESS as string | undefined)?.trim() || "Swarm and Bee <onboarding@resend.dev>";
    const toAddress = (envObj.TO_ADDRESS as string | undefined)?.trim() || "build@swarmandbee.ai";

    const subject = `Hand us a deal - ${property.slice(0, 80)}`;
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
    ].join("\n");

    // Resend send
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
    });

    const resendStatus = resendResp.status;
    const resendBodyText = await resendResp.text().catch(() => "");

    if (!resendResp.ok) {
      return jsonResponse(
        {
          ok: false,
          error: "Resend rejected",
          phase: "resend",
          resend_status: resendStatus,
          resend_body: resendBodyText.slice(0, 800),
          from: fromAddress,
          to: toAddress,
        },
        502
      );
    }

    return jsonResponse({ ok: true, resend_status: resendStatus });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? (err.stack || "").slice(0, 800) : "";
    return jsonResponse(
      { ok: false, error: "Function exception", phase: "outer-catch", detail: msg, stack: stack },
      500
    );
  }
};
