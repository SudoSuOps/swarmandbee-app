// IPFS-bound build config for pain.defendable.eth.
//
// Differences from the main config:
//   - base: './'      — IPFS gateways serve from arbitrary roots; relative paths required
//   - outDir: 'dist-pain'  — separate output so it doesn't trample the CF Pages dist
//   - input: index.pain.html → src/main.pain.tsx → renders Pain directly (no router)
//
// Build:  npx vite build -c vite.config.pain.ts
// Pin:    w3 up dist-pain
// Set:    CID → contenthash on pain.defendable.eth via ENS app

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist-pain",
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, "index.pain.html"),
    },
  },
});
