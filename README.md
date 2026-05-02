# swarmandbee.ai

Marketing site for **Swarm & Bee** — the Commercial Compute Intelligence Refinery.

> Honey by the pound. Organic signal, never recycled. Trust. Verified. Vetted.
> Defendable Class A. We scale. We weigh. We ship. AI assets with real-economy ROI.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- React Router (BrowserRouter)
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

**IPFS** (sovereignty backup):

```bash
storacha up dist/
```

## Project structure

```
src/
├── App.tsx            ← Router
├── main.tsx           ← Entry
├── pages/
│   └── Landing.tsx    ← The whole site (single-page v1)
└── styles/
    └── index.css      ← Tailwind base + global
```

## Brand discipline

Per Donovan's standing rules:

- Never name **Caballerz Network LLC** in customer-facing copy. Use only "Swarm & Bee" + D-U-N-S 138652395.
- Never name **Marcus & Millichap** by name. Use "national platform".
- Lead the founder block with $8B in closed transactions and 30 years on a national platform.

## Sister sites in the SwarmStack

- [swarmgeo.eth.limo](https://swarmgeo.eth.limo) — AI search readiness scanner ($29 wedge)
- [swarmgraph.eth.limo](https://swarmgraph.eth.limo) — Deeded inventory graph

## License

Private. © Swarm & Bee.
