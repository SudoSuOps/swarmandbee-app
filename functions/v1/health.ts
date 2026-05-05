// GET /v1/health — service health · Atlas fleet status
// Reachable on any custom domain · canonical URL: api.swarmandbee.ai/v1/health

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Cache-Control": "no-store",
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS });
};

export const onRequestGet: PagesFunction = async () => {
  const body = {
    status: "ok",
    service: "swarmandbee.api",
    version: "0.1.0",
    mode: "stub",
    timestamp: new Date().toISOString(),
    atlas_fleet: {
      "atlas-smd-70b":      "cooking · ETA Wed PM",
      "atlas-smd-27b":      "live",
      "atlas-uw-27b":       "live",
      "atlas-bookmaker-9b": "queued · post-Atlas-70B",
      "atlas-closing-9b":   "queued",
      "atlas-hack-stnl-dg": "queued · first Hack to ship",
    },
    surfaces: {
      api:        "https://api.swarmandbee.ai",
      docs:       "https://docs.swarmandbee.ai",
      cli:        "https://cli.swarmandbee.ai",
      inference:  "https://inference.swarmandbee.ai",
      app:        "https://app.swarmandbee.ai",
      defendable: "https://defendable.swarmandbee.ai",
      pain:       "https://pain.swarmandbee.ai",
      pit:        "https://discord.gg/buUjYgzP5m",
    },
    defendable: {
      issuer:        "Swarm & Bee LLC",
      duns:          "138652395",
      hedera_topic:  "0.0.10291838",
      hedera_op:     "0.0.10291827",
      spec_version:  "v0.1.0",
    },
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
};
