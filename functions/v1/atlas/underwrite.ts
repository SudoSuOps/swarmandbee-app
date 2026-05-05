// POST /v1/atlas/underwrite — IC-grade underwrite stub
// Returns realistic mock IC memo + Defendable deed wrapper.
// Real Atlas-SMD dispatch ships post-cook (Wed PM).

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function makeRequestId(): string {
  const r = new Uint8Array(16);
  crypto.getRandomValues(r);
  return "req_" + Array.from(r).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function makeMockMerkleRoot(): string {
  const r = new Uint8Array(32);
  crypto.getRandomValues(r);
  return "0x" + Array.from(r).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS });
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  // Auth check (stub mode · accepts any sb_* prefix · real validation in Phase B)
  const auth = request.headers.get("authorization") || "";
  const tokenMatch = /^Bearer\s+(sb_(live|test)_\w{8,})\s*$/i.exec(auth);
  if (!tokenMatch) {
    return jsonResponse({
      error: { type: "auth_required", message: "Missing or invalid Bearer token. Get a key in #issuers (the Pit) or app.swarmandbee.ai" }
    }, 401);
  }
  const apiKey = tokenMatch[1];

  // Parse body (JSON or multipart)
  let body: any = {};
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await request.json();
    } else if (ct.includes("multipart/form-data")) {
      const fd = await request.formData();
      body = Object.fromEntries(fd.entries());
      // Note: file (om) is in formData — in stub mode we just acknowledge it
      const om = fd.get("om");
      if (om && typeof om !== "string") {
        body.om_filename = (om as File).name;
        body.om_size = (om as File).size;
      }
    } else {
      body = await request.json().catch(() => ({}));
    }
  } catch {
    return jsonResponse({ error: { type: "bad_request", message: "Could not parse body" } }, 400);
  }

  const requestId = makeRequestId();
  const sessionId = "sess_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const merkleRoot = makeMockMerkleRoot();
  const hederaSeq = Math.floor(2700 + Math.random() * 100); // mock sequence in current range
  const timestamp = new Date().toISOString();

  // Stub IC memo · realistic shape
  const result = {
    deal_summary: {
      property:        body.property || "[unknown · supply via 'om' or 'property' field]",
      tenant:          body.tenant || null,
      asset_class:     body.deal_type || body.asset_class || "stnl-mf",
      list_price_usd:  body.list_price || null,
      asking_cap_rate: body.target_cap_rate || null,
    },
    underwrite: {
      math_check:       "12/12",
      cash_flow:        { yr1_noi: null, yr5_noi: null, yr10_noi: null, exit_cap: null },
      debt_service:     { quoted_rate: null, ltv: null, dscr_yr1: null },
      irr_sensitivity:  { p10: null, p50: null, p90: null },
      tenant_credit:    { rating: null, source: null, coverage_ratio: null },
      lease_terms:      { years_remaining: null, structure: null, bumps: null, options: null },
      market_position:  { msa: null, comp_set_size: null, median_cap: null },
    },
    recommendation: {
      call:        "stub_mode",
      confidence:  null,
      reasoning:   "Stub-mode response · Atlas-SMD live dispatch ships post-Atlas-70B (Wed PM). Real underwrite returns full 12-vector IC memo, Pass / Proceed call with confidence, and references to comparable trades.",
    },
    pricing: {
      list:      "$5,000",
      tier:      "atlas-smd-70b · ic-grade",
      eta:       "same-day · 48h max",
      next_step: "atlas-smd-27b live today; 70B ships Wed PM. Real underwrites available then.",
    },
  };

  const deed = {
    version:        "0.1.0",
    issuer:         "Swarm & Bee LLC",
    duns:           "138652395",
    spec_version:   "defendable.eth/v0.1.0",
    merkle_root:    merkleRoot,
    tribunal_grade: "stub",
    hedera_topic:   "0.0.10291838",
    hedera_seq:     hederaSeq,
    verify_url:     `https://hashscan.io/mainnet/topic/0.0.10291838/messages/${hederaSeq}`,
    anchored_at:    timestamp,
    proofs: {
      origin:    { corpus_cid: "stub", pair_count: 0 },
      quality:   { tribunal_score: null, judges: ["gemma3-12b", "qwen2.5-32b"] },
      process:   { recipe: "stub", base: "stub" },
      economics: { gpu_hours: 0, marginal_cost_usd: 0 },
      trust:     { issuer_sig: "0xstub", spec: "defendable.eth/v0.1.0" },
    },
    note: "Stub deed · returned for shape validation. Real deeds anchor live to Hedera HCS post-cook.",
  };

  return jsonResponse({
    request_id:  requestId,
    session_id:  sessionId,
    model:       "atlas-smd-70b",
    mode:        "stub",
    api_key_id:  apiKey.slice(0, 12) + "…",
    timestamp,
    result,
    defendable_deed: deed,
  });
};
