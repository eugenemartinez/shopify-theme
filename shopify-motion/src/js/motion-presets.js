import { animate, scroll, inView } from "motion";

/**
 * motion-motion.js
 * Declarative Motion (motion.dev) animation wrapper using data-motion attributes.
 * Usage: add data-motion="animation-name" to any HTML element.
 * Install: npm install motion
 *
 * ── Entrance animations ────────────────────────────────────────────────────
 * fade-up          Fade in while rising from below
 * fade-down        Fade in while falling from above
 * fade-left        Fade in sliding from the left
 * fade-right       Fade in sliding from the right
 * fade-in          Simple opacity fade in
 * zoom-in          Scale up from 0.8 with bounce ease
 * zoom-out         Scale down from 1.2 to 1
 * parallax         Subtle scroll-scrubbed scale parallax
 *
 * ── Hover animations ──────────────────────────────────────────────────────
 * hover-lift       Lift + slight scale on hover
 * hover-scale      Scale up on hover
 * hover-glow       Glow ring + scale on hover (CSS class)
 * hover-dim        Dim opacity on hover
 * hover-rise       Lift + scale, no color change
 * hover-bright     Restore opacity to 1, return to original on leave
 * hover-arrow      Slide a child [data-arrow] element to the right
 * hover-card       Lift + glow class combo
 *
 * ── Continuous animations ─────────────────────────────────────────────────
 * blob             Organic scale/translate/opacity loop
 * pulse            Heartbeat scale loop
 * float            Vertical float loop
 * spin             Continuous 360° rotation
 * ping             Expand + fade out loop (badge indicator style)
 * bounce           Vertical bounce loop
 * wiggle           Subtle rotation wiggle loop
 * heartbeat        Quick scale throb loop
 * typewriter       Character-by-character text reveal loop
 *
 * ── Stagger children ──────────────────────────────────────────────────────
 * stagger-fade-up    Stagger children: fade up
 * stagger-fade-in    Stagger children: fade in
 * stagger-fade-left  Stagger children: fade left
 *
 * ── Input focus ───────────────────────────────────────────────────────────
 * focus-scale      Scale input on focus
 * focus-glow       Glow ring on focus (CSS class)
 *
 * ── Data attributes ───────────────────────────────────────────────────────
 * data-duration      Animation duration in seconds (default: 0.6)
 * data-delay         Animation delay in seconds (default: 0)
 * data-scroll        "true" to trigger on scroll into view
 * data-scroll-start  IntersectionObserver threshold 0–1 (default: 0.2)
 * data-ease          Motion easing string (default: "easeOut")
 * data-x             X translate value for blob (default: 0)
 * data-y             Y translate value for blob/float (default: 0 / -20)
 * data-scale         Scale target for blob/pulse (default: 1.2)
 * data-opacity-from  Starting opacity for pulse (default: 0.4)
 * data-opacity-to    Target opacity for pulse (default: 0.6)
 * data-stagger       Delay between stagger children in seconds (default: 0.1)
 */

// ── Easing map ─────────────────────────────────────────────────────────────
// Motion uses its own easing strings. Map common GSAP-style names to Motion ones.
const EASING_MAP = {
	"power2.out": "easeOut",
	"power2.in": "easeIn",
	"power2.inOut": "easeInOut",
	"power1.out": "easeOut",
	"power1.inOut": "easeInOut",
	"sine.inOut": [0.37, 0, 0.63, 1],
	"back.out(1.5)": [0.34, 1.56, 0.64, 1], // approximates back.out with overshoot
	"power2.out": "easeOut",
	none: "linear",
	linear: "linear",
};

function resolveEase(easeStr) {
	return EASING_MAP[easeStr] || easeStr;
}

// ── Infinite loop helper ───────────────────────────────────────────────────
// Motion's animate() doesn't support yoyo natively in the same call.
// We replicate it with repeat + direction: "alternate".
function loop(el, keyframes, options) {
	return animate(el, keyframes, {
		...options,
		repeat: Infinity,
		direction: "alternate",
	});
}

// ── Hover helper ──────────────────────────────────────────────────────────
function onHover(el, enterKeyframes, leaveKeyframes, dur = 0.3) {
	el.addEventListener("mouseenter", () =>
		animate(el, enterKeyframes, { duration: dur, easing: "easeOut" }),
	);
	el.addEventListener("mouseleave", () =>
		animate(el, leaveKeyframes, { duration: dur, easing: "easeOut" }),
	);
}

// ── Main init ──────────────────────────────────────────────────────────────
export function initMotion() {
	document.querySelectorAll("[data-motion]").forEach((el) => {
		const animations = el.dataset.motion.split(" ").map((a) => a.trim());

		// ── Parse options ──────────────────────────────────────────
		const duration = parseFloat(el.dataset.duration) || 0.6;
		const delay = parseFloat(el.dataset.delay) || 0;
		const useScroll = el.dataset.scroll === "true";
		const scrollThreshold = parseFloat(el.dataset.scrollStart) || 0.2;
		const ease = resolveEase(el.dataset.ease || "easeOut");
		const x = parseFloat(el.dataset.x) || 0;
		const y = parseFloat(el.dataset.y) || 0;
		const scale = parseFloat(el.dataset.scale) || 1.2;
		const opacityTo = parseFloat(el.dataset.opacityTo) || 0.6;
		const stagger = parseFloat(el.dataset.stagger) || 0.1;

		// ── Scroll wrapper ─────────────────────────────────────────
		// Wraps a one-shot animate() call so it fires when el enters view.
		function withScroll(fn) {
			if (useScroll) {
				inView(
					el,
					() => {
						fn();
					},
					{ amount: scrollThreshold },
				);
			} else {
				fn();
			}
		}

		// ── Animation options shorthand ────────────────────────────
		function opts(extra = {}) {
			return { duration, delay, easing: ease, ...extra };
		}

		// ── Animations ────────────────────────────────────────────
		animations.forEach((animation) => {
			switch (animation) {
				// ── Entrance animations ───────────────────────────────

				case "fade-up":
					el.style.opacity = 0;
					el.style.transform = "translateY(40px)";
					withScroll(() => animate(el, { opacity: 1, y: 0 }, opts()));
					break;

				case "fade-down":
					el.style.opacity = 0;
					el.style.transform = "translateY(-40px)";
					withScroll(() => animate(el, { opacity: 1, y: 0 }, opts()));
					break;

				case "fade-left":
					el.style.opacity = 0;
					el.style.transform = "translateX(-40px)";
					withScroll(() => animate(el, { opacity: 1, x: 0 }, opts()));
					break;

				case "fade-right":
					el.style.opacity = 0;
					el.style.transform = "translateX(40px)";
					withScroll(() => animate(el, { opacity: 1, x: 0 }, opts()));
					break;

				case "fade-in":
					el.style.opacity = 0;
					withScroll(() => animate(el, { opacity: 1 }, opts()));
					break;

				case "zoom-in":
					el.style.opacity = 0;
					el.style.transform = "scale(0.8)";
					withScroll(() =>
						animate(
							el,
							{ opacity: 1, scale: 1 },
							opts({ easing: resolveEase("back.out(1.5)") }),
						),
					);
					break;

				case "zoom-out":
					el.style.opacity = 0;
					el.style.transform = "scale(1.2)";
					withScroll(() => animate(el, { opacity: 1, scale: 1 }, opts()));
					break;

				case "parallax":
					// True parallax — scrub translateY as element moves through viewport.
					// The element's parent must have overflow:hidden for the effect to be visible.
					scroll(animate(el, { y: ["-15%", "15%"] }, { easing: "linear" }), {
						target: el.parentElement || el,
					});
					break;

				// ── Hover animations ──────────────────────────────────

				case "hover-lift":
					onHover(el, { y: -8, scale: 1.02 }, { y: 0, scale: 1 });
					break;

				case "hover-scale":
					onHover(el, { scale: 1.05 }, { scale: 1 }, 0.2);
					break;

				case "hover-glow":
					el.addEventListener("mouseenter", () => {
						el.classList.add("motion-glowing");
						animate(el, { scale: 1.02 }, { duration: 0.3 });
					});
					el.addEventListener("mouseleave", () => {
						el.classList.remove("motion-glowing");
						animate(el, { scale: 1 }, { duration: 0.3 });
					});
					break;

				case "hover-dim":
					onHover(el, { opacity: 0.7 }, { opacity: 1 }, 0.2);
					break;

				case "hover-rise":
					onHover(el, { y: -6, scale: 1.03 }, { y: 0, scale: 1 });
					break;

				case "hover-bright": {
					const originalOpacity =
						parseFloat(getComputedStyle(el).opacity) || 0.7;
					el.addEventListener("mouseenter", () =>
						animate(el, { opacity: 1 }, { duration: 0.2 }),
					);
					el.addEventListener("mouseleave", () =>
						animate(el, { opacity: originalOpacity }, { duration: 0.2 }),
					);
					break;
				}

				case "hover-arrow": {
					const arrow = el.querySelector("[data-arrow]");
					if (arrow) {
						arrow.style.display = "inline-block"; // needed for transform on inline elements
						el.addEventListener("mouseenter", () =>
							animate(
								arrow,
								{ transform: "translateX(6px)" },
								{ duration: 0.2, easing: "easeOut" },
							),
						);
						el.addEventListener("mouseleave", () =>
							animate(
								arrow,
								{ transform: "translateX(0px)" },
								{ duration: 0.2, easing: "easeOut" },
							),
						);
					}
					break;
				}

				case "hover-card":
					el.addEventListener("mouseenter", () => {
						el.classList.add("motion-glowing");
						animate(el, { y: -4 }, { duration: 0.3, easing: "easeOut" });
					});
					el.addEventListener("mouseleave", () => {
						el.classList.remove("motion-glowing");
						animate(el, { y: 0 }, { duration: 0.3, easing: "easeOut" });
					});
					break;

				// ── Continuous animations ─────────────────────────────

				case "blob":
					loop(
						el,
						{
							scale: [1, scale],
							x: [0, x],
							y: [0, y],
							opacity: [opacityTo - 0.1, opacityTo],
						},
						{ duration, delay, easing: [0.37, 0, 0.63, 1] },
					);
					break;

				case "pulse":
					loop(
						el,
						{ scale: [1, scale] },
						{ duration, delay, easing: [0.37, 0, 0.63, 1] },
					);
					break;

				case "float":
					loop(
						el,
						{ y: [0, y || -20] },
						{ duration: duration || 3, delay, easing: [0.37, 0, 0.63, 1] },
					);
					break;

				case "spin":
					animate(
						el,
						{ rotate: [0, 360] },
						{
							duration: duration || 8,
							delay,
							easing: "linear",
							repeat: Infinity,
						},
					);
					break;

				case "ping":
					animate(
						el,
						{ scale: [1, 1.5], opacity: [1, 0] },
						{ duration: duration || 1, easing: "easeOut", repeat: Infinity },
					);
					break;

				case "bounce":
					loop(
						el,
						{ y: [0, -20] },
						{ duration: duration || 0.5, easing: "easeOut" },
					);
					break;

				case "wiggle":
					loop(
						el,
						{ rotate: [-5, 5] },
						{ duration: duration || 0.1, easing: "easeInOut" },
					);
					break;

				case "heartbeat":
					loop(
						el,
						{ scale: [1, 1.15] },
						{ duration: duration || 0.3, easing: "easeInOut" },
					);
					break;

				case "typewriter": {
					const animDuration = parseFloat(el.dataset.duration) || 2;
					const animDelay = parseFloat(el.dataset.delay) || 0;

					const runTypewriter = () => {
						const currentContent = el.innerText;
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
								setTimeout(runTypewriter, 10000);
							}
						};

						type();
					};

					setTimeout(runTypewriter, animDelay * 1000);
					break;
				}

				// ── Stagger children ──────────────────────────────────

				case "stagger-fade-up": {
					const children = Array.from(el.children);
					children.forEach((child) => {
						child.style.opacity = 0;
						child.style.transform = "translateY(40px)";
					});
					withScroll(() =>
						children.forEach((child, i) =>
							animate(
								child,
								{ opacity: 1, y: 0 },
								{ duration, delay: delay + i * stagger, easing: ease },
							),
						),
					);
					break;
				}

				case "stagger-fade-in": {
					const children = Array.from(el.children);
					children.forEach((child) => {
						child.style.opacity = 0;
					});
					withScroll(() =>
						children.forEach((child, i) =>
							animate(
								child,
								{ opacity: 1 },
								{ duration, delay: delay + i * stagger, easing: ease },
							),
						),
					);
					break;
				}

				case "stagger-fade-left": {
					const children = Array.from(el.children);
					children.forEach((child) => {
						child.style.opacity = 0;
						child.style.transform = "translateX(-40px)";
					});
					withScroll(() =>
						children.forEach((child, i) =>
							animate(
								child,
								{ opacity: 1, x: 0 },
								{ duration, delay: delay + i * stagger, easing: ease },
							),
						),
					);
					break;
				}

				// ── Input focus ───────────────────────────────────────

				case "focus-scale":
					el.addEventListener("focus", () =>
						animate(el, { scale: 1.02 }, { duration: 0.2, easing: "easeOut" }),
					);
					el.addEventListener("blur", () =>
						animate(el, { scale: 1 }, { duration: 0.2, easing: "easeOut" }),
					);
					break;

				case "focus-glow":
					el.addEventListener("focus", () => {
						el.classList.add("motion-glowing");
						animate(el, { scale: 1.01 }, { duration: 0.2 });
					});
					el.addEventListener("blur", () => {
						el.classList.remove("motion-glowing");
						animate(el, { scale: 1 }, { duration: 0.2 });
					});
					break;

				// Add more reusable animations below
			}
		});
	});
}
