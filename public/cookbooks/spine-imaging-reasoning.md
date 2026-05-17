# Cookbook · Spine Imaging Reasoning · 3000

**Target failure mode.** Spine imaging interpretation (MRI sagittal/axial, CT, plain film), differential diagnosis chains, clinical-vignette → diagnostic-reasoning at radiology-fellow register. The model must reason from the imaging-finding *description* even when no actual image is in context (text-only training).

3000 cells lifts the model out of generic clinical-reasoning behavior and into spine-specific differential ranking. Sourced entirely from the 406K-cell imaging master — same provenance, scoped to one anatomical/clinical surface.

---

## ▍ The receipt

**Receipt: pending. Source corpus is at pre-Tribunal status.**

The source SKU — Royal Jelly Brioche (`MASTER_PLATINUM.jsonl`) — contains **406,181 multimodal clinical-imaging vignettes** (MSK / neuro / spine). Each cell pairs an imaging-finding description with diagnostic reasoning at fellow register. The corpus is real, on disk on the NAS at `/mnt/swarm/swarm-and-bee-datasets/medical/`, and ships free 50-cell samples at [/samples/free/royal-jelly-brioche.jsonl](/samples/free/royal-jelly-brioche.jsonl).

What's *pending* is the Tribunal seal on the full 406K corpus, and an empirical receipt from a cook on this specific 3000-cell subset.

If you order this cookbook, **you are explicitly purchasing a pre-Tribunal corpus.** The grade may shift after senior-hack review. We will honor any post-Tribunal upgrade in your account.

---

## ▍ The recipe — Swarm & Bee Gold Standard QLoRA

Same Gold Standard config. See [Glycemic Reasoning](/cookbooks/glycemic-reasoning.md) for full YAML.

**Imaging-lane-specific tweaks:**

```yaml
max_seq_length: 4096          # imaging vignettes run long — patient info + findings + diagnostic reasoning
context_truncation: longest_first
notes:
  - "If your base supports multimodal (LLaVA-class), pair this corpus with synthetic image tokens later. Text-only training is the v1 path."
```

---

## ▍ The ingredients — 3000 cells, deterministic

| SKU | Cells | Source file | Why it's in the mix |
|---|---:|---|---|
| [Royal Jelly Brioche](/menu.json) | **3,000** | `MASTER_PLATINUM.jsonl` (NAS · spine/neuro subset) | Apex-tier imaging vignettes — sagittal/axial MRI descriptions, patient context, differential diagnosis reasoning |
| **Total** | **3,000** | | |

**Single-SKU cookbook by design.** Imaging interpretation is a coherent task — mixing in non-imaging cells (PMC papers, NHS guidance) at low proportions tends to drift the model toward generalist clinical responses instead of focused radiology reasoning. We split the imaging task across two cookbooks instead: this one is focused (3000), [Multimodal Clinical Reasoning · 5000](/cookbooks/multimodal-clinical-reasoning.md) blends imaging with literature + guidelines at master scale.

Selection is **deterministic per cookbook** (seed = sha256("spine-imaging-reasoning")) — sub-selected from MASTER_PLATINUM to bias toward spine/MSK/neuro vignettes vs. other imaging modalities.

---

## ▍ Schema · what a Royal Jelly Brioche cell looks like

Multimodal clinical vignette schema:

```json
{
  "question": "[MRI IMAGE: sagittal T2 sequence of the lumbar spine] Patient Info: 47-year-old male with 3-week history of progressive lower back pain radiating to the left buttock and posterior thigh; no bowel/bladder dysfunction; weak left dorsiflexion. Past medical history: hypertension, BMI 31. Imaging findings: ...",
  "answer": "Findings most consistent with..."
}
```

The `[MRI IMAGE: ...]` token is a textual stand-in for an actual imaging modality. The model trains on the *finding description* — it does not see a real image. This is intentional: text-only models can learn imaging-reasoning structure (differential chains, ranking) and then graduate to multimodal at inference time.

If you have a multimodal base (LLaVA-class, Pixtral, etc.) you can substitute real images for the `[MRI IMAGE: ...]` token in a post-processing step — but that's outside the v1 scope of this cookbook.

---

## ▍ Loader

Standard cookbook loader. Imaging cells average ~1.5K tokens per cell vs ~600 for diabetes-lane cells — set your training `max_seq_length` accordingly.

```python
from datasets import Dataset
ds = Dataset.from_list(load_cookbook("spine-imaging-reasoning.jsonl"))
lens = [len(c["instruction"]) + len(c["response"]) for c in ds]
print(f"avg chars/cell: {sum(lens)/len(lens):.0f}, p95: {sorted(lens)[int(len(lens)*0.95)]}")
```

---

## ▍ Eval

`dmack_eval_set_v1` is designed for the diabetes lane and **does not contain imaging-specific probes.** Two paths:

1. **Run the dmack eval anyway** — useful as a *register-drift* check. The cooked model should NOT have lost compassionate-patient register from imaging training. If it scores worse on `founder-voice` probes after this cook than before, something went wrong.
2. **Run our bespoke radiology probes** (ships with the cookbook) — 30 hand-curated spine/neuro/MSK imaging-reasoning probes graded on differential-ranking and finding-extraction accuracy.

We do not yet have a public benchmark for radiology-fellow-register reasoning. If you have one and want to swap, tell us.

---

## ▍ How to order

```bash
swarmbee-bakery cookbook spine-imaging-reasoning

swarmbee-bakery order \
  --sku cookbook \
  --cookbook spine-imaging-reasoning \
  --name "Your Name" \
  --email "you@you.dev" \
  --settlement swarmusdc \
  --notes "cooking text-only on Mistral-7B; planning to swap to Pixtral later" \
  --confirm
```

---

## ▍ What you get on delivery

- `spine-imaging-reasoning-3000.jsonl` — 3000 cells
- `manifest.json` — per-cell sha256, ingredient breakdown, recipe pinned
- `manifest.sha256` — bundle root
- `eval/dmack_eval_set_v1.jsonl` — for register-drift check
- `eval/radiology_probes_v1.jsonl` — 30 bespoke imaging probes
- `eval/eval_runner.py`
- `recipe/qlora_config.yaml`
- `loader.py`, `README.md`
- *(optional)* Hedera HCS anchor tx
- *(optional)* cooked-for-you weights

---

## ▍ Pricing

- **$1,299** flat
- Cooked-for-you: +$249 + GPU pass-through (longer-context cells cost slightly more compute · budget ~$40)
- **Settlement:** Stripe invoice OR USDC to `swarmusdc.eth` (→ `0xBDe2153C5799f4012a9fAF327e3421D1caB4Ea23`) on **Ethereum L1 ERC-20** (mainnet only)

---

## ▍ No fake science

- Source corpus is on disk at `/mnt/swarm/swarm-and-bee-datasets/medical/MASTER_PLATINUM.jsonl` (958 MB · 406,181 cells). Free 50-cell sample at [/samples/free/royal-jelly-brioche.jsonl](/samples/free/royal-jelly-brioche.jsonl). You can taste the schema before ordering.
- Tribunal seal: **pre-seal.** Grade may shift post-review. Honored.
- Bespoke radiology eval probes are hand-curated — they are not a peer-reviewed benchmark. Use as one signal among several.
- This recipe has not been cooked at scale. Receipt: **pending.** First paying customer's pre/post publishes here.
