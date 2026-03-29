# gsap-motion.js

Declarative GSAP animation wrapper. Add `data-gsap` to any HTML element — no per-element JavaScript required.

---

## Animation Summary

* **fade-up** — Category: Entrance | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: —
* **fade-down** — Category: Entrance | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: —
* **fade-left** — Category: Entrance | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: —
* **fade-right** — Category: Entrance | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: —
* **fade-in** — Category: Entrance | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: —
* **zoom-in** — Category: Entrance | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: —
* **zoom-out** — Category: Entrance | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: —
* **hover-lift** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **hover-scale** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **hover-glow** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **hover-dim** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **hover-rise** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **hover-bright** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **hover-arrow** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **hover-card** — Category: Hover | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **focus-scale** — Category: Focus | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **focus-glow** — Category: Focus | Scroll Trigger: ❌ | Continuous: ❌ | Extra Attributes: —
* **blob** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-x`, `data-y`, `data-scale`, `data-opacity-from`, `data-opacity-to`
* **spin** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-duration` optional
* **ping** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-duration` optional
* **pulse** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-duration` optional
* **bounce** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-duration` optional
* **float** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-y`, `data-duration` optional
* **wiggle** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-duration` optional
* **heartbeat** — Category: Continuous | Scroll Trigger: ❌ | Continuous: ✅ | Extra Attributes: `data-duration` optional
* **stagger-fade-up** — Category: Stagger Children | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: `data-stagger`
* **stagger-fade-in** — Category: Stagger Children | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: `data-stagger`
* **stagger-fade-left** — Category: Stagger Children | Scroll Trigger: ✅ | Continuous: ❌ | Extra Attributes: `data-stagger`

---

## Import

### PHP Template Boilerplate

```javascript
// src/index.js
import './js/gsap-motion.js';
```

### Blocks Boilerplate

```javascript
// blocks/hero/view.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGsapMotion } from '../../js/gsap-motion.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initGsapMotion();

  // Custom timelines for elements not covered by data-gsap
});
```

---

## Basic Usage

<div data-gsap="fade-up">Content</div>

<div data-gsap="fade-up" data-scroll="true">Content</div>

<div data-gsap="fade-up hover-lift" data-scroll="true">Content</div>

<h1 data-gsap="fade-up" data-delay="0.1">Title</h1>
<p data-gsap="fade-up" data-delay="0.3">Description</p>
<a data-gsap="fade-up hover-lift" data-delay="0.5">Button</a>

---

## Data Attributes

* **data-duration**: Default: 0.6 | Applies To: All animations
* **data-delay**: Default: 0 | Applies To: All animations
* **data-scroll**: Default: false | Applies To: Entrance animations
* **data-scroll-start**: Default: top 85% | Applies To: Entrance animations
* **data-ease**: Default: power2.out | Applies To: Entrance animations
* **data-stagger**: Default: 0.1 | Applies To: Stagger animations
* **data-x**: Default: 0 | Applies To: blob, fade-left, fade-right
* **data-y**: Default: 0 | Applies To: blob, float, bounce
* **data-scale**: Default: 1.2 | Applies To: blob, pulse
* **data-opacity-from**: Default: 0.4 | Applies To: blob
* **data-opacity-to**: Default: 0.6 | Applies To: blob

---

## Examples

### Hero Section

<p data-gsap="fade-up" data-delay="0.1">Subtitle</p>
<h1 data-gsap="fade-up" data-delay="0.3">Title</h1>
<p data-gsap="fade-up" data-delay="0.5">Description</p>
<a data-gsap="fade-up hover-lift" data-delay="0.7">Get in Touch</a>

### Blob Background

<div
  class="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-40"
  data-gsap="blob"
  data-duration="20"
  data-scale="1.2"
  data-x="50"
  data-y="30">
</div>

### Scroll Triggered Section

<div data-gsap="fade-left" data-scroll="true" data-duration="0.8">Left content</div>
<div data-gsap="fade-right" data-scroll="true" data-duration="0.8">Right content</div>

### Service Cards with Stagger

<div data-gsap="stagger-fade-up" data-scroll="true" data-stagger="0.15">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

### Loader Spinner

<div data-gsap="spin" data-duration="0.8" class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>

### Notification Dot

<div data-gsap="ping" class="w-3 h-3 bg-red-500 rounded-full"></div>

### Floating Decorative Element

<div data-gsap="float" data-y="-30" data-duration="4" class="absolute ..."></div>

### Combining Continuous + Entrance

<div data-gsap="fade-up float" data-scroll="true" data-delay="0.3">
  Decorative element
</div>
