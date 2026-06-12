# Hero QR Toggle — Specs

## SPEC-001: Profile Data JSON Schema

**Type:** Data Contract

The profile data file (`src/data/profile-data.json`) serves as the single source of truth for contact and professional information displayed in the QR code and the about page.

### Schema
```json
{
  "name": { "first": "string", "last": "string", "full": "string" },
  "title": "string",
  "phone": "string (E.164 format)",
  "email": "string",
  "location": { "city": "string", "country": "string" },
  "website": "string (URL)",
  "education": [
    {
      "level": "string",
      "degree": "string",
      "institution": "string",
      "description": "string"
    }
  ],
  "professional": {
    "experience": "string",
    "description": "string"
  }
}
```

### Acceptance Criteria
- AC1: JSON file validates against the schema above
- AC2: All fields used in `about.html` contact section and timeline are present
- AC3: Phone number uses international format (e.g., `+573175140755`)

---

## SPEC-002: vCard Generation

**Type:** Functional

The system generates a vCard 3.0 string from the profile JSON data.

### vCard Fields Mapping
| Profile JSON | vCard Property |
|---|---|
| `name.last;name.first` | `N` |
| `name.full` | `FN` |
| `title` | `TITLE` |
| `phone` | `TEL;TYPE=CELL` |
| `email` | `EMAIL;TYPE=INTERNET` |
| `location.city, location.country` | `ADR` |
| `website` | `URL` |
| `education[*].degree + institution` | `NOTE` (concatenated) |

### Acceptance Criteria
- AC1: Generated vCard string starts with `BEGIN:VCARD` and ends with `END:VCARD`
- AC2: vCard is version 3.0
- AC3: Education entries are included in the NOTE field, separated by newlines
- AC4: Scanning the resulting QR in a phone saves a valid contact

---

## SPEC-003: QR Code Rendering

**Type:** Functional

A QR code is generated client-side from the vCard string and displayed inside the hero portrait circle.

### Requirements
- Use `qrcode-generator` library (lightweight, no dependencies, ~4KB gzipped)
- QR rendered as an SVG element for crisp display at any size
- Error correction level: M (15% recovery — good balance of density vs reliability)
- QR fills the circular portrait area with appropriate padding

### Acceptance Criteria
- AC1: QR code renders as inline SVG, not canvas or image
- AC2: QR is scannable from a phone at typical viewing distance
- AC3: No external network requests for QR generation

---

## SPEC-004: Toggle Interaction

**Type:** Behavioral

The satellite button toggles between the profile photo/video and the QR code display.

### States
1. **Photo state** (default): Profile image visible, video plays on hover. Button shows QR icon (⊞ or similar)
2. **QR state**: QR code visible, centered in the circle. Button shows camera/photo icon (↩ or similar). Video hover disabled.

### Behavior
- Click satellite button → crossfade transition (0.4s ease-in-out) between photo and QR
- The `<a>` tag becomes a `<button>` (no navigation)
- `aria-label` updates to reflect current action ("Show QR code" / "Show photo")
- State is NOT persisted — always starts on photo

### Acceptance Criteria
- AC1: Button click toggles between photo and QR with smooth animation
- AC2: No page navigation occurs on click
- AC3: Video hover only works in photo state
- AC4: Accessible labels update on toggle
- AC5: Button icon changes to indicate available action

---

## SPEC-005: About Page Dynamic Rendering

**Type:** Functional

The about page reads from `profile-data.json` to render contact cards and education timeline, ensuring data stays in sync with the QR code.

### Dynamic Elements
1. **Contact cards**: Phone number, email, location
2. **Education timeline**: Degree names, institutions, descriptions

### Acceptance Criteria
- AC1: Changing a value in `profile-data.json` updates both the QR and the about page
- AC2: HTML structure and styling remain identical to current hardcoded version
- AC3: No visible flash of unstyled/empty content during load
