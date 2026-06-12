# Hero QR Toggle — Design

## Architecture Overview

```
profile-data.json (single source of truth)
       │
       ├──► index.html / main.js
       │       ├── Reads JSON via fetch()
       │       ├── Builds vCard string
       │       ├── Generates QR SVG via qrcode-generator
       │       └── Toggle logic on satellite button
       │
       └──► about.html / main.js
               ├── Reads JSON via fetch()
               └── Populates contact cards + timeline
```

## File Changes

### [NEW] `src/data/profile-data.json`
Single source of truth with all profile data. Fetched at runtime by both pages.

### [NEW] `src/profile-loader.js`
Shared module that:
1. Fetches and caches `profile-data.json`
2. Exports `getProfileData()` — returns cached promise
3. Exports `buildVCard(data)` — generates vCard 3.0 string from profile data
4. Exports `renderAboutPage(data)` — populates about.html DOM elements

### [MODIFY] `src/main.js`
- Import `profile-loader.js`
- Add QR toggle initialization:
  - Fetch profile data
  - Generate QR SVG element (hidden initially)
  - Insert QR into `.hero-portrait-circle`
  - Convert satellite `<a>` to `<button>`
  - Bind click handler for toggle

### [MODIFY] `index.html`
- Change satellite `<a href="#education">` to `<button>` with QR icon
- Add `id="hero-qr-toggle"` for JS binding

### [MODIFY] `about.html`
- Add `data-profile-*` attributes to dynamic elements for JS targeting
- Keep hardcoded content as fallback (progressive enhancement)

### [MODIFY] `src/style.css`
- Add `.hero-qr-overlay` styles (absolute positioned inside portrait circle)
- Add `.hero-qr-overlay.active` fade-in animation
- Add `.hero-satellite--qr` state styles (icon swap)
- Ensure QR SVG is white background with padding inside the circle

## QR Generation Strategy

Using `qrcode-generator` (npm: `qrcode-generator`) because:
- Zero dependencies
- ~4KB gzipped
- Generates SVG natively
- Works in all browsers
- No external API calls

Alternative considered: `qrcode` npm package (~33KB) — rejected for size.

## Toggle Animation

CSS-driven crossfade using opacity transitions on two layers:
```
.hero-portrait-circle
  ├── .hero-avatar-img     (z-index: 2, opacity: 1 → 0)
  ├── .hero-avatar-video   (z-index: 1, existing hover behavior)
  └── .hero-qr-overlay     (z-index: 3, opacity: 0 → 1)
```

When toggled to QR state:
- `.hero-qr-overlay` gets `.active` class → opacity: 1
- `.hero-avatar-img` stays at opacity: 1 underneath (no change needed)
- Video hover is disabled via a `.qr-active` class on the circle
- Button icon swaps to a "back to photo" indicator

## Progressive Enhancement

The about page keeps its hardcoded HTML content. JavaScript enhances it by overwriting text nodes from JSON. If JS fails, the page works with the original hardcoded data.
