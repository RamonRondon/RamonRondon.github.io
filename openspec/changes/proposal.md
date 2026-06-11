# SDD Proposal: Portfolio Initialization

## Goal
Initialize a premium web portfolio for Ramón Rondón (Mathematician & Entrepreneur) to be deployed on GitHub Pages. The design is inspired by the Mastercard design system detailed in `DESIGN.md`.

## Tech Stack
- **Framework/Build Tool**: Vite (Vanilla JS/HTML/CSS)
- **Package Manager**: pnpm
- **Styling**: Vanilla CSS (Mastercard inspired: putty-cream `#F3F0EE`, ink black `#141413`, signal orange `#CF4500`, large border-radii, circular mask portraits, orbits)
- **Deployment Target**: GitHub Pages (using a GitHub Action or standard build and publish process)

## Assets Integration
- **Profile Picture**: `ramon_rondon_studio_ghilbi.jpeg` (studio ghibli style) will be placed in `src/assets/profile.jpeg` or `public/assets/` and masked as a circular portrait.
- **Logos**: `logo_1.png` and `logo_2.png` will be moved to `src/assets/` or `public/assets/`.

## Architecture & File Structure
```
/
├── .github/workflows/deploy.yml   # GitHub Pages deployment workflow
├── openspec/                     # OpenSpec artifacts
├── public/                       # Static assets
│   ├── assets/
│   │   ├── logo_1.png
│   │   ├── logo_2.png
│   │   └── ramon_rondon_studio_ghilbi.jpeg
├── src/
│   ├── main.js                   # Application logic
│   └── style.css                 # Vanilla CSS design system (tokens, components, layouts)
├── index.html                    # Main HTML entry point
├── package.json                  # Vite configuration & dependencies
├── vite.config.js                # Vite config configured for GitHub Pages base path
└── pnpm-lock.yaml                # Lockfile
```

## Proposed Milestones
1. **Init Project**: Scaffold a Vite project with pnpm, configure gitignore, configure Vite.
2. **Move Assets**: Move the existing image assets into the standard project structure.
3. **Core Design System**: Build the vanilla CSS design tokens and core utilities matching the Mastercard guidelines in `DESIGN.md`.
4. **Layout & Components**:
   - Floating navigation bar (pill shape)
   - Hero section (stadium shape) featuring Ramón Rondón (Mathematician & Entrepreneur)
   - Facets sections (Mathematics & Business) with circular portraits, orbital orange lines, and satellite micro-CTAs
   - Footer section (Ink Black, 4-column layout)
5. **GitHub Actions**: Create the CI/CD pipeline to deploy the site automatically to GitHub Pages.
