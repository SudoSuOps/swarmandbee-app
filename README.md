# swarmandbee.ai

Public site for **Swarm & Bee LLC** — the AI-native CRE Capital Markets firm.

> A real firm. Real compute. Real brokers, real agents, real deals.
> 186 GPUs of sovereign compute. Verified. Vetted. *Virtu*.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- React Router (BrowserRouter, single-route)
- Static `dist/` deployable to Cloudflare Pages, IPFS, or anywhere static-hosted

## Develop

```bash
npm install
npm run dev      # → http://localhost:5180
```

## Build

```bash
npm run build    # → dist/
```

## Deploy

**Cloudflare Pages** (current production at swarmandbee.ai):

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- `public/_redirects` handles SPA fallback

**IPFS** (sovereignty backup):

```bash
storacha up dist/
```

## Project structure

```
src/
├── App.tsx            ← Router (single route /)
├── main.tsx           ← Entry · BrowserRouter
├── pages/
│   └── Landing.tsx    ← The whole site (single-page)
└── styles/
    └── index.css      ← Tailwind base + global
```

## Brand discipline

- **Legal entity**: Swarm & Bee LLC. Never name "Caballerz Network LLC" in customer-facing copy.
- **Founder posture**: Donovan Mackey is publicly **Founder · Family Office**, NOT Broker of Record. The brokerage is operated by designated licensed brokers.
- **Never name** any specific national CRE platform competitor (Marcus & Millichap, etc.). Use "national platform" or "the institutional CRE brokerages."
- **Founder credentials lead with**: $8B in closed transactions, 30 years on a national platform.
- **CRE-only mission**: the firm is a CRE Capital Markets firm. Never multi-vertical (no medical / aviation / legal / federal data products on this site).
- **Public copy register**: pass, not kill. Investors interview brokers, not the other way around.
- **The model home stays internal** until Class A is earned by closing real deals. Phase 1 is to build the firm and earn the closes.
- D-U-N-S 138652395 lives only in the footer.

## License

Private. © Swarm & Bee LLC.
