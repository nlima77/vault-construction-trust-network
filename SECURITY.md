# Security Policy

This project may eventually handle sensitive construction records, customer documents, and proof metadata. Security and privacy are core product requirements, not later add-ons.

## Do not post sensitive data

Do not open issues, pull requests, or discussions containing:

- customer names
- addresses
- phone numbers
- emails
- contracts
- signatures
- permit numbers
- insurance documents
- invoices
- payment data
- API keys, access tokens, credentials, or secrets

## Reporting a concern

Until a dedicated security contact is established, open a minimal GitHub issue that says only:

> Security/privacy concern identified. Maintainer contact needed.

Do not include exploit steps or private data publicly.

## Design principles

- Documents should be stored privately, not in the public repository.
- Private customer information should never be put directly on-chain or into public proof records.
- Chain-of-custody should use privacy-preserving hashes, salts, timestamps, and proof metadata.
- Admin access should be limited and documented.
- Secrets must never be committed to the repository.
- Demo data must be synthetic or fully sanitized.

## Wallet / private-key caution

No contributor should request wallet private keys, seed phrases, exchange logins, custody of funds, or any other sensitive credential.
