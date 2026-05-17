# dl.swarmandbee.ai · NAS-native distribution

Customer-facing download layer for swarm-and-bee bakery orders. The customer's
bundle.zip streams directly from the Synology NAS disks through a CF Tunnel —
no third party in the data path, no R2, no signed-URL ceremony. The order id is
the unguessable token in V1.

```
customer browser
  ↓ GET https://dl.swarmandbee.ai/orders/BAK-20260512-F7X9/bundle.zip
  ↓
Cloudflare edge (TLS · cache · WAF)
  ↓
Cloudflare Tunnel (cloudflared Docker on Synology)
  ↓
nginx:alpine Docker on Synology
  ↓
/volume1/swarm/bakery-orders/BAK-20260512-F7X9/bundle.zip
```

## Hardware

- Synology DS1525+ · `minechain-nas` · 192.168.0.102
- 1.8 TB usable on `/volume1/swarm` · 355 GB free (as of 2026-05-12)
- AMD Ryzen V1500B · 4c/8t · 2.2 GHz · 8 GB DDR4 ECC default
- DSM 7.x · Container Manager (Synology's Docker package)
- 24/7 uptime · same disks that hold the source corpus → zero internal hop

## One-time deploy

### 1. Install Container Manager on the NAS

DSM web UI → **Package Center** → search **"Container Manager"** → Install.

### 2. Create the Cloudflare Tunnel

1. Open [Cloudflare Zero Trust](https://one.dash.cloudflare.com/)
2. Networks → Tunnels → **Create a tunnel**
3. Tunnel type: **Cloudflared**
4. Name: `swarmbee-nas-bakery`
5. On the Install connector page, choose **Docker** · copy the token after `--token`
6. Public Hostnames tab → **Add a public hostname**:
   - Subdomain: `dl`
   - Domain: `swarmandbee.ai`
   - Type: `HTTP`
   - URL: `nginx:80`
7. Save

(The CNAME you may have added manually for `dl.swarmandbee.ai` gets replaced
automatically by CF when the tunnel route is added — that's expected.)

### 3. Create the bakery-orders directory on the NAS

```bash
ssh dev@192.168.0.102 'mkdir -p /volume1/swarm/bakery-orders'
```

Or via DSM File Station: `swarm` shared folder → New → Create folder → `bakery-orders`.

### 4. Stage the compose project on the NAS

```bash
ssh dev@192.168.0.102 'mkdir -p /volume1/docker/bakery-distribution/nginx'

# from this repo:
scp infra/dl-tunnel/docker-compose.yml         dev@192.168.0.102:/volume1/docker/bakery-distribution/
scp infra/dl-tunnel/nginx/nginx.conf           dev@192.168.0.102:/volume1/docker/bakery-distribution/nginx/
scp infra/dl-tunnel/.env.example               dev@192.168.0.102:/volume1/docker/bakery-distribution/.env

# then SSH and edit .env to paste the actual TUNNEL_TOKEN:
ssh dev@192.168.0.102 'nano /volume1/docker/bakery-distribution/.env'
```

### 5. Deploy via Container Manager UI

1. DSM → **Container Manager** → Project → **Create**
2. Project name: `bakery-distribution`
3. Path: `/volume1/docker/bakery-distribution`
4. Source: **Use existing docker-compose.yml**
5. (If the UI asks for env vars: leave blank — they're read from `.env` in the project dir)
6. Click **Next** → **Build**

Both containers should start. In the project's Containers tab you should see
`sb-cloudflared` and `sb-nginx-bakery` both healthy within ~30 seconds.

### 6. Smoke test

```bash
# Drop a test file:
ssh dev@192.168.0.102 'mkdir -p /volume1/swarm/bakery-orders/test && \
    echo "Hello from the NAS." > /volume1/swarm/bakery-orders/test/hello.txt'

# Fetch from the internet:
curl https://dl.swarmandbee.ai/orders/test/hello.txt
# expected: Hello from the NAS.

# Verify a directory listing is blocked:
curl -i https://dl.swarmandbee.ai/orders/
# expected: 404

# Verify hidden files blocked:
curl -i https://dl.swarmandbee.ai/orders/.git/config
# expected: 404

# Cleanup:
ssh dev@192.168.0.102 'rm -rf /volume1/swarm/bakery-orders/test'
```

## What it enforces

- `*.zip` downloads with `Content-Disposition: attachment` (forces download, no in-browser open)
- `*.json` / `*.md` / `*.txt` viewable inline (so customers can paste-check the JSON manifest in a browser)
- 24-hour CF-edge cache (`Cache-Control: public, max-age=86400, immutable`) — bundles never change once written
- No directory listings · ever
- No hidden files served (`.git`, `.DS_Store`, `.env`, etc all 404)
- No upload accepted (`client_max_body_size 1m` + nginx is read-only mount)
- Custom header `X-Source: Swarm-and-Bee · NAS · sovereign-distribution` on every response — receipts can grep for this

## Maintenance

- Logs: Container Manager UI → containers → `sb-nginx-bakery` / `sb-cloudflared` → Details → Log
- Update images: `docker compose pull && docker compose up -d` in the project dir
- Bundle cleanup: bundles live forever in `/volume1/swarm/bakery-orders/` by default.
  V2 adds a cron that moves bundles older than 30 days to `_archive/` (still on disk
  for audit/chargebacks, just not customer-accessible via the URL pattern).
