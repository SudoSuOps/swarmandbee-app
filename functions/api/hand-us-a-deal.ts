// /api/hand-us-a-deal — Cloudflare Pages Function · Discord webhook
//
// Inline Discord webhook send. Validated, sanitized, fires to Discord.
// Resend can be re-introduced once Discord is verified working.
//
// Required env var (CF Pages Production):
//   DISCORD_WEBHOOK_URL  — encrypted secret · Discord channel webhook URL

interface Env {
  DISCORD_WEBHOOK_URL?: string;
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

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 3) + "...";
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

    if (body && typeof body.website === "string" && body.website.length > 0) {
      return jsonResponse({ ok: true });
    }

    const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
    const property = typeof body.property === "string" ? body.property.trim().slice(0, 500) : "";
    const task = typeof body.task === "string" ? body.task.trim().slice(0, 200) : "";

    if (!name || !email || !property || !task) {
      return jsonResponse({ ok: false, error: "Missing required field" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "Invalid email" }, 400);
    }

    const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 50) : "";
    const assetClass = typeof body.assetClass === "string" ? body.assetClass.trim().slice(0, 200) : "";
    const background = typeof body.background === "string" ? body.background.trim().slice(0, 1024) : "";

    // Whitespace-tolerant env var lookup (CF Pages dashboard sometimes
    // captures stray whitespace in variable names — happened with RESEND_API_KEY)
    let webhookUrl = (env.DISCORD_WEBHOOK_URL || "").trim();
    if (!webhookUrl) {
      try {
        const envObj = env as unknown as Record<string, unknown>;
        for (const k of Object.keys(envObj)) {
          if (k.trim() === "DISCORD_WEBHOOK_URL") {
            const v = envObj[k];
            if (typeof v === "string" && v.length > 0) {
              webhookUrl = v.trim();
              break;
            }
          }
        }
      } catch {}
    }

    // Debug shortcut: GET-style probe via body.debug=true returns sanitized
    // info about the webhook URL without leaking the token. Use this to
    // verify the env var is wired correctly post-deploy.
    if (body && body.debug === true) {
      const safe = webhookUrl
        ? webhookUrl.slice(0, 50) + "…(len=" + webhookUrl.length + ")"
        : "(empty)";
      return jsonResponse({
        ok: true,
        debug: true,
        webhook_prefix: safe,
        webhook_starts_with_https: webhookUrl.startsWith("https://"),
        webhook_contains_discord: webhookUrl.includes("discord.com/api/webhooks/"),
        webhook_has_whitespace: /\s/.test(webhookUrl),
      });
    }
    if (!webhookUrl) {
      // Diagnostic: list env keys so we can see if var is missing or misnamed
      let envKeys: string[] = [];
      try {
        envKeys = Object.keys(env as unknown as Record<string, unknown>).sort();
      } catch {}
      return jsonResponse({
        ok: false,
        error: "Discord webhook not configured",
        diagnostic: { env_keys: envKeys, env_keys_count: envKeys.length },
      }, 500);
    }

    const discordPayload = {
      embeds: [
        {
          title: truncate("🐝 Hand us a deal · " + property, 256),
          color: 0xd97706,
          fields: [
            { name: "Property / Deal", value: truncate(property, 1024), inline: false },
            { name: "Asset Class", value: truncate(assetClass || "—", 1024), inline: true },
            { name: "Task", value: truncate(task, 1024), inline: true },
            { name: "Background", value: truncate(background || "*(none)*", 1024), inline: false },
            { name: "Name", value: truncate(name, 1024), inline: true },
            { name: "Company", value: truncate(company || "—", 1024), inline: true },
            { name: "Email", value: truncate(email, 1024), inline: true },
            { name: "Phone", value: truncate(phone || "—", 1024), inline: true },
          ],
          footer: { text: "swarmandbee.ai · Hand us a deal" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    let status = 0;
    let bodyText = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const resp = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      status = resp.status;
      try {
        bodyText = (await resp.text()).slice(0, 500);
      } catch {
        bodyText = "(body-read failed)";
      }
    } catch (fetchErr) {
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      return jsonResponse(
        { ok: false, error: "Discord fetch failed", detail: msg.slice(0, 500) },
        502
      );
    }

    if (status < 200 || status >= 300) {
      return jsonResponse(
        { ok: false, error: "Discord rejected", discord_status: status, discord_body: bodyText },
        502
      );
    }

    return jsonResponse({ ok: true, channel: "discord", discord_status: status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonResponse({ ok: false, error: "Function exception", detail: msg.slice(0, 500) }, 500);
  }
};
