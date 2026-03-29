import { animate } from "motion";

export function initPageTransition() {
	const overlay = document.createElement("div");
	overlay.id = "page-transition";
	overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: var(--color-primary);
    z-index: 9999;
    pointer-events: none;
    transform: translateY(0%);
  `;
	document.body.appendChild(overlay);

	// Exit animation — slide overlay up and out on page load
	animate(
		overlay,
		{ y: ["-0%", "-100%"] },
		{ duration: 0.6, delay: 0.1, easing: [0.45, 0, 0.55, 1] },
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

			// Enter animation — slide overlay up from bottom, then navigate
			animate(
				overlay,
				{ y: ["100%", "0%"] },
				{ duration: 0.4, easing: [0.45, 0, 0.55, 1] },
			).finished.then(() => {
				window.location.href = destination;
			});
		});
	});
}
