# Shopify Theme Boilerplate

A flexible, production-ready **Shopify theme boilerplate** combining a structured development environment (inspired by WordPress) with Shopify’s Liquid architecture.

Built with Tailwind CSS v4, GSAP animations, and Vite. Designed for fast setup with a clean, scalable workflow.

---

## Stack

* **Liquid** — Shopify templating (sections, templates, snippets)
* **Tailwind CSS v4** — utility-first styling with CSS variable theming
* **GSAP + gsap-motion.js** — declarative animations via `data-gsap`
* **Vite** — builds global JS and CSS into `/assets`
* **Custom Scripts** — dev + packaging workflow

---

## Architecture

This boilerplate uses a **hybrid development approach**:

* **Structured dev environment** (similar to WordPress) inside `/src`
* **Actual Shopify theme** lives in `/src/theme`
* **Vite** compiles JS + Tailwind → `/src/theme/assets`
* **Shopify CLI (`theme dev`)** serves the theme locally

### Build Output
* `src/theme/assets/` — Vite output (JS + CSS)
* `release/theme-name/` — Production-ready theme

---

## Project Structure

```text
.
├── scripts/
│   ├── dev.js              # Runs Vite + Shopify theme dev
│   └── package-theme.js    # Builds production theme
├── src/
│   ├── index.css           # Tailwind entry
│   ├── index.js            # JS entry
│   ├── css/                # fonts.css, theme.css, etc.
│   ├── js/                 # gsap-motion.js, navigation.js, etc.
│   └── theme/              # Shopify theme
│       ├── assets/         # Built files (Vite output)
│       ├── config/
│       ├── layout/
│       ├── sections/
│       ├── snippets/
│       ├── templates/
│       └── locales/
├── release/
├── package.json
└── vite.config.js
```

---

## Development Workflow

### 1. Install dependencies
```bash
npm install
```

### 2. Start development
```bash
npm run dev:store your-store-name
```
**Example:** `npm run dev:store abcdef-gh`

This runs:
* `vite build --watch` → updates assets in real time
* `shopify theme dev` → serves the theme

### 3. Build assets
```bash
npm run build
```

### 4. Package theme (for testing)
```bash
npm run package
```
**Outputs:** `release/shopify-theme/`

### 5. Package as ZIP
```bash
npm run package:zip
```
**Outputs:** `release/shopify-theme.zip`

---

## How Shopify Works (Important)

* **Templates (`templates/*.json`)**: Define page structure.
```json
{
  "sections": {
    "main": { "type": "main-product" }
  },
  "order": ["main"]
}
```
* **Sections (`sections/*.liquid`)**: Reusable components, merchant-editable via schema. Equivalent to "blocks" in your mental model.
* **Layouts (`layout/*.liquid`)**: Global wrapper using `{{ content_for_layout }}`.

### GSAP Animations
Use declarative attributes:
```html
<div data-gsap="fade-up" data-scroll="true"></div>
<div data-gsap="hover-lift"></div>
```
No per-section JS required.

### Theming (CSS Variables)
Edit `src/css/theme.css`:
```css
:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
}
```

---

## Packaging Logic
`package-theme.js` copies only required Shopify folders:
* `assets`, `config`, `layout`, `sections`, `snippets`, `templates`, `locales`
* Outputs a clean production-ready theme.

---

## Notes

* `/src` = development layer.
* `/src/theme` = actual Shopify theme.
* No symlink needed — Shopify CLI handles serving.
* Sections = reusable UI system.
* Templates = page composition layer.

---

## Deployment

1. Run `npm run package:zip`.
2. Upload via Shopify Admin: **Online Store** → **Themes** → **Upload theme**.

**Happy Theme Building!**
