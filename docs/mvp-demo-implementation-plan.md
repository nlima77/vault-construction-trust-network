# Project Record Packet MVP — Implementation Plan

## Direction

The product must be valuable with **no wallet, no smart contract, and no blockchain requirement**.

Smallest useful product:

> A contractor can create a synthetic project, upload/organize records, confirm extracted metadata, see what is missing, generate a timeline, and export a verifiable Project Record Packet.

If the demo cannot show steps 2–7 below on a synthetic roof-replacement project in under five minutes, it is not ready for public launch.

## MVP scope

One project, one user, no accounts, no backend complexity, no real chain.

### Core flow

1. Create a project
   - Address
   - Project type
   - Dates
   - Parties

2. Upload/add documents/photos
   - For static demo, use preloaded synthetic files/data and optionally fake drag/drop UI.

3. AI classification
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

4. Metadata extraction with human confirmation
   - Parties
   - Dates
   - Amounts
   - Permit numbers
   - Scope keywords
   - Important rule: extracted data is **unverified until human-confirmed**.

5. Completeness check by project type
   - Example project type: synthetic roof replacement
   - Checklist examples:
     - signed contract
     - permit if required
     - before photos
     - material invoice/specs
     - change orders
     - final invoice
     - warranty
     - lien waiver
     - final inspection if applicable

6. Auto-generated project timeline
   - Contract signed
   - Permit pulled
   - Materials ordered
   - Work started
   - Change order approved
   - Final invoice issued
   - Warranty delivered

7. Export Project Record Packet
   - ZIP of originals or simulated originals
   - `manifest.json`
   - Per-file SHA-256 hashes
   - Metadata table
   - Timeline
   - Human-readable PDF/HTML summary
   - Standalone verification script

8. Optional proof anchoring
   - Off by default
   - Possible later path: Merkle root + OpenTimestamps
   - No digital asset required
   - No blockchain required for MVP

## First user types

1. Residential remodel/specialty contractors
   - Roofing, GC, restoration, exterior remodeling
   - Paying customer because they generate repeat closeout packets.

2. Homeowners at trigger events
   - Selling home
   - Insurance claim
   - Warranty claim
   - Good demo audience, harder first paying segment.

3. Restoration/insurance-adjacent operators
   - Public adjusters
   - Restoration firms
   - Claims/documentation-heavy operators

## Must-have now

- Synthetic roof-replacement project dataset
- Document list with file types
- Classification labels
- Metadata extraction fields
- Human-confirmation states
- Missing-document checklist
- Project timeline
- Hash/proof table
- Export packet mock or working static ZIP generator
- Verification script or clear verification explanation

## Later only

- Blockchain anchoring by default
- Multi-party attestations
- Contractor reputation/scores
- Permit-office integrations
- Marketplace
- Mobile capture app
- Digital-asset functionality

## Explicitly out of scope for now

- Financial/investment claims
- Financial/investment language
- Real customer documents
- Public launch before demo works
- Reputation scoring without legal review
- Automatic claims that AI extraction is verified truth

---

# Implementation tasks

## Task 1 — Synthetic roof replacement dataset

Create or update:

- `demo/data/sample-project.json`

Include:

- Project profile
- Parties
- Document records
- Classification labels
- Extracted metadata
- Human confirmation status
- Checklist items
- Timeline events
- SHA-256 example hashes
- Packet-level Merkle/root hash placeholder

Verification:

- No real customer data.
- All names/addresses synthetic.

## Task 2 — Project Record Packet UI

Create/update:

- `demo/index.html`
- `demo/styles.css`
- `demo/app.js`

Sections:

- Hero: “Project Record Packet”
- Synthetic-data disclaimer
- Project overview
- Document vault table
- Classification confidence/status
- Metadata confirmation panel
- Completeness checklist
- Timeline
- Hash/proof manifest table
- Export packet panel

Verification:

- A reviewer can understand the product in under five minutes.

## Task 3 — Human-confirmation language

Add clear labels:

- AI-suggested
- Human-confirmed
- Missing
- Needs review

Copy rule:

> AI extraction helps organize records. It does not make a document true or legally verified until reviewed by a human.

Verification:

- No section implies AI facts are automatically true.

## Task 4 — Export packet mock

Generate a realistic export panel showing:

- `originals/`
- `manifest.json`
- `project-summary.html` or PDF placeholder
- `verify_packet.py`
- `README.txt`

If possible, make a real static download later.

Verification:

- Reviewer understands what leaves the system and how it can be checked.

## Task 5 — Verification script

Create:

- `demo/verify_packet.py` or `demo/scripts/verify_packet.py`

Purpose:

- Read `manifest.json`
- Recalculate file hashes
- Report pass/fail

For static demo, script can be illustrative if sample originals are not included yet.

Verification:

- Script or explanation is understandable to non-technical reviewers.

## Task 6 — Private review README

Create/update:

- `demo/README.md`

Include:

- What this demo is
- What it is not
- How to open it
- What reviewers should test
- Questions to answer

Verification:

- Demo can be sent privately without additional explanation.
