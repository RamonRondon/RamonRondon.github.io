# Hero QR Toggle — Proposal

## Problem Statement
The hero section's satellite button (→) currently navigates to `#education`, which is redundant and not very useful. The user wants to repurpose this button to toggle between the profile photo and a QR code containing their contact/professional data in vCard format.

## Target Users
Visitors to the portfolio site (recruiters, potential clients, networking contacts) who want a quick way to save Ramón's contact information by scanning a QR code directly from the hero section.

## Business Rules
1. The QR code must encode a vCard 3.0 string with: full name, phone, email, location, education history, and professional title
2. Data must come from a single JSON source of truth (`profile-data.json`) shared between the hero QR and the about page
3. Clicking the satellite button toggles between profile photo and QR — no navigation
4. The toggle must have a smooth flip/crossfade animation consistent with the existing design language
5. The QR must be generated client-side (no external API dependency)

## Product Outcome
- Visitors can scan the QR to instantly save Ramón's full contact card
- Single source of truth for profile data eliminates data drift between pages
- The satellite button gains actual utility instead of redundant navigation

## Scope Boundaries
**In scope:**
- JSON data file as single source of truth
- QR code generation (client-side, vCard format)
- Button behavior change (toggle instead of navigation)
- Flip animation between photo and QR
- About page reads contact data from JSON dynamically

**Out of scope:**
- Admin panel integration for editing the JSON
- QR code customization (colors, logo overlay)
- Analytics tracking on QR scans

## Risks
- QR library size impact on bundle — mitigated by using a lightweight library (qrcode-generator, ~4KB gzipped)
- vCard field length may make QR dense — mitigated by keeping education entries concise
