# Hero QR Toggle — Tasks

## Review Workload Forecast
- Estimated changed lines: ~250
- Chained PRs recommended: No
- 400-line budget risk: Low
- Decision needed before apply: No

## Task List

### T1: Create profile-data.json
- [ ] Create `src/data/profile-data.json` with all profile data matching about.html content
- [ ] Include: name, title, phone, email, location, website, education array, professional info

### T2: Install qrcode-generator
- [ ] Add `qrcode-generator` as a dependency via npm/pnpm

### T3: Create profile-loader.js module
- [ ] Create `src/profile-loader.js`
- [ ] Implement `getProfileData()` — fetch + cache JSON
- [ ] Implement `buildVCard(data)` — generate vCard 3.0 string
- [ ] Implement `generateQRSvg(text)` — generate QR as SVG element

### T4: Implement QR toggle in index.html + main.js
- [ ] Change satellite `<a>` to `<button>` in index.html
- [ ] Add QR icon SVG to the button
- [ ] In main.js: import profile-loader, init QR on page load
- [ ] In main.js: add toggle click handler with state management
- [ ] In main.js: disable video hover when QR is active

### T5: Add CSS for QR overlay and toggle states
- [ ] Add `.hero-qr-overlay` styles (positioned inside portrait circle)
- [ ] Add `.hero-qr-overlay.active` transition
- [ ] Add `.hero-portrait-circle.qr-active` to disable video hover
- [ ] Add button icon swap styles
- [ ] Ensure responsive behavior for QR display

### T6: Dynamic about page rendering
- [ ] Add `data-profile-*` attributes to about.html dynamic elements
- [ ] In main.js: detect about page and call renderAboutPage()
- [ ] Implement DOM population from JSON data
- [ ] Verify hardcoded fallback works when JS is disabled

### T7: Manual verification
- [ ] Run dev server and test toggle animation
- [ ] Scan QR code with phone — verify contact saves correctly
- [ ] Verify about page data matches JSON
- [ ] Test responsive behavior on mobile breakpoints
