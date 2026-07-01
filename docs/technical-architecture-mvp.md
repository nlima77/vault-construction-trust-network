# Technical Architecture — Project Record Packet MVP

## Principle

Keep it boring and buildable by 1–2 people in weeks.

The MVP must be useful without wallets, smart contracts, or public-chain dependency.

## Product target

A contractor or operator creates a construction project, organizes records, confirms extracted metadata, checks completeness, generates a timeline, and exports an offline-verifiable **Project Record Packet**.

## Recommended architecture

### Frontend

- Next.js / React single-page app.
- Local-first UX where practical for the privacy story.
- Static demo may start as plain HTML/CSS/JS, then graduate to Next.js.

### Backend

- Python FastAPI or Node.
- Postgres for structured metadata.
- S3-compatible object storage or local disk for demo files.
- Files encrypted at rest in real deployments.

### Ingestion pipeline

1. Upload file.
2. Malware scan.
3. OCR:
   - Tesseract locally for demo/privacy path, or
   - cloud OCR for production option.
4. LLM classification + extraction using strict JSON schema by document type.
5. User confirmation UI.
6. Store structured metadata.

Important rule:

> AI output is a draft, never a record of truth.

## Classification types

- Contract
- Permit
- Invoice
- Change order
- Lien waiver
- Warranty
- Inspection
- Insurance document
- Photo
- Other

## Completeness engine

Use a plain rules table per project type. No ML needed.

Example project types:

- Roof replacement
- Kitchen remodel
- Addition
- Patio cover
- Concrete coating
- Restoration/insurance repair

Rule examples for roof replacement:

- Signed contract required.
- Permit required if jurisdiction requires it.
- Before photos recommended.
- Material specs/invoices recommended.
- Final invoice required.
- Warranty required.
- Lien waiver recommended/required depending on payment flow.
- Final inspection if applicable.

## Proof layer

### Per-file commitments

- SHA-256 per file.
- Salted per-file commitments in manifest.
- Salt stored off-chain/private to reduce hash-confirmation attacks against guessable documents.

### Project-level root

- Merkle root over project file commitments.

### Timestamping

Default:

- RFC 3161 timestamp authority.

Optional later:

- OpenTimestamps / Bitcoin anchoring.
- Off by default.
- No digital asset required.
- No smart contract.

## Record Packet export

`packet.zip` should include:

- `originals/` — original documents/photos.
- `manifest.json` — file list, salted commitments, metadata, timeline, Merkle root.
- `summary.pdf` or `summary.html` — human-readable project summary.
- `verify.py` — offline verification script.
- timestamp proof files if available.

Offline verifiability is the credibility centerpiece. The demo should show verification running without trusting the app.

## Synthetic dataset

Build one fictional project:

**42 Maple St roof replacement**

Include synthetic/watermarked:

- Fake contract
- Fake permit
- Two fake invoices
- One fake change order
- Fake warranty
- Fake inspection card
- Six fake photos

Every page/image should say:

> SYNTHETIC SAMPLE

Never use real customer documents, even redacted ones.

## Explicitly not in MVP

- Smart contracts
- Wallets
- Digital-asset functionality
- Multi-tenant auth hardening
- Mobile apps
- Reputation scores
- Real customer documents
