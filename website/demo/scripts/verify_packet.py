#!/usr/bin/env python3
"""
verify_packet.py
Vault AI — Packet Verification Script

A simple, non-technical-friendly script that reads a manifest.json,
recalculates SHA-256 hashes for each listed file, and reports whether
everything matches (PASS) or something has changed (FAIL).

Usage:
    python verify_packet.py path/to/manifest.json

The manifest.json should look like this:
    {
      "files": [
        {"path": "contract.pdf", "sha256": "abc123..."},
        {"path": "photos/before.zip", "sha256": "def456..."}
      ]
    }

What it does:
- Reads the manifest.
- For each file, computes the SHA-256 hash again.
- Compares the new hash to the one stored in the manifest.
- Prints a clear PASS/FAIL table.
- Gives a short summary anyone can understand.
"""

import json
import hashlib
import os
import sys
from pathlib import Path


def hash_file(filepath: Path) -> str:
    """Return the SHA-256 hash of a file, reading in chunks."""
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while True:
            chunk = f.read(8192)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def verify_manifest(manifest_path: Path):
    if not manifest_path.exists():
        print(f"\n Error: Manifest not found: {manifest_path}\n")
        sys.exit(1)

    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    files = manifest.get("files", [])
    if not files:
        print("\n Warning: The manifest does not list any files to verify.\n")
        sys.exit(0)

    # Manifest directory = base for relative file paths
    base_dir = manifest_path.parent

    passed = 0
    failed = 0
    missing = 0

    print("\n" + "=" * 70)
    print(" Vault AI — Packet Verification Report")
    print("=" * 70)
    print(f" Manifest : {manifest_path}")
    print(f" Files to check: {len(files)}")
    print("-" * 70)
    print(f" {'Status':<8} {'File':<36} {'Hash Match'}")
    print("-" * 70)

    for entry in files:
        rel_path = entry.get("path", "")
        expected_hash = entry.get("sha256", "")
        full_path = base_dir / rel_path

        if not full_path.exists():
            print(f" MISSING  {rel_path:<36} (file not found)")
            missing += 1
            continue

        actual_hash = hash_file(full_path)
        if actual_hash.lower() == expected_hash.lower():
            print(f" PASS     {rel_path:<36} OK")
            passed += 1
        else:
            print(f" FAIL     {rel_path:<36} HASH MISMATCH")
            failed += 1

    print("-" * 70)
    total_checked = passed + failed + missing
    print(f" Results: {passed} passed, {failed} failed, {missing} missing")
    print("=" * 70)

    if failed == 0 and missing == 0:
        print("\n ✅ ALL CLEAR")
        print(" Every file matches its stored hash. The packet has not been")
        print(" tampered with and every expected file is present.\n")
    else:
        print("\n ⚠️  ISSUES FOUND")
        if failed:
            print(" - Some files have changed since the manifest was created.")
            print("   This can mean tampering, a bad copy, or a legitimate update.")
        if missing:
            print(" - Some files listed in the manifest are not in the folder.")
            print("   Check that you copied the entire packet.\n")

    return failed == 0 and missing == 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("\n Usage: python verify_packet.py <path/to/manifest.json>\n")
        print(" Example:")
        print("   python verify_packet.py ./export/manifest.json\n")
        sys.exit(1)

    manifest_file = Path(sys.argv[1]).resolve()
    ok = verify_manifest(manifest_file)
    sys.exit(0 if ok else 1)
