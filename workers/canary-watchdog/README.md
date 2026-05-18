# canary-watchdog

Cloudflare Worker that probes the **bakery cash register** every 60 seconds
and alerts via Resend when it stops printing.

## What it watches

| Cron | What it does |
|---|---|
| `* * * * *` | POST `https://bakery.swarmandbee.ai/api/canary` → expects `{"ok":true,...}`. Tracks consecutive failures in KV. Sends Resend email on 2nd consecutive fail (and on recovery). Re-alerts at most every `ALERT_DEBOUNCE_MIN` minutes while still down. |
| `5 0 * * *` | GET `https://bakery.swarmandbee.ai/healthz`, read `n_orders`, diff against yesterday's KV snapshot. Alert if count dropped (DB rollback?) or flatlined on a weekday (intake silently broken?). |

The canary probe path exercises:
`CF edge → Pages Function /api/canary → CF Tunnel → cloudflared on NAS → FastAPI shim → SQLite SELECT`
— the same hops a real `swarmbee-bakery order --confirm` takes, minus the
INSERT and the Resend receipt fire.

## One-time deploy

```bash
cd workers/canary-watchdog
npm install

# Authenticate (opens browser)
npx wrangler login

# Create the KV namespace and paste the returned id into wrangler.toml
npx wrangler kv namespace create CANARY_KV
# → copy the `id = "..."` line and replace REPLACE_WITH_KV_ID_FROM_WRANGLER_CREATE

# Set the Resend key as a secret (NOT in wrangler.toml)
npx wrangler secret put RESEND_API_KEY
# (paste the key when prompted)

# Optional: lock down manual triggers
npx wrangler secret put TRIGGER_KEY
# (any random string — required on /run-canary and /run-daily POSTs)

# Deploy
npx wrangler deploy
```

After deploy, Cloudflare assigns a `canary-watchdog.<your-subdomain>.workers.dev`
URL. Test it:

```bash
curl https://canary-watchdog.<sub>.workers.dev/                          # help text
curl https://canary-watchdog.<sub>.workers.dev/status                    # current KV state
curl -X POST -H "X-Trigger-Key: $TRIGGER_KEY" \
  https://canary-watchdog.<sub>.workers.dev/run-canary                   # force a probe right now
```

Tail logs while debugging:

```bash
npx wrangler tail
```

## Verifying the alert path

Force a failure to confirm the alert path is wired (don't leave it broken):

```bash
# Stop the shim container on the NAS, wait 2 minutes, restart it.
ssh smash@192.168.0.102 'sudo docker stop sb-orderbook-shim'
# ... watch your inbox for [DOWN] ...
ssh smash@192.168.0.102 'sudo docker start sb-orderbook-shim'
# ... watch for [RECOVERED] ...
```

## Why a Worker, not a Pages Function

Pages Functions don't support cron triggers — only Workers do. Same CF
account, same Resend key, just a different deployment surface.

## Why this isn't enough on its own

The canary catches when the cash register stops responding. It does NOT
catch when the NAS has been single-tunnel-only since day one — that's a
**single point of failure**, not an outage. Fixing it needs a redundant
ingress path (Tailscale Funnel, second cloudflared tunnel, or a replicated
shim on a second host). See the SPOF discussion in the parent project notes.
