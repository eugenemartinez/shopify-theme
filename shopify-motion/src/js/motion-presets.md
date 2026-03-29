# motion-presets.js

Declarative [Motion](https://motion.dev) animation wrapper for vanilla JS, PHP/WordPress, Shopify Liquid, or plain HTML — a drop-in parallel to `gsap-motion.js` using `npm install motion` instead of GSAP.

---

## Installation

```bash
npm install motion
```

Then import and call `initMotion()` once on page load:

```js
import { initMotion } from "./motion-motion.js";
initMotion();
```

---

## Usage

Add `data-motion="animation-name"` to any HTML element. Chain multiple animations with a space.

```html
<!-- Single animation -->
<div data-motion="fade-up">Hello</div>

<!-- Scroll-triggered -->
<div data-motion="fade-up" data-scroll="true">Triggered on scroll</div>

<!-- Chained animations -->
<div data-motion="fade-up hover-lift">Cards, etc.</div>

<!-- Custom options -->
<div data-motion="fade-up" data-duration="1.2" data-delay="0.3" data-ease="easeInOut">
  Slow fade
</div>
```

---

## Data Attributes

| Attribute          | Type    | Default    | Description                                      |
|--------------------|---------|------------|--------------------------------------------------|
| `data-motion`      | string  | —          | Space-separated list of animation names          |
| `data-duration`    | number  | `0.6`      | Duration in seconds                              |
| `data-delay`       | number  | `0`        | Delay before animation starts (seconds)          |
| `data-scroll`      | boolean | `false`    | Fire on scroll into view via `inView()`          |
| `data-scroll-start`| number  | `0.2`      | IntersectionObserver threshold (0–1)             |
| `data-ease`        | string  | `easeOut`  | Motion easing string (see Easing below)          |
| `data-x`           | number  | `0`        | X offset for `blob`                              |
| `data-y`           | number  | `0`        | Y offset for `blob` / `float`                    |
| `data-scale`       | number  | `1.2`      | Scale target for `blob` / `pulse`                |
| `data-opacity-to`  | number  | `0.6`      | Opacity target for `blob`                        |
| `data-stagger`     | number  | `0.1`      | Delay between stagger children (seconds)         |

---

## Easing

Motion uses its own easing strings. Supported values for `data-ease`:

| Value           | Description                        |
|-----------------|------------------------------------|
| `easeOut`       | Decelerate (default)               |
| `easeIn`        | Accelerate                         |
| `easeInOut`     | Symmetric ease                     |
| `linear`        | No easing                          |
| `[0.17,0.67,0.83,0.67]` | Custom cubic-bezier array |

GSAP-style names like `power2.out` are also accepted — they're mapped internally.

---

## Animation Reference

### Entrance animations

| Name        | Description                              |
|-------------|------------------------------------------|
| `fade-up`   | Fade in while rising from below          |
| `fade-down` | Fade in while falling from above         |
| `fade-left` | Fade in sliding from the left            |
| `fade-right`| Fade in sliding from the right           |
| `fade-in`   | Simple opacity fade                      |
| `zoom-in`   | Scale from 0.8 with bounce ease          |
| `zoom-out`  | Scale from 1.2 down to 1                 |
| `parallax`  | Scroll-scrubbed scale parallax           |

### Hover animations

| Name          | Description                                        |
|---------------|----------------------------------------------------|
| `hover-lift`  | Lift y:-8 + scale:1.02 on hover                   |
| `hover-scale` | Scale 1.05 on hover                                |
| `hover-glow`  | `.motion-glowing` class + slight scale             |
| `hover-dim`   | Opacity 0.7 on hover                               |
| `hover-rise`  | Lift + scale, colour-agnostic                      |
| `hover-bright`| Restore opacity to 1, return to original on leave  |
| `hover-arrow` | Slides `[data-arrow]` child element rightward      |
| `hover-card`  | Lift + `.motion-glowing` combo                     |

### Continuous animations

| Name          | Description                                    |
|---------------|------------------------------------------------|
| `blob`        | Organic scale/translate/opacity loop           |
| `pulse`       | Heartbeat scale loop                           |
| `float`       | Vertical float loop                            |
| `spin`        | Continuous 360° rotation                       |
| `ping`        | Expand + fade out loop (badge indicator style) |
| `bounce`      | Vertical bounce loop                           |
| `wiggle`      | Subtle rotation wiggle                         |
| `heartbeat`   | Quick scale throb                              |
| `typewriter`  | Character-by-character text reveal loop        |

### Stagger children

| Name                | Description                          |
|---------------------|--------------------------------------|
| `stagger-fade-up`   | Stagger children: fade up            |
| `stagger-fade-in`   | Stagger children: fade in            |
| `stagger-fade-left` | Stagger children: fade from left     |

### Input focus

| Name          | Description                          |
|---------------|--------------------------------------|
| `focus-scale` | Scale input on focus                 |
| `focus-glow`  | `.motion-glowing` ring on focus      |

---

## CSS Classes

`hover-glow`, `hover-card`, and `focus-glow` toggle a `.motion-glowing` class. Style it globally:

```css
.motion-glowing {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
  transition: box-shadow 0.2s ease;
}
```

---

## Examples

### Shopify / Liquid

```liquid
<div
  data-motion="fade-up hover-lift"
  data-scroll="true"
  data-duration="0.8"
  data-delay="0.1"
>
  {{ product.title }}
</div>
```

### WordPress / PHP

```php
<div
  data-motion="stagger-fade-up"
  data-scroll="true"
  data-stagger="0.15"
>
  <?php foreach ($items as $item): ?>
    <div><?= esc_html($item->post_title) ?></div>
  <?php endforeach; ?>
</div>
```

### Plain HTML

```html
<!-- Floating badge -->
<span data-motion="float" data-y="-12" data-duration="2.5">🔥 New</span>

<!-- Scroll-triggered card grid -->
<ul data-motion="stagger-fade-up" data-scroll="true" data-stagger="0.12">
  <li>Card 1</li>
  <li>Card 2</li>
  <li>Card 3</li>
</ul>

<!-- Typewriter heading -->
<h1 data-motion="typewriter" data-duration="3">Welcome to the future.</h1>

<!-- Hover arrow link -->
<a data-motion="hover-arrow" href="#">
  Read more <span data-arrow>→</span>
</a>
```

---

## GSAP vs Motion — Key Differences

| Feature            | GSAP (`gsap-motion.js`)       | Motion (`motion-motion.js`)         |
|--------------------|-------------------------------|-------------------------------------|
| Package            | `gsap`                        | `motion`                            |
| Bundle size        | ~70 KB                        | ~18 KB                              |
| Scroll trigger     | `ScrollTrigger` plugin        | Built-in `inView()` + `scroll()`    |
| Infinite loops     | `repeat: -1, yoyo: true`      | `repeat: Infinity, direction: "alternate"` |
| Easing             | GSAP string (`power2.out`)    | Motion string (`easeOut`) or cubic-bezier |
| `data-scroll-start`| CSS string (`top 85%`)        | Threshold float 0–1 (`0.2`)        |
| Scrub scroll       | `scrub: true` in ScrollTrigger| `scroll(animate(...), { target })` |

---

## Notes

- `parallax` uses Motion's `scroll()` API to scrub a scale animation — no JS loop required.
- Stagger is applied by passing an array of children to `animate()`, with `delay` acting as per-item offset.
- The `typewriter` animation is a pure JS timer loop, identical between both libraries.
- Motion's `inView()` fires once by default, matching GSAP ScrollTrigger's `once: true` behaviour.
