# Threat Model — Construction Record Vault

## Status

Draft stub. Requires security/legal review before public claims.

## What the proof layer is intended to help with

- Detect whether a file changed after it was recorded.
- Show when a packet or file commitment was timestamped.
- Allow offline verification of exported record packets.
- Preserve project documentation in an organized, exportable form.

## What it does not prove

- That a document is authentic.
- That a signature is valid.
- That work was actually performed.
- That a permit or inspection is valid.
- That a contractor is reputable.
- That records are court-admissible.

## Key threats

1. Document tampering after closeout.
2. Missing documents.
3. AI extraction errors.
4. Hash-confirmation attacks against guessable documents.
5. Accidental exposure of PII.
6. Loss of records when a platform disappears.
7. Overreliance on proof metadata as legal truth.

## Privacy posture

- Keep documents off-chain/private.
- Use salted commitments where identifiable project data may be guessable.
- Keep salts and originals off public ledgers.
- Use synthetic data in demos.
- Keep deletion possible for private stored data.
