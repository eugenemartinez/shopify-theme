import { gsap } from "gsap";

export function initPageTransition() {
	const overlay = document.createElement("div");
	overlay.id = "page-transition";
	overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: var(--primary);
    z-index: 9999;
    pointer-events: none;
    transform: translateY(100%);
  `;
	document.body.appendChild(overlay);

	gsap.fromTo(
		"#page-transition",
		{ y: "0%" },
		{ y: "-100%", duration: 0.6, ease: "power2.inOut", delay: 0.1 },
	);

	document.querySelectorAll("a[href]").forEach((link) => {
		const href = link.getAttribute("href");

		if (
			!href ||
			href.startsWith("#") ||
			href.startsWith("mailto") ||
			href.startsWith("tel") ||
			link.hasAttribute("target")
		)
			return;

		if (href.startsWith("http") && !href.startsWith(window.location.origin))
			return;

		link.addEventListener("click", (e) => {
			e.preventDefault();
			const destination = link.href;

			gsap.fromTo(
				"#page-transition",
				{ y: "100%" },
				{
					y: "0%",
					duration: 0.4,
					ease: "power2.inOut",
					onComplete: () => {
						window.location.href = destination;
					},
				},
			);
		});
	});
}

