# Cookbook · Diabetes Companion · 3000

**Target failure mode.** Full-stack diabetes assistant. Clinical decision support + research grounding + patient communication + lived-experience register, all in one cooked adapter. **Two-stream architecture preserved** — the cooked model never uses lived voice as medical authority, never uses sourced authority as register.

This is the master cookbook. It is the recipe staged for the dmack.ai senior-hack cook itself. If you order this, you are ordering exactly what we are cooking for ourselves.

---

## ▍ The receipt

**This recipe is the dmack.ai cook.**

The dmack.ai project is the Swarm & Bee flagship medical model — Donovan's lived experience as a Type 1 diabetic + Addison's disease, fused with peer-reviewed medical authority, in one model. The ingredient mix below is **the exact mix sealed for the senior-hack canary-then-cook review.**

**Status:** staged. The full cook is in the canary-then-cook queue. When the cook finalizes, the actual loss curve, full 60-probe eval delta, Hedera-anchored bundle hash, and the cooked adapter weights publish in this cookbook.

**Estimated completion:** 2026-Q3.

**Until then:** order this only if you are willing to be the first external receipt. You'll get the corpus identical to what we are cooking on, you can cook it yourself, and your eval-delta becomes part of the cookbook's published history.

---

## ▍ The recipe — Swarm & Bee Gold Standard QLoRA

Same Gold Standard config used to cook Atlas-Qwen-27B (loss 0.4186) and SwarmCurator-9B (loss 0.707). See [Glycemic Reasoning](/cookbooks/glycemic-reasoning.md) for full YAML.

**Master-cookbook adjustment:**

```yaml
epochs: 2                    # was 3 — more data, less overfit risk; 2 passes plenty at 3000 cells
gradient_checkpointing: true # mandatory at this size on most consumer 5090/PRO 6000 setups
```

For 4B base: ~6-8h cook on a single RTX PRO 6000 Blackwell.
For 8B base: ~12-16h on the same.
For 27B base: cook on a 2× PRO 6000 with FSDP — ~24-36h.

---

## ▍ The ingredients — 3000 cells, deterministic

| SKU | Cells | Source | Why it's in the mix |
|---|---:|---|---|
| [Dmack's Royal Jelly](/menu.json) | **1500** | `MASTER_dmack_ai_v1_royal_jelly.jsonl` | The v1 flagship master. Rolled-up across endo, CGM, PMC, OpenAlex, intl, gov, patterns, refusal. |
| [Madeleine](/menu.json) | **500** | `08_pmc_pairs.jsonl` | Extra PubMed Central research backing — citation-anchored answers. |
| [Global Crumpet](/menu.json) | **500** | `09_international_pairs.jsonl` | International guidelines (NHS / IDF / WHO / NICE / DiabetesUK / DiabetesAU). |
| [Cinnamon Spiral](/menu.json) | **300** | CGMacros (`02_*` files) | Real CGM + meal-macros from PhysioNet patients. |
| [Founder's Pretzel](/menu.json) | **200** | `07_bigideas_pattern_pairs.jsonl` | Lived voice — register only, never authority. Two-stream guardrail enforced at curation. |
| **Total** | **3000** | | |

Cell selection is **deterministic** (`random.seed(42)`, sha256-pinned). The 1500 Dmack's Royal Jelly cells in this cookbook are sampled across all 10 source streams in the master, in their original proportions — you get a representative slice of the full multi-source flagship, not a biased pull.

---

## ▍ Schema · multi-source

Cells in this cookbook carry their original metadata (specialty, source, tier, citation if applicable). The shared minimum is `{question, answer, specialty, tier, source}`. The full schema-by-source is documented in the per-SKU cookbooks ([Glycemic Reasoning](/cookbooks/glycemic-reasoning.md), [Diabetic Foot Care](/cookbooks/diabetic-foot-care.md), [Patient Communication](/cookbooks/patient-communication.md)).

**Two-stream tag:** each cell carries a `source` field. Cells from `dmack-hand-curated` (Founder's Pretzel) are tagged as such. If you want to *exclude* the lived-voice stream at training time (e.g. for a pure-authority research model), filter `metadata.source != "dmack-hand-curated"` in the loader. The loss-weighting trick for over-emphasizing the lived stream also works — your choice.

---

## ▍ Loader — multi-source-aware

```python
import json

def load_cookbook(jsonl_path: str, exclude_sources: list[str] = None) -> list[dict]:
    """Multi-source-aware loader for the Diabetes Companion 3000 bundle.
    Pass exclude_sources to filter out a stream (e.g. for pure-authority training)."""
    exclude = set(exclude_sources or [])
    cells = []
    with open(jsonl_path) as f:
        for line in f:
            o = json.loads(line)
            if o.get("source") in exclude:
                continue
            cells.append({
                "instruction": o["question"],
                "response":    o["answer"],
                "stream":      "lived" if o.get("source") == "dmack-hand-curated" else "sourced",
                "metadata": {k: v for k, v in o.items() if k not in ("question","answer")},
            })
    return cells
```

The `stream` field is useful for per-sample weighting if you want to bias the cook toward one stream or the other. Default config treats both streams equally.

---

## ▍ Eval · dmack_eval_set_v1 (all 60 probes)

This is the only cookbook that runs the **full 60-probe eval set**. Every category in scope:

| Category | Probes | Why all of them matter here |
|---|---:|---|
| `founder-voice` | **20** | Register hold across all lived-voice cells |
| `emergency-hard-stop` | **10** | The model must escalate, every time, in critical cases |
| `adrenal-crisis` | **10** | Addison's-specific (founder has Addison's + Type 1) — the corpus was built knowing both diagnoses live in one body |
| `refusal-compliance` | **10** | Defer when patient-specific info is incomplete |
| `citation-behavior` | **5** | Cite the source, don't invent |
| `voicedrift-and-thinktag` | **5** | No chain-of-thought leakage, no register drift |

This eval set was designed against this exact recipe. Running it post-cook tells you if the model became dmack.ai or if it became something else.

---

## ▍ How to order

```bash
swarmbee-bakery cookbook diabetes-companion-3000

swarmbee-bakery order \
  --sku cookbook \
  --cookbook diabetes-companion-3000 \
  --name "Your Name" \
  --email "you@you.dev" \
  --settlement swarmusdc \
  --notes "cooking on Qwen-3.5-8B · I'm prepared to be the first external receipt and share my eval delta back" \
  --confirm
```

If you're willing to publish your pre/post eval delta back to us, we discount the cooked-for-you fee to $0. Skin-in-the-game pricing for first customers of a pre-publication recipe.

---

## ▍ What you get on delivery

- `diabetes-companion-3000.jsonl` — the 3000 cells
- `manifest.json` — per-cell sha256, full ingredient breakdown, recipe pinned, two-stream tags
- `manifest.sha256` — bundle root
- `eval/dmack_eval_set_v1.jsonl` — all 60 probes
- `eval/eval_runner.py` — grading harness
- `eval/eval_by_category.py` — per-category scoring (the breakdown above)
- `recipe/qlora_config.yaml` — Gold Standard with master-cookbook adjustments
- `recipe/two_stream_loader.py` — the multi-source-aware loader
- `loader.py`, `README.md`, `LICENSE_NOTES.md`
- *(optional)* Hedera HCS anchor tx
- *(optional)* cooked-for-you weights — first-customer discount available

---

## ▍ Pricing

- **$1799** flat for 3000-cell master cookbook
- Cooked-for-you: **+$249** prep + GPU pass-through (~$30-50 on a single PRO 6000 for 6-8h cook on 4B-8B base)
- **First-customer-publishes-delta discount:** cooked-for-you fee waived if you agree to share your pre/post `dmack_eval_set_v1` scores back so they can be added as a published receipt
- Settlement: Stripe invoice OR USDC to `swarmusdc.eth`

---

## ▍ No fake science

- This is the dmack.ai recipe, not an aspirational one. The corpus is on disk at `/mnt/swarm/dmack-ai/corpus/` and `/home/swarm/Desktop/dmack-ai/corpus/`. The eval set is at `~/Desktop/dmack-ai/eval/dmack_eval_set_v1.jsonl`. Both are in active use for the staged cook.
- The cooked model does not exist yet. **No claim of cooked-model performance is made.** When the cook finalizes, those numbers publish here. Until then this is a *corpus + recipe + eval* product, not a *trained-adapter* product.
- The two-stream architecture is enforced at curation — lived-voice cells are explicitly tagged so any downstream filter can isolate them. If you discover a lived-voice cell that smells like medical authority, that is a curation bug — report it, we fix and re-ship.
- Lived experience: Type 1 diabetic, Addison's disease, insulin-dependent, lost left big toe + half of right big toe to infection, 14 foot-complication surgeries. The founder lives the disease. The corpus knows it.
