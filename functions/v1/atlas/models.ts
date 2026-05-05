// GET /v1/atlas/models — list available Atlas-fleet models

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS });
};

export const onRequestGet: PagesFunction = async () => {
  const body = {
    object: "list",
    data: [
      {
        id: "atlas-smd-70b",
        object: "model",
        owned_by: "swarmandbee",
        tier: "smd",
        size_billion: 70,
        status: "cooking",
        eta: "2026-05-06T18:00:00Z",
        recipe: "recipe_1_70b_atlas",
        base: "meta-llama/Llama-3.3-70B-Instruct",
        capabilities: ["underwrite", "loi", "psa", "ic_memo", "qualify", "negotiate", "close"],
      },
      {
        id: "atlas-smd-27b",
        object: "model",
        owned_by: "swarmandbee",
        tier: "smd",
        size_billion: 27,
        status: "live",
        recipe: "recipe_2_27b_specialist",
        base: "Qwen/Qwen3.5-27B",
        capabilities: ["underwrite", "ic_memo", "qualify"],
      },
      {
        id: "atlas-uw-27b",
        object: "model",
        owned_by: "swarmandbee",
        tier: "uw",
        size_billion: 27,
        status: "live",
        capabilities: ["underwrite", "cash_flow", "ic_memo", "irr_sensitivity"],
      },
      {
        id: "atlas-bookmaker-9b",
        object: "model",
        owned_by: "swarmandbee",
        tier: "bookmaker",
        size_billion: 9,
        status: "queued",
        capabilities: ["om", "proposal", "pitch_deck", "loi", "blast_compose"],
      },
      {
        id: "atlas-closing-9b",
        object: "model",
        owned_by: "swarmandbee",
        tier: "closing",
        size_billion: 9,
        status: "queued",
        capabilities: ["psa", "escrow", "dd_coordination"],
      },
      {
        id: "atlas-hack-stnl-dg",
        object: "model",
        owned_by: "swarmandbee",
        tier: "hack",
        size_billion: 4,
        status: "queued",
        recipe: "recipe_4_4b_hack",
        base: "Qwen/Qwen3.5-4B-Instruct",
        vertical: "stnl-dg",
        capabilities: ["dial", "lead_qual", "vertical_lookup"],
      },
    ],
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
};
