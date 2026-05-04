// /api/hand-us-a-deal — Cloudflare Pages Function
//
// Receives the "Hand us a deal" form, validates, fans out to Discord webhook
// (primary) and Resend email (optional secondary).
//
// Env vars (CF Pages → Settings → Environment Variables · Production):
//   DISCORD_WEBHOOK_URL  — REQUIRED for Discord notification
//                          (encrypted secret · Discord webhook URL)
//   RESEND_API_KEY       — OPTIONAL · re_... · enables email send
//   FROM_ADDRESS         — OPTIONAL · used by Resend
//                          must be on a domain verified at resend.com/domains
//                          e.g. "Swarm & Bee <build@swarmandbee.ai>"
//   TO_ADDRESS           — OPTIONAL · defaults to "build@swarmandbee.ai"
//
// Form submission succeeds if EITHER Discord OR Resend delivers.

interface Env {
  DISCORD_WEBHOOK_URL?: string;
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

// Truncate strings to Discord embed field limits (1024 chars per value)
function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 3) + "...";
}

interface Submission {
  name: string;
  email: string;
  property: string;
  task: string;
  company: string;
  phone: string;
  assetClass: string;
  background: string;
}

async function sendDiscord(webhookUrl: string, sub: Submission): Promise<{ ok: boolean; status: number; body: string }> {
  const embed = {
    title: truncate("🐝 Hand us a deal · " + sub.property, 256),
    color: 0xd97706, // amber-600
    fields: [
      { name: "Property / Deal", value: truncate(sub.property, 1024), inline: false },
      { name: "Asset Class", value: truncate(sub.assetClass || "—", 1024), inline: true },
      { name: "Task", value: truncate(sub.task, 1024), inline: true },
      { name: "Background", value: truncate(sub.background || "*(none)*", 1024), inline: false },
      { name: "Name", value: truncate(sub.name, 1024), inline: true },
      { name: "Company", value: truncate(sub.company || "—", 1024), inline: true },
      { name: "Email", value: truncate(sub.email, 1024), inline: true },
      { name: "Phone", value: truncate(sub.phone || "—", 1024), inline: true },
    ],
    footer: { text: "swarmandbee.ai · Hand us a deal form" },
    timestamp: new Date().toISOString(),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const bodyText = await resp.text().catch(() => "");
    return { ok: resp.ok, status: resp.status, body: bodyText.slice(0, 500) };
  } catch (err) {
    clearTimeout(timeoutId);
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 0, body: "fetch error: " + msg.slice(0, 300) };
  }
}

async function sendResend(apiKey: string, fromAddress: string, toAddress: string, sub: Submission): Promise<{ ok: boolean; status: number; body: string }> {
  const subject = "Hand us a deal - " + sub.property.slice(0, 80);
  const text = [
    "New deal submission via swarmandbee.ai",
    "",
    "PROPERTY: " + sub.property,
    "ASSET CLASS: " + (sub.assetClass || "(not specified)"),
    "TASK: " + sub.task,
    "",
    "BACKGROUND:",
    sub.background || "(none provided)",
    "",
    "CONTACT:",
    "Name: " + sub.name,
    "Company: " + (sub.company || "-"),
    "Email: " + sub.email,
    "Phone: " + (sub.phone || "-"),
    "",
    "Submitted: " + new Date().toISOString(),
  ].join("\n");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: sub.email,
        subject: subject,
        text: text,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const bodyText = await resp.text().catch(() => "");
    return { ok: resp.ok, status: resp.status, body: bodyText.slice(0, 500) };
  } catch (err) {
    clearTimeout(timeoutId);
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 0, body: "fetch error: " + msg.slice(0, 300) };
  }
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
    }

    // Honeypot
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

    // Optional fields (sanitized + truncated)
    const sub: Submission = {
      name: name.slice(0, 200),
      email: email.slice(0, 200),
      property: property.slice(0, 500),
      task: task.slice(0, 200),
      company: typeof body.company === "string" ? body.company.trim().slice(0, 200) : "",
      phone: typeof body.phone === "string" ? body.phone.trim().slice(0, 50) : "",
      assetClass: typeof body.assetClass === "string" ? body.assetClass.trim().slice(0, 200) : "",
      background: typeof body.background === "string" ? body.background.trim().slice(0, 5000) : "",
    };

    const discordUrl = (env.DISCORD_WEBHOOK_URL || "").trim();
    const resendKey = (env.RESEND_API_KEY || "").trim();

    if (!discordUrl && !resendKey) {
      return jsonResponse({ ok: false, error: "No notification channel configured" }, 500);
    }

    // Fire both in parallel · success if EITHER succeeds
    const [discordResult, resendResult] = await Promise.all([
      discordUrl ? sendDiscord(discordUrl, sub) : Promise.resolve({ ok: false, status: 0, body: "not configured" }),
      resendKey
        ? sendResend(
            resendKey,
            (env.FROM_ADDRESS || "Swarm and Bee <onboarding@resend.dev>").trim(),
            (env.TO_ADDRESS || "build@swarmandbee.ai").trim(),
            sub
          )
        : Promise.resolve({ ok: false, status: 0, body: "not configured" }),
    ]);

    const anySuccess = discordResult.ok || resendResult.ok;

    if (anySuccess) {
      return jsonResponse({
        ok: true,
        channels: {
          discord: discordResult.ok ? "delivered" : `failed (${discordResult.status})`,
          resend: resendResult.ok ? "delivered" : (resendKey ? `failed (${resendResult.status})` : "not configured"),
        },
      });
    }

    return jsonResponse(
      {
        ok: false,
        error: "All notification channels failed",
        discord: { status: discordResult.status, body: discordResult.body },
        resend: { status: resendResult.status, body: resendResult.body },
      },
      502
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonResponse({ ok: false, error: "Function exception", detail: msg.slice(0, 500) }, 500);
  }
};
