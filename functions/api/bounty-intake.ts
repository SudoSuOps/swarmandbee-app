// /api/bounty-intake — Cloudflare Pages Function · Discord webhook
//
// Bounty intake form handler. Validated, honeypot-protected, fires to a
// dedicated bounty channel. Mirrors the hand-us-a-deal.ts pattern so the
// debugging + whitespace-tolerance lessons learned there carry over.
//
// Required env var (CF Pages Production):
//   DISCORD_BOUNTY_WEBHOOK_URL  — encrypted secret · bounty channel webhook
//
// Optional fallback: if DISCORD_BOUNTY_WEBHOOK_URL is unset, this function
// will use DISCORD_WEBHOOK_URL (the existing CRE-deals channel) so submissions
// aren't lost during initial setup. Production should set the dedicated var.

interface Env {
  DISCORD_BOUNTY_WEBHOOK_URL?: string;
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

function resolveWebhook(env: Env): string {
  const candidates: Array<string | undefined> = [
    env.DISCORD_BOUNTY_WEBHOOK_URL,
    env.DISCORD_WEBHOOK_URL,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.replace(/\s+/g, "");
    }
  }
  // Tolerate stray whitespace in env var NAMES (CF dashboard paste quirks)
  try {
    const envObj = env as unknown as Record<string, unknown>;
    for (const k of Object.keys(envObj)) {
      const trimmedKey = k.trim();
      if (trimmedKey === "DISCORD_BOUNTY_WEBHOOK_URL" || trimmedKey === "DISCORD_WEBHOOK_URL") {
        const v = envObj[k];
        if (typeof v === "string" && v.length > 0) {
          return v.replace(/\s+/g, "");
        }
      }
    }
  } catch { /* noop */ }
  return "";
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

    // Honeypot — real users don't fill this field
    if (body && typeof body.company_website === "string" && body.company_website.length > 0) {
      return jsonResponse({ ok: true }); // pretend success, drop silently
    }

    // Required fields
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
    const work_type = typeof body.work_type === "string" ? body.work_type.trim().slice(0, 60) : "";
    const description = typeof body.description === "string" ? body.description.trim().slice(0, 6000) : "";

    if (!name || !email || !work_type || !description) {
      return jsonResponse({ ok: false, error: "Missing required field" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "Invalid email" }, 400);
    }
    if (description.length < 20) {
      return jsonResponse({ ok: false, error: "Description too short" }, 400);
    }

    // Optional fields
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
    const budget = typeof body.budget === "string" ? body.budget.trim().slice(0, 120) : "";
    const deadline = typeof body.deadline === "string" ? body.deadline.trim().slice(0, 120) : "";

    const webhookUrl = resolveWebhook(env);

    // Debug shortcut — verify env wiring without leaking the token
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
        used_var: env.DISCORD_BOUNTY_WEBHOOK_URL
          ? "DISCORD_BOUNTY_WEBHOOK_URL"
          : env.DISCORD_WEBHOOK_URL
            ? "DISCORD_WEBHOOK_URL (fallback)"
            : "(none)",
      });
    }

    if (!webhookUrl) {
      let envKeys: string[] = [];
      try {
        envKeys = Object.keys(env as unknown as Record<string, unknown>).sort();
      } catch { /* noop */ }
      return jsonResponse(
        {
          ok: false,
          error: "Discord webhook not configured",
          diagnostic: { env_keys: envKeys, env_keys_count: envKeys.length },
        },
        500
      );
    }

    const discordPayload = {
      embeds: [
        {
          title: truncate("Bounty intake · " + work_type, 256),
          color: 0x7df0a7, // accent-green to match bounty page
          fields: [
            { name: "Work type", value: truncate(work_type, 1024), inline: true },
            { name: "Budget", value: truncate(budget || "—", 1024), inline: true },
            { name: "Deadline", value: truncate(deadline || "—", 1024), inline: true },
            { name: "Brief", value: truncate(description, 1024), inline: false },
            { name: "Name", value: truncate(name, 1024), inline: true },
            { name: "Email", value: truncate(email, 1024), inline: true },
            { name: "Company", value: truncate(company || "—", 1024), inline: true },
          ],
          footer: { text: "bounty.swarmandbee.ai" },
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
