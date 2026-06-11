# Technical Specifications: Ramón Rondón Portfolio

## 1. Visual & Colors
- **Canvas Cream (`#F3F0EE`)**: Default page background.
- **Ink Black (`#141413`)**: Heading color, body text color, primary buttons background, footer background.
- **Signal Orange (`#CF4500`)**: Highlight color, consent buttons.
- **Light Signal Orange (`#F37338`)**: Accent color, orbital orange lines.
- **White (`#FFFFFF`)**: Card backgrounds, floating navigation pill background, satellite buttons.

## 2. Typography
- **Font Stack**: `Sofia Sans`, `Arial`, sans-serif. Sofia Sans is imported from Google Fonts.
- **Headings (H1, H2, H3)**: Weight 500, letter-spacing `-2%`.
- **Eyebrow**: Weight 700, letter-spacing `+4%`, uppercase, prefixed with accent dot (`•`).
- **Body**: Weight 450 (or 400 with tight letter-spacing as fallback), line-height `1.4`.

## 3. UI Components
- **Floating Nav Pill**:
  - Rounded pill shape (`border-radius: 999px`)
  - Floats ~24px below viewport top.
  - Contains logo, links, and search/contact action.
- **Hero Stadium**:
  - Stadium container (`border-radius: 40px`).
  - Dark/warm background.
  - Contains large H1 title, subtitle, and primary Ink Black CTA.
- **Circular Facet Cards (Mathematics & Business)**:
  - Perfect circular portrait masks (`border-radius: 50%`).
  - Satellite arrow button docked bottom-right.
  - Thin Light Signal Orange orbital lines connecting the circles.
- **Footer**:
  - Ink Black background, white text.
  - Large conversational header.
  - 4-column layout.

## 4. Configuration & Deployment
- **Vite Config**:
  - Configured with `base: './'` or `base: '/Portafolio/'` depending on GitHub Pages path. Since the repository folder is `Portafolio`, the base should be `/Portafolio/` or `/` (if custom domain is used). We will default to `/` or configure for standard subpath deployment.
- **GitHub Actions**:
  - Deploy on push to `main` branch.
  - Runs `pnpm install`, `pnpm build`, and uploads static files to `github-pages`.
