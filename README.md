# shopify-theme-boilerplate

A specialized repository containing two distinct versions of a high-fidelity Shopify theme—each powered by a different animation engine. Choose the stack that best aligns with your performance requirements and developer experience.

---

### ## Project_Versions

| Version | Core Engine | Attribute | Characteristics |
| :--- | :--- | :--- | :--- |
| `shopify-gsap` | GSAP + ScrollTrigger | `data-gsap` | Robust, flicker-free, industry standard for complex sequences. |
| `shopify-motion` | Motion (motion.dev) | `data-motion` | Lightweight, native WAAPI-based, optimized for modern browsers. |

Both versions utilize a shared design system: **Tailwind CSS v4**, **Liquid Section Architecture**, and a **Declarative Animation System** that triggers motion via HTML data attributes.

---

### ## Repository_Structure

Each version is fully self-contained with its own configuration and build scripts:

* **`/shopify-gsap`**: Includes the `gsap-motion.js` engine and standard Liquid theme architecture.
* **`/shopify-motion`**: Includes the `motion-presets.js` engine and standard Liquid theme architecture.

---

### ## Navigation

To begin development, navigate into your preferred version and execute the Shopify CLI commands from that directory:

```bash
cd shopify-gsap
# or
cd shopify-motion
