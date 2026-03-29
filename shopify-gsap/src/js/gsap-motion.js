import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * gsap-motion.js
 * Declarative GSAP animation wrapper using data-gsap attributes.
 * Usage: add data-gsap="animation-name" to any HTML element.
 * See gsap-motion.md for full documentation.
 */

export function initGsapMotion() {
	document.querySelectorAll("[data-gsap]").forEach((el) => {
		const animations = el.dataset.gsap.split(" ").map((a) => a.trim());

		// ── Parse options ─────────────────────────────────────────
		const duration = parseFloat(el.dataset.duration) || 0.6;
		const delay = parseFloat(el.dataset.delay) || 0;
		const scroll = el.dataset.scroll === "true";
		const scrollStart = el.dataset.scrollStart || "top 85%";
		const ease = el.dataset.ease || "power2.out";
		const x = parseFloat(el.dataset.x) || 0;
		const y = parseFloat(el.dataset.y) || 0;
		const scale = parseFloat(el.dataset.scale) || 1.2;
		const rotation = parseFloat(el.dataset.rotation) || 0;
		const opacityFrom = parseFloat(el.dataset.opacityFrom) || 0.4;
		const opacityTo = parseFloat(el.dataset.opacityTo) || 0.6;
		const stagger = parseFloat(el.dataset.stagger) || 0.1;

		// ── Scroll trigger config ─────────────────────────────────
		const scrollConfig = scroll
			? {
					scrollTrigger: {
						trigger: el,
						start: scrollStart,
						once: true,
					},
				}
			: {};

		// ── Animations ────────────────────────────────────────────
		animations.forEach((animation) => {
			switch (animation) {
				// ── Entrance animations ───────────────────────────────

				case "fade-up":
					gsap.set(el, { opacity: 0, y: 40 });
					gsap.to(el, {
						opacity: 1,
						y: 0,
						duration,
						delay,
						ease,
						...scrollConfig,
					});
					break;

				case "fade-down":
					gsap.set(el, { opacity: 0, y: -40 });
					gsap.to(el, {
						opacity: 1,
						y: 0,
						duration,
						delay,
						ease,
						...scrollConfig,
					});
					break;

				case "fade-left":
					gsap.set(el, { opacity: 0, x: -40 });
					gsap.to(el, {
						opacity: 1,
						x: 0,
						duration,
						delay,
						ease,
						...scrollConfig,
					});
					break;

				case "fade-right":
					gsap.set(el, { opacity: 0, x: 40 });
					gsap.to(el, {
						opacity: 1,
						x: 0,
						duration,
						delay,
						ease,
						...scrollConfig,
					});
					break;

				case "fade-in":
					gsap.set(el, { opacity: 0 });
					gsap.to(el, { opacity: 1, duration, delay, ease, ...scrollConfig });
					break;

				case "zoom-in":
					gsap.set(el, { opacity: 0, scale: 0.8 });
					gsap.to(el, {
						opacity: 1,
						scale: 1,
						duration,
						delay,
						ease: "back.out(1.5)",
						...scrollConfig,
					});
					break;

				case "zoom-out":
					gsap.set(el, { opacity: 0, scale: 1.2 });
					gsap.to(el, {
						opacity: 1,
						scale: 1,
						duration,
						delay,
						ease,
						...scrollConfig,
					});
					break;

				case "parallax":
					gsap.to(el, {
						scale: 1.2,
						ease: "none",
						scrollTrigger: {
							trigger: el,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					});
					break;

				// ── Hover animations ──────────────────────────────────

				case "hover-lift":
					el.addEventListener("mouseenter", () =>
						gsap.to(el, {
							y: -8,
							scale: 1.02,
							duration: 0.3,
							ease: "power2.out",
						}),
					);
					el.addEventListener("mouseleave", () =>
						gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" }),
					);
					break;

				case "hover-scale":
					el.addEventListener("mouseenter", () =>
						gsap.to(el, { scale: 1.05, duration: 0.2 }),
					);
					el.addEventListener("mouseleave", () =>
						gsap.to(el, { scale: 1, duration: 0.2 }),
					);
					break;

				case "hover-glow":
					el.addEventListener("mouseenter", () => {
						el.classList.add("gsap-glowing");
						gsap.to(el, { scale: 1.02, duration: 0.3 });
					});
					el.addEventListener("mouseleave", () => {
						el.classList.remove("gsap-glowing");
						gsap.to(el, { scale: 1, duration: 0.3 });
					});
					break;

				case "hover-dim":
					el.addEventListener("mouseenter", () =>
						gsap.to(el, { opacity: 0.7, duration: 0.2 }),
					);
					el.addEventListener("mouseleave", () =>
						gsap.to(el, { opacity: 1, duration: 0.2 }),
					);
					break;

				// hover-rise — lift + scale, no color
				case "hover-rise":
					el.addEventListener("mouseenter", () =>
						gsap.to(el, {
							y: -6,
							scale: 1.03,
							duration: 0.3,
							ease: "power2.out",
						}),
					);
					el.addEventListener("mouseleave", () =>
						gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" }),
					);
					break;

				// hover-bright — opacity 1 from whatever it was, color agnostic
				case "hover-bright":
					const originalOpacity =
						parseFloat(getComputedStyle(el).opacity) || 0.7;
					el.addEventListener("mouseenter", () =>
						gsap.to(el, { opacity: 1, duration: 0.2 }),
					);
					el.addEventListener("mouseleave", () =>
						gsap.to(el, { opacity: originalOpacity, duration: 0.2 }),
					);
					break;

				// hover-arrow — slides a child with data-arrow attribute
				case "hover-arrow":
					const arrow = el.querySelector("[data-arrow]");
					if (arrow) {
						el.addEventListener("mouseenter", () =>
							gsap.to(arrow, { x: 5, duration: 0.2 }),
						);
						el.addEventListener("mouseleave", () =>
							gsap.to(arrow, { x: 0, duration: 0.2 }),
						);
					}
					break;

				// hover-card — lift + glow using CSS class
				case "hover-card":
					el.addEventListener("mouseenter", () => {
						el.classList.add("gsap-glowing");
						gsap.to(el, { y: -4, duration: 0.3, ease: "power2.out" });
					});
					el.addEventListener("mouseleave", () => {
						el.classList.remove("gsap-glowing");
						gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out" });
					});
					break;

				// ── Continuous animations ─────────────────────────────

				case "blob":
					gsap.to(el, {
						scale,
						x,
						y,
						opacity: opacityTo,
						duration,
						delay,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
					break;

				case "pulse":
					gsap.to(el, {
						scale: scale, // Uses data-scale or defaults to 1.2
						duration: duration,
						delay: delay,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
						// Add this to ensure it respects the scroll trigger if data-scroll="true"
						...(scroll
							? {
									scrollTrigger: {
										trigger: el,
										start: scrollStart,
										toggleActions: "play none none none", // Starts when seen, stays playing
									},
								}
							: {}),
					});
					break;

				case "float":
					gsap.to(el, {
						y: y || -20,
						duration: duration || 3,
						delay,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
					break;

				case "spin":
					gsap.to(el, {
						rotation: 360,
						duration: duration || 8,
						delay,
						repeat: -1,
						ease: "none",
					});
					break;

				case "ping":
					gsap.to(el, {
						scale: 1.5,
						opacity: 0,
						duration: parseFloat(el.dataset.duration) || 1,
						repeat: -1,
						ease: "power2.out",
					});
					break;

				case "bounce":
					gsap.to(el, {
						y: -20,
						duration: parseFloat(el.dataset.duration) || 0.5,
						repeat: -1,
						yoyo: true,
						ease: "power2.out",
					});
					break;

				case "wiggle":
					gsap.to(el, {
						rotation: 5,
						duration: parseFloat(el.dataset.duration) || 0.1,
						repeat: -1,
						yoyo: true,
						ease: "power1.inOut",
					});
					break;

				case "heartbeat":
					gsap.to(el, {
						scale: 1.15,
						duration: parseFloat(el.dataset.duration) || 0.3,
						repeat: -1,
						yoyo: true,
						ease: "power1.inOut",
					});
					break;

				case "typewriter":
					// We move the 'content' grab INSIDE the runTypewriter function
					// so it picks up the latest dynamic ID from the DOM.
					const animDuration = parseFloat(el.dataset.duration) || 2;
					const animDelay = parseFloat(el.dataset.delay) || 0;

					const runTypewriter = () => {
						const currentContent = el.innerText; // Grabs the dynamic Shopify ID
						const speed = (animDuration * 1000) / currentContent.length;

						el.innerHTML = "";
						let i = 0;

						const type = () => {
							if (i < currentContent.length) {
								const char = currentContent.charAt(i);
								el.innerHTML += char === " " ? "&nbsp;" : char;
								i++;
								setTimeout(type, speed);
							} else {
								// For a Nav Display, you might want a longer pause (e.g., 10s)
								// or no loop at all.
								setTimeout(runTypewriter, 10000);
							}
						};

						type();
					};

					setTimeout(runTypewriter, animDelay * 1000);
					break;

				// ── Stagger children ──────────────────────────────────

				case "stagger-fade-up":
					gsap.set(el.children, { opacity: 0, y: 40 });
					gsap.to(el.children, {
						opacity: 1,
						y: 0,
						duration,
						delay,
						ease,
						stagger,
						...scrollConfig,
					});
					break;

				case "stagger-fade-in":
					gsap.set(el.children, { opacity: 0 });
					gsap.to(el.children, {
						opacity: 1,
						duration,
						delay,
						ease,
						stagger,
						...scrollConfig,
					});
					break;

				case "stagger-fade-left":
					gsap.set(el.children, { opacity: 0, x: -40 });
					gsap.to(el.children, {
						opacity: 1,
						x: 0,
						duration,
						delay,
						ease,
						stagger,
						...scrollConfig,
					});
					break;

				// ── Input Focus ──────────────────────────────────

				case "focus-scale":
					el.addEventListener("focus", () =>
						gsap.to(el, { scale: 1.02, duration: 0.2, ease: "power2.out" }),
					);
					el.addEventListener("blur", () =>
						gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" }),
					);
					break;

				case "focus-glow":
					el.addEventListener("focus", () => {
						el.classList.add("gsap-glowing");
						gsap.to(el, { scale: 1.01, duration: 0.2 });
					});
					el.addEventListener("blur", () => {
						el.classList.remove("gsap-glowing");
						gsap.to(el, { scale: 1, duration: 0.2 });
					});
					break;

				// Add more reusable animations below
			}
		});
	});
}
