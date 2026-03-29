# agents.md

## Purpose

Guidelines for AI agents to convert React / Figma designs into Shopify themes using a Liquid + JSON template architecture.

---

## General Instructions

* All UI is rendered using **Liquid templates, sections, and snippets**.
* **No React on the frontend** — React concepts must be translated into Liquid + HTML + Tailwind.
* **Tailwind CSS** is preconfigured via Vite — use utility classes for all styling.
* **motion.dev animations** are handled via `data-motion` attributes using `motion-presets.js`.
* **Framer Motion Transition**: Match Figma/React motion designs by using the corresponding `motion-presets.js` presets to maintain the intended feel.
* Avoid adding unnecessary JavaScript — only use JS for interactivity (variant switching, toggles, etc.).

---

## File Structure (Simplified)

```text
src/
├── index.css           # Tailwind entry
├── index.js            # Global JS entry
├── css/                # fonts.css, theme.css
├── js/                 # motion-presets.js, navigation.js, etc.
└── theme/              # Shopify theme
    ├── assets/         # Compiled JS + CSS (from Vite)
    ├── config/         # settings_schema.json, settings_data.json
    ├── layout/         # theme.liquid, password.liquid
    ├── locales/        # translations
    ├── sections/       # reusable sections (Liquid + schema)
    ├── snippets/       # small reusable pieces
    └── templates/      # JSON templates (page, product, cart, etc.)
```

---

## Core Architecture

### 1. Layout
* `layout/theme.liquid` → main wrapper for all pages.
* `layout/password.liquid` → password-protected storefront.

**Handles:**
* `<head>` (meta, CSS, JS)
* Global scripts
* Header/Footer via sections or snippets

### 2. Templates (JSON)
Templates define **page structure**, not markup.

**Example:**
```json
{
  "sections": {
    "main": { "type": "main-product" },
    "related": { "type": "related-products" }
  },
  "order": ["main", "related"]
}
```
* Templates only compose sections.
* No HTML inside templates.
* Section IDs must be unique.

### 3. Sections (Main Building Blocks)
Located in `sections/*.liquid`. Each section outputs HTML and has a `{% schema %}` for editor settings.

**Example:**
```liquid
<section class="section-{{ section.id }}">
  <h2 data-motion="fade-up">{{ section.settings.heading }}</h2>
</section>

{% schema %}
{
  "name": "Example Section",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading" }
  ],
  "presets": [{ "name": "Default Example" }]
}
{% endschema %}
```

### 4. Snippets
Located in `snippets/`. Used for reusable UI pieces like product cards, buttons, or icons.

**Example:**
`{% render 'product-card', product: product %}`

---

## Workflow

### 1. Convert React → Liquid

* **Component** → Section or Snippet
* **Props** → `section.settings` or variables
* **State** → Minimal JS or Liquid logic
* **Mapping arrays** → `{% for %}` loops
* **Conditional render** → `{% if %}`

### 2. Build Sections
* Create `sections/<name>.liquid`.
* Add HTML + Liquid logic.
* Add `{% schema %}` for editor controls.
* Use Tailwind for styling and `data-motion` for animations.

### 3. Styling
* Use Tailwind utility classes.
* Variables (defined in `src/css/theme.css`) include `bg-background`, `text-foreground`, `bg-primary`.

### 4. Animations (motion.dev)
Use declarative attributes:
* **Entrance**: `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-in`, `zoom-in`, `zoom-out`
* **Hover**: `hover-lift`, `hover-scale`, `hover-glow`, `hover-dim`
* **Continuous**: `float`, `spin`, `pulse`, `bounce`, `wiggle`
* **Stagger**:
```html
<div data-motion="stagger-fade-up" data-stagger="0.1">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Shopify-Specific Logic

* **Product Data**: `{{ product.title }}`, `{{ product.price | money }}`, `{{ product.images }}`.
* **Collections**: `{% for product in collections['all'].products %}`.
* **Forms**: Use `{% form 'product', product %}`, `{% form 'cart' %}`, or `{% form 'contact' %}`.

---

## Best Practices

* **Prefer sections** for anything reusable or editable.
* **Snippets** for repeated UI (cards, buttons).
* **Editable content**: Only render elements if data exists using `{% if section.settings.id != blank %}`.
* **Responsive**: Use Tailwind grid and flex utilities (`grid-cols-1 md:grid-cols-2`).

---

## Build & Development

* **Development**: `npm run dev:store <store-name>`
    * Vite (`--watch`) builds assets into `theme/assets`.
    * Shopify CLI handles live theme preview.
* **Build**: `npm run build`
* **Package**: `npm run package` or `npm run package:zip`

---

## Example: Section with motion.dev
```liquid
<section class="py-16">
  <div class="mx-auto max-w-5xl px-6">
    <h2 
      class="text-3xl font-bold"
      data-motion="fade-up"
      data-scroll="true"
    >
      {{ section.settings.heading }}
    </h2>

    <p 
      class="mt-4 text-foreground/60"
      data-motion="fade-up"
      data-delay="0.2"
      data-scroll="true"
    >
      {{ section.settings.text }}
    </p>
  </div>
</section>
```

---

## Goal
Transform React/Figma designs into clean Liquid structures, editable Shopify sections, and Tailwind-based styling with motion.dev interactions—avoiding unnecessary JS complexity.
