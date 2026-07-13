# Vault AI

**Community-led and unaffiliated.**

Construction records are scattered and hard to verify. This project explores how to make project documentation organized, portable, and tamper-evident for real-world construction, warranty, permit, insurance, and property documentation.

This project is **not presented as the official Vault AI project** and is **not claiming approval, partnership, or control by the original Vault AI team**.

## What we are building

The first practical use case is a **Construction Document Vault** for organizing and verifying project records such as:

- contracts
- permits
- warranties
- invoices
- change orders
- lien waivers
- inspection records
- job photos
- service notes

The goal is to help homeowners, contractors, real estate professionals, and service providers keep a clean project history that can be searched, summarized, and verified.

## Product-first roadmap

We are intentionally approaching this in layers:

1. **Useful product** — project record packet / construction document vault
2. **Proof layer** — tamper-evident hashes, timestamps, salted commitments, and private/off-chain records
3. **Open documentation** — public roadmap, risks, contribution process, and attribution
4. **Legal/compliance review before any broader claims**

This public project does not promote digital-asset speculation, price discussion, or investment expectations.

## Original Vault AI attribution

This effort was inspired by the original Vault AI / OP Vault document-intelligence concept and open-source repository:

- Original repository: https://github.com/pashpashpash/vault-ai
- Original app/site: https://vault.pash.city/
- Original docs: https://docs.vault.pash.city/
- Original repo description: OP Vault used OpenAI + Pinecone to let users upload documents and ask questions over their contents.
- License shown on original repo: MIT License
- Original copyright notice shown in the repository: `Copyright (c) 2023 pashpashpash`

If any original Vault AI code is copied, modified, forked, or distributed here, the original MIT license and copyright notice must remain included.

See [`NOTICE.md`](NOTICE.md) and [`docs/original-project-attribution.md`](docs/original-project-attribution.md).

Public docs and demo materials:

- [`ROADMAP.md`](ROADMAP.md)
- [`docs/mvp-spec.md`](docs/mvp-spec.md)
- [`docs/mvp-demo-implementation-plan.md`](docs/mvp-demo-implementation-plan.md)
- [`docs/technical-architecture-mvp.md`](docs/technical-architecture-mvp.md)
- [`docs/threat-model.md`](docs/threat-model.md)
- [`docs/verification-spec.md`](docs/verification-spec.md)
- [`docs/financial-communications-policy.md`](docs/financial-communications-policy.md)
- [`docs/whitepaper-v0.2-outline.md`](docs/whitepaper-v0.2-outline.md)
- [`demo/`](demo/) — static synthetic MVP demo
- [`website/`](website/) — simple public landing-page artifact

## Non-affiliation statement

We attempted to contact the original Vault AI team through the contact channels we could identify. As of the current project notes, we have not received verified cooperation or approval. Direct/private X messaging appears unavailable, the Discord invite appears invalid, and email outreach has not produced a response.

Until formal written authorization exists, this repository should be described only as:

> A community-led, unaffiliated effort inspired by the original Vault AI document-intelligence concept.

## What this is not

This is not:

- an official announcement from the original Vault AI team
- a claim of ownership over the original Vault AI brand or social accounts
- investment advice
- a promise of digital-asset utility, profit, or returns
- a promotion group

## Near-term MVP

The first demo should be a **Project Record Packet** for a synthetic construction project:

- add synthetic project documents/photos
- classify document type
- extract suggested metadata with human confirmation
- flag missing or incomplete records
- generate a project timeline
- create SHA-256 proof-of-integrity records
- use salted commitments when proof records could connect to identifiable project data
- export originals, `manifest.json`, summary, and a verification script
- store private documents off-chain

Important: hashes make files tamper-evident since the time of recording. They do not prove the document is authentic, accurate, or that work was performed.

## Status

Early planning / documentation phase.

## Contributing

We welcome serious product, security, construction, legal/compliance, and documentation feedback. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) first.
