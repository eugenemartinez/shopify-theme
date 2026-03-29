# Shopify Theme Boilerplate

A flexible, production-ready **Shopify theme boilerplate** combining a structured development environment (inspired by WordPress) with Shopify's Liquid architecture.
Built with Tailwind CSS v4, Motion animations, and Vite. Designed for fast setup with a clean, scalable workflow.

---

## Stack

* **Liquid** — Shopify templating (sections, templates, snippets)
* **Tailwind CSS v4** — utility-first styling with CSS variable theming
* **Motion + motion-presets.js** — declarative animations via `data-motion`
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
│   ├── js/                 # motion-presets.js, header.js, page-transition.js, etc.
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

---

## motion-presets.js

Global declarative animation system. Add `data-motion` to any Liquid or HTML element — no per-section JS required.

```html
<!-- Entrance animations -->
<div data-motion="fade-up" data-scroll="true" data-delay="0.2">...</div>
<div data-motion="fade-down" data-scroll="true">...</div>
<div data-motion="fade-left" data-scroll="true">...</div>
<div data-motion="fade-right" data-scroll="true">...</div>
<div data-motion="zoom-in" data-scroll="true">...</div>
<div data-motion="zoom-out" data-scroll="true">...</div>

<!-- Hover animations -->
<a data-motion="hover-lift">...</a>
<div data-motion="hover-dim">...</div>
<div data-motion="hover-scale">...</div>
<div data-motion="hover-glow">...</div>
<div data-motion="hover-rise">...</div>
<div data-motion="hover-card">...</div>
<a data-motion="hover-arrow">
  Shop now <span data-arrow style="display:inline-block">→</span>
</a>

<!-- Continuous animations -->
<div data-motion="float" data-y="-20" data-duration="4">...</div>
<div data-motion="spin" data-duration="8">...</div>
<div data-motion="pulse" data-scale="1.05">...</div>
<div data-motion="ping" data-duration="1.5">...</div>
<div data-motion="bounce">...</div>
<div data-motion="wiggle">...</div>
<div data-motion="heartbeat">...</div>
<div data-motion="blob" data-scale="1.3" data-x="50" data-y="30">...</div>

<!-- Parallax (parent must have overflow:hidden) -->
<div class="overflow-hidden" style="height:500px;">
  <img data-motion="parallax" style="height:130%;" src="..." />
</div>

<!-- Stagger children -->
<div data-motion="stagger-fade-up" data-scroll="true" data-stagger="0.15">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Combine animations -->
<div data-motion="fade-up hover-lift" data-scroll="true">...</div>
```

### Available Data Attributes

| Attribute | Default | Notes |
|---|---|---|
| `data-duration` | `0.6` | Animation duration in seconds |
| `data-delay` | `0` | Delay before animation starts |
| `data-scroll` | `false` | Trigger on scroll into view |
| `data-scroll-start` | `0.2` | IntersectionObserver threshold (0–1) |
| `data-ease` | `easeOut` | Motion easing string or cubic-bezier array |
| `data-stagger` | `0.1` | Delay between stagger children in seconds |
| `data-x` | `0` | X offset for `blob` |
| `data-y` | `-20` | Y offset for `blob` / `float` |
| `data-scale` | `1.2` | Scale target for `blob` / `pulse` |
| `data-opacity-to` | `0.6` | Opacity target for `blob` |

---

## Theming (CSS Variables)

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
