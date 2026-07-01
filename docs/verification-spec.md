# Verification Spec — Project Record Packet

## Status

Draft stub. The goal is offline verifiability.

## Packet contents

A Project Record Packet should export as `packet.zip` containing:

- `originals/` — source documents/photos.
- `manifest.json` — file inventory, metadata, commitments, timeline, Merkle root.
- `summary.pdf` or `summary.html` — human-readable project summary.
- `verify.py` — offline verification script.
- timestamp proof files when available.

## Manifest fields

Each file entry should include:

- file path
- document type
- SHA-256 hash
- salt or private salt reference
- salted commitment
- AI-suggested metadata
- human-confirmation status
- timestamp/proof status

## Verification goals

`verify.py` should:

1. Recalculate each file hash.
2. Recalculate salted commitments where salts are available.
3. Rebuild the Merkle root.
4. Compare results to `manifest.json`.
5. Verify timestamp proof when available.
6. Report pass/fail clearly.

## Wording boundary

Verification confirms file integrity against the manifest. It does not confirm the truth, authenticity, legality, or completeness of the underlying documents.
