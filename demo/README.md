# Construction Vault Demo

A static, front-end-only demonstration of the **Construction Vault** product — an AI-organized construction document intelligence platform with tamper-evident proof metadata.

## What this demo is

This demo shows the **MVP pipeline** for a roof replacement project:

1. **Project creation** — a synthetic project profile with address, customer, and contractor.
2. **Document upload & classification** — 10 document slots covering the full roof replacement lifecycle (contract, permit, invoice, change order, lien waiver, warranty, inspection, photos, insurance).
3. **Metadata extraction with human confirmation** — AI-extracted fields (parties, dates, amounts, permit numbers) shown alongside human-confirmed values.
4. **Completeness checklist** — a roof-replacement-specific checklist with visual progress.
5. **Timeline generation** — a chronological event log from project creation through final inspection.
6. **Proof manifest** — SHA-256 hashes for every present file, demonstrating tamper-evident proof.
7. **Export packet preview** — a preview of what gets exported for escrow, resale, or dispute resolution.

## What this demo is NOT

- **No real data.** Every record is synthetic and watermarked.
- **No backend.** This is a single-page static site that loads a local JSON file.
- **No file upload.** Documents are represented as metadata only; no actual files are stored or processed.
- **No legal or financial advice.** This is a product prototype, not a compliance tool.

## How to open it

Open `index.html` directly in any modern web browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or serve it with any static file server:

```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## What reviewers should test

1. **Load the page.** Confirm the synthetic disclaimer is visible and all sections render.
2. **Review the Project Overview.** Check the roof replacement profile at 42 Maple St.
3. **Expand documents.** Click any document row in the Document Vault to expand details.
4. **Review metadata.** Click "Review Metadata" on any document to see AI-extracted vs human-confirmed states.
5. **Toggle confirmations.** Use the Confirm/Unconfirm buttons in the Metadata Confirmation Panel to see state changes.
6. **Check the checklist.** Verify the progress bar updates based on the 12 checklist items.
7. **Inspect the Proof Manifest.** Confirm SHA-256 hashes are displayed for present files.
8. **Preview the Export Packet.** Review the JSON preview showing what would be included in an export.
9. **Run the verification script.** From the `scripts/` folder, run:
   ```bash
   python3 verify_packet.py path/to/manifest.json
   ```
   (You can create a sample manifest.json using the export preview JSON as a guide.)

## Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page demo layout |
| `app.js` | Dynamic rendering and interactions |
| `styles.css` | Dark theme styling |
| `data/sample-project.json` | Synthetic roof replacement dataset |
| `scripts/verify_packet.py` | Standalone manifest/hash verifier |
| `README.md` | This file |

## Synthetic data watermark

Every document, name, address, amount, permit number, and date in `sample-project.json` is fake. The dataset is explicitly watermarked as **SYNTHETIC SAMPLE** and is safe to share with reviewers, investors, and partners.
