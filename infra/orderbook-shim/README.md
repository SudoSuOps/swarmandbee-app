# orderbook.swarmandbee.ai · NAS-native order book

The sovereign order ledger for Swarm & Bee. SQLite on owned hardware, served by
a small FastAPI shim behind the existing Cloudflare Tunnel on the NAS. CF Pages
Functions call this shim over HTTPS — no third-party database in the path.

```
swarmbee-bakery order --confirm           (or browser /box)
  ↓
CF Pages Function /api/bakery-intake
  ↓
fetch(https://orderbook.swarmandbee.ai/orders, X-Orderbook-Key: ...)
  ↓
Cloudflare edge → existing cloudflared tunnel on this NAS
  ↓
orderbook-shim (FastAPI, host port 18489)
  ↓
/volume1/swarm/orderbook/orders.db                  ← source of truth
```

## Hardware

- Synology DS1525+ · `minechain-nas` · 192.168.0.102
- Same NAS that serves `dl.swarmandbee.ai` (shared Cloudflare Tunnel)
- DSM 7.x · Container Manager (Synology's Docker)
- SQLite DB persists at `/volume1/swarm/orderbook/orders.db`

## One-time deploy

### 1. Stage on NAS

The deploy directory is **already on the NAS** at `/volume1/swarm/orderbook-shim/`
(staged from this repo via NFS). If you prefer a separate path, copy it:

```bash
ssh dev@192.168.0.102 'mkdir -p /volume1/docker/orderbook-shim'
ssh dev@192.168.0.102 'cp -r /volume1/swarm/orderbook-shim/* /volume1/docker/orderbook-shim/'
```

### 2. Create the SQLite data dir on NAS

```bash
ssh dev@192.168.0.102 'mkdir -p /volume1/swarm/orderbook && chmod 755 /volume1/swarm/orderbook'
```

(DSM File Station works too — make a folder `orderbook` under the `swarm` share.)

### 3. Set the API key

The `.env` file in the deploy directory must contain the real key:

```bash
ssh dev@192.168.0.102 'cat /volume1/swarm/orderbook-shim/.env'
# → ORDERBOOK_API_KEY=...real-key-here...
```

The same value goes into CF Pages env vars (step 5 below). They MUST match.

### 4. Deploy via Container Manager UI

1. DSM → **Container Manager** → Project → **Create**
2. Project name: `orderbook-shim`
3. Path: `/volume1/swarm/orderbook-shim` (or `/volume1/docker/orderbook-shim` if you copied)
4. Source: **Use existing docker-compose.yml**
5. Click Next → Next → Done. Container Manager will build the image and start it.

After build, check the container logs in Container Manager — you should see:
```
INFO: Uvicorn running on http://0.0.0.0:8000
INFO: Application startup complete.
```

Sanity check from any LAN box:
```bash
curl http://192.168.0.102:18489/healthz
# → {"ok":true,"version":"0.1.0","db_path":"/data/orders.db","n_orders":0,"ts":"..."}
```

### 5. Add Public Hostname to the existing Cloudflare Tunnel

The cloudflared tunnel `swarmbee-nas-bakery` already runs on this NAS. We just
add another public hostname to it (no new tunnel needed).

1. [Cloudflare Zero Trust](https://one.dash.cloudflare.com/) → Networks → Tunnels
2. Click `swarmbee-nas-bakery` (the existing tunnel)
3. Public Hostname tab → **Add a public hostname**
   - Subdomain: `orderbook`
   - Domain:    `swarmandbee.ai`
   - Type:      `HTTP`
   - URL:       `192.168.0.102:18489`
4. Save

Now `https://orderbook.swarmandbee.ai/healthz` should return the same JSON
as the LAN curl in step 4. If yes — the tunnel is wired.

### 6. Set CF Pages env vars

CF Pages → **swarmandbee-app** → Settings → Environment Variables → Production:

```
ORDERBOOK_API_KEY        = same key as the NAS .env (step 3)
ORDERBOOK_BASE_URL       = https://orderbook.swarmandbee.ai   (optional · default)
RESEND_API_KEY           = re_…(from resend.com/api-keys)
ORDER_RECEIPT_FROM       = Swarm & Bee <orders@swarmandbee.ai>
```

Trigger a redeploy (env var changes need a deploy to bind).

### 7. End-to-end smoke test

```bash
swarmbee-bakery order --sku by-the-pound --domain medical \
  --name "Donovan" --email "minechain@proton.me" \
  --notes "orderbook smoke test · Dmack RJ · 1 lb" --confirm
# → returns BAK-YYYYMMDD-XXXX
#   ✓ persisted in /volume1/swarm/orderbook/orders.db on YOUR nas
#   ✓ branded receipt email lands in your inbox (Resend)
#   ✓ Discord ping fires for the human ops channel

swarmbee-bakery account --order BAK-... --email minechain@proton.me
# → full order detail + event log, fetched from YOUR nas

swarmbee-bakery orders --email minechain@proton.me
# → your full order history
```

## Admin operations

### Flip an order to `invoiced`

```bash
curl -X POST https://orderbook.swarmandbee.ai/orders/status \
  -H "X-Orderbook-Key: ..." \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "BAK-20260516-ABCD",
    "to_status": "invoiced",
    "actor": "human:dmack",
    "invoice_url": "https://invoice.stripe.com/...",
    "invoice_amount_usd": 1249.00,
    "detail": "Stripe invoice sent · net 7"
  }'
```

### Mark `paid` (auto-stamps `paid_at`)

```bash
curl -X POST https://orderbook.swarmandbee.ai/orders/status \
  -H "X-Orderbook-Key: ..." -H "Content-Type: application/json" \
  -d '{"order_id":"BAK-...","to_status":"paid","actor":"human:dmack","payment_tx_ref":"in_..."}'
```

### Mark `shipped` (set `download_url`, `bundle_sha256`, optional Hedera tx)

```bash
curl -X POST https://orderbook.swarmandbee.ai/orders/status \
  -H "X-Orderbook-Key: ..." -H "Content-Type: application/json" \
  -d '{
    "order_id": "BAK-...",
    "to_status": "shipped",
    "actor": "human:dmack",
    "bundle_sha256": "...",
    "download_url": "https://dl.swarmandbee.ai/orders/BAK-.../bundle.zip",
    "download_expires_at": "2026-06-16T00:00:00Z",
    "hedera_anchor_tx": "0.0.10291838@..."
  }'
```

### Backups

SQLite WAL means the DB is consistent at any snapshot. Synology snapshot
schedule on `/volume1/swarm/orderbook/` gives versioned backups for free.
Recommended: nightly snapshot, 30-day retention.

## What's NOT in v1

- Magic-link auth (current model: `order_id` + `email` is the proof — like UPS tracking)
- Web admin UI for status flips (curl works fine for low volume; build when annoying)
- Stripe webhook to auto-flip `invoiced → paid`
- Hedera anchor auto-write on `paid → shipped`
- Multi-region replication (single-NAS is fine for v1; CF tunnel handles edge delivery)

## License

MIT (matches the broader Swarm & Bee project surface).
