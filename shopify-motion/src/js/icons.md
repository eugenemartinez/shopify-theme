# 🎨 Icon Usage Guide

This project uses a hybrid icon system: **Lucide** for UI/functional icons and **Simple Icons** for brand/social logos.

---

## 1. Lucide Icons (UI & Interface)

Used for arrows, menus, shopping carts, etc. These are rendered via a JavaScript scanner.

* **Syntax:** Use an `<i>` tag with the `data-lucide` attribute.
* **Reference:** [lucide.dev](https://lucide.dev)
* **Important:** If adding icons dynamically via JavaScript, you **must** call `lucide.createIcons()` after the DOM update.

```html
<i data-lucide="map-pin" class="w-4 h-4 mr-2"></i> (✅ correct usage)

<i class="lucide-map-pin"></i> (❌ incorrect usage)
```

---

## 2. Simple Icons (Brand & Social)

Used for Facebook, Instagram, LinkedIn, X, etc. Lucide does not include these.

* **Syntax:** Use raw `<svg>` paths with the Tailwind `fill-current` class.
* **Reference:** [simpleicons.org](https://simpleicons.org)
* **Coloring:** The `fill-current` class allows the SVG to inherit the text color of its parent container.

```html
<a href="#" class="text-white hover:text-cta">
  <svg role="img" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="w-5 h-5 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
</a>
```

---

## 3. Best Practices

* **Sizing:** Always use Tailwind utility classes (`w-5 h-5`) for consistency across both systems.
* **Accessibility:** For decorative icons, add `aria-hidden="true"`. For icons used as buttons without text, add `aria-label="Description"`.
* **Shopify Note:** In the Shopify Theme Editor, icons may disappear during section blocks updates. Ensure the `shopify:section:load` listener is active in `index.js`.
