# MVP Spec — Construction Document Vault

## Goal

Build a simple demo that shows how construction documents and photos can be organized, summarized, checked for completeness, and given tamper-evident proof records.

## Target users

- Homeowners
- Contractors
- Warranty/service teams
- Realtors
- Insurance/restoration contacts
- Property managers

## Core project record fields

- Project name
- Project address or redacted demo address
- Contractor/company
- Homeowner/customer name or redacted demo name
- Project type
- Start date
- Completion date
- Status
- Notes

## Document types

- Proposal
- Contract
- Change order
- Permit
- Inspection
- Warranty
- Invoice
- Receipt
- Lien waiver
- Before photo
- Progress photo
- Completion photo
- Service note

## MVP features

1. Create a project vault.
2. Upload a document or photo.
3. Classify the file type.
4. Summarize the file in plain English.
5. Flag missing or incomplete records.
6. Build a project timeline.
7. Create a SHA-256 document hash.
8. Display proof metadata.
9. Export a homeowner-friendly project summary.

## AI review examples

The AI assistant should be able to flag:

- missing signature,
- missing warranty document,
- missing permit,
- mismatched dates,
- contract present but no completion photos,
- invoice present but no signed change order,
- vague scope of work,
- missing contractor information.

Use “flag for review” language. Do not have AI make legal conclusions.

## Proof-layer rule

Documents stay private and off-chain. Only hashes, timestamps, and non-sensitive proof metadata should be considered for chain anchoring.

## Demo data rule

Use synthetic or sanitized demo data only. Do not use real customer documents in the public repo.
