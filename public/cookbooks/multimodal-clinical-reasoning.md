# Cookbook · Multimodal Clinical Reasoning · 3000

**Target failure mode.** Broad medical reasoning spanning imaging + literature + clinical guidelines. For shops building general clinical-assistant models that need both diagnostic-imaging fluency AND citation-grounded answers from research and regulatory sources.

This is the cross-domain master cookbook. Wider scope than [Spine Imaging Reasoning](/cookbooks/spine-imaging-reasoning.md), shallower per-domain depth than [Diabetes Companion 3000](/cookbooks/diabetes-companion-3000.md).

---

## ▍ The receipt

**Receipt: pending.** This cookbook combines two pre-Tribunal imaging SKUs (Royal Jelly Brioche + Golden Glaze) with three sealed-or-graded-in-progress text SKUs (Madeleine, Global Crumpet, Federal Glaze).

The recipe inherits from two known-good cooks (Atlas-Qwen-27B loss 0.4186, SwarmCurator-9B loss 0.707) but the cross-domain mix has not been cooked at scale. **First customer is the first data point.**

If you're building a generalist clinical assistant, this cookbook trades depth (you'd get more from a single-domain cookbook on your target failure mode) for breadth (one cooked adapter that doesn't collapse on either imaging OR text-only clinical reasoning).

---

## ▍ The recipe — Swarm & Bee Gold Standard QLoRA

Same Gold Standard config. See [Glycemic Reasoning](/cookbooks/glycemic-reasoning.md) for full YAML.

**Multimodal-cross-domain tweaks:**

```yaml
epochs: 2                      # was 3; with 3000 cells the second epoch usually saturates
max_seq_length: 4096           # imaging cells run long
context_truncation: longest_first
notes:
  - "Mix evenly per gradient-accumulation step (don't stack 1500 imaging cells contiguously then 1500 text cells)"
  - "If your dataloader supports stratified sampling, stratify on the source field"
```

---

## ▍ The ingredients — 3000 cells, deterministic

| SKU | Cells | Source | Why it's in the mix |
|---|---:|---|---|
| [Royal Jelly Brioche](/menu.json) | **1500** | `MASTER_PLATINUM.jsonl` (NAS imaging) | Apex imaging vignettes — spine, MSK, neuro |
| [Golden Glaze](/menu.json) | **500** | `MASTER_GOLD.jsonl` (NAS imaging) | Gold-tier imaging companion — spine + neuro at honey grade |
| [Madeleine](/menu.json) | **500** | `08_pmc_pairs.jsonl` | PubMed Central — citation-anchored research |
| [Global Crumpet](/menu.json) | **300** | `09_international_pairs.jsonl` | NHS / IDF / WHO / NICE international clinical guidelines |
| [Federal Glaze](/menu.json) | **200** | `06_government_pairs.jsonl` | US federal-source patient + provider context |
| **Total** | **3000** | | |

Imaging dominates at 2000/3000 — this cookbook is imaging-led with text-grounding backing. If you want text-led with imaging backing, that's a different cookbook — talk to us in `--notes`.

---

## ▍ Schema

Mixed: imaging cells use the `[MRI IMAGE: ...]` pseudo-multimodal format (see [Spine Imaging Reasoning](/cookbooks/spine-imaging-reasoning.md) for the full schema). Text cells use the standard q/a + citation metadata format (see [Patient Communication](/cookbooks/patient-communication.md)).

The shared minimum across all 3000 cells: `{question, answer, source, specialty}`.

Imaging cells average ~1500 chars per cell. Text cells average ~600 chars. The bundle is heavy on the imaging side — train accordingly.

---

## ▍ Loader — stratified-sampling-aware

```python
import json
import random

def load_cookbook_stratified(jsonl_path: str, shuffle_seed: int = 42) -> list[dict]:
    """Loader that returns cells in a stratified-shuffled order — avoids contiguous
    runs of same-source cells which can cause gradient instability on small batches."""
    by_source: dict[str, list[dict]] = {}
    with open(jsonl_path) as f:
        for line in f:
            o = json.loads(line)
            src = o.get("source", "unknown")
            by_source.setdefault(src, []).append({
                "instruction": o["question"],
                "response":    o["answer"],
                "metadata": {k: v for k, v in o.items() if k not in ("question","answer")},
            })
    # Interleave: take one from each source until all consumed
    rng = random.Random(shuffle_seed)
    for src in by_source:
        rng.shuffle(by_source[src])
    pools = list(by_source.values())
    out = []
    while any(pools):
        for pool in pools:
            if pool:
                out.append(pool.pop())
    return out
```

For Axolotl: set `sample_packing: false` and `pad_to_sequence_len: false` so the mixed cell-length distribution doesn't create wasted compute on padding.

---

## ▍ Eval

Combined eval set ships with this cookbook:

- **`dmack_eval_set_v1.jsonl`** (60 probes) — full set, useful for register-hold check
- **`radiology_probes_v1.jsonl`** (30 probes) — bespoke imaging-reasoning probes (same as Spine Imaging cookbook)
- **`citation_probes_v1.jsonl`** (20 probes) — bespoke citation-fidelity probes (the cooked model should emit verifiable citations from the corpus, not hallucinate them)

110 probes total. Run pre/post; the deltas across all three sets together tell you if the cross-domain training landed without sacrificing any single domain.

---

## ▍ How to order

```bash
swarmbee-bakery cookbook multimodal-clinical-reasoning

swarmbee-bakery order \
  --sku cookbook \
  --cookbook multimodal-clinical-reasoning \
  --name "Your Name" \
  --email "you@you.dev" \
  --settlement stripe \
  --notes "building generalist clinical assistant on Qwen-3.5-8B base" \
  --confirm
```

---

## ▍ What you get on delivery

- `multimodal-clinical-reasoning-3000.jsonl` — 3000 cells, stratified-shufflable
- `manifest.json` — per-cell sha256, ingredient breakdown, source tags
- `manifest.sha256` — bundle root
- `eval/dmack_eval_set_v1.jsonl` + `radiology_probes_v1.jsonl` + `citation_probes_v1.jsonl`
- `eval/eval_runner.py` — runs all three sets and prints per-domain deltas
- `recipe/qlora_config.yaml`
- `recipe/stratified_loader.py` — the loader above
- `loader.py`, `README.md`
- *(optional)* Hedera HCS anchor tx
- *(optional)* cooked-for-you weights — pass-through GPU fee

---

## ▍ Pricing

- **$1799** flat for 3000-cell master cookbook
- Cooked-for-you: +$249 + GPU pass-through (longer cells, mixed lengths — budget ~$50)
- **First-customer-publishes-delta discount:** cooked-for-you fee waived if you share back pre/post on all three eval sets
- Settlement: Stripe invoice OR USDC to `swarmusdc.eth`

---

## ▍ No fake science

- Imaging SKUs are pre-Tribunal — disclosed up-front. Grade may shift post-review.
- Text SKUs (Madeleine, Crumpet, Federal Glaze) carry per-cell citations / source URLs — verifiable, not hallucinated.
- The cross-domain mix has not been cooked at scale on a known baseline. **Receipt: pending.** Customers willing to publish pre/post on the combined eval set get the cooked-for-you fee waived.
- If your cooked model collapses on one domain after this training, that is a cookbook bug — likely a curation imbalance — tell us, we adjust proportions and re-ship.
