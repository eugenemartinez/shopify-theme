import { animate } from "motion";

export function initHeader() {
	const header = document.querySelector("[data-header]");
	const toggle = document.getElementById("nav-toggle");
	const close = document.getElementById("nav-close");
	const menu = document.getElementById("mobile-menu");
	const barTop = toggle?.querySelector('[data-bar="top"]');
	const barMid = toggle?.querySelector('[data-bar="mid"]');
	const barBot = toggle?.querySelector('[data-bar="bot"]');
	const isSticky = header?.dataset.sticky === "true";

	if (!header || !toggle || !menu) return;

	// ── Sticky scroll behavior ─────────────────────
	if (isSticky) {
		let lastScroll = 0;

		window.addEventListener(
			"scroll",
			() => {
				const current = window.scrollY;

				if (current > 80) {
					header.style.background =
						"color-mix(in oklab, var(--background) 85%, transparent)";
					header.style.backdropFilter = "blur(12px)";
					header.style.borderBottom = "1px solid var(--border)";
				} else {
					header.style.background = "";
					header.style.backdropFilter = "";
					header.style.borderBottom = "";
				}

				if (current > lastScroll && current > 200) {
					animate(
						header,
						{ y: "-100%" },
						{ duration: 0.3, easing: [0.45, 0, 0.55, 1] },
					);
				} else {
					animate(
						header,
						{ y: "0%" },
						{ duration: 0.3, easing: [0.45, 0, 0.55, 1] },
					);
				}

				lastScroll = current;
			},
			{ passive: true },
		);
	}

	// ── Mobile menu ────────────────────────────────
	let isOpen = false;

	function openMenu() {
		isOpen = true;
		menu.classList.remove("pointer-events-none");
		menu.setAttribute("aria-hidden", "false");
		toggle.setAttribute("aria-expanded", "true");

		// Fade in overlay
		animate(menu, { opacity: 1 }, { duration: 0.3, easing: "easeOut" });

		// Animate hamburger bars into X
		if (barTop) animate(barTop, { rotate: 45, y: 6 }, { duration: 0.3 });
		if (barMid) animate(barMid, { opacity: 0 }, { duration: 0.2 });
		if (barBot) animate(barBot, { rotate: -45, y: -6 }, { duration: 0.3 });

		// Stagger nav links
		const links = Array.from(menu.querySelectorAll("a"));
		links.forEach((link) => {
			link.style.opacity = "0";
			link.style.transform = "translateY(20px)";
		});
		links.forEach((link, i) =>
			animate(
				link,
				{ opacity: 1, y: 0 },
				{ duration: 0.4, delay: 0.1 + i * 0.06, easing: "easeOut" },
			),
		);

		document.body.style.overflow = "hidden";
	}

	function closeMenu() {
		isOpen = false;
		menu.setAttribute("aria-hidden", "true");
		toggle.setAttribute("aria-expanded", "false");

		// Fade out overlay then disable pointer events
		animate(
			menu,
			{ opacity: 0 },
			{ duration: 0.25, easing: "easeIn" },
		).finished.then(() => menu.classList.add("pointer-events-none"));

		// Reset hamburger bars
		if (barTop) animate(barTop, { rotate: 0, y: 0 }, { duration: 0.3 });
		if (barMid) animate(barMid, { opacity: 1 }, { duration: 0.2 });
		if (barBot) animate(barBot, { rotate: 0, y: 0 }, { duration: 0.3 });

		document.body.style.overflow = "";
	}

	toggle.addEventListener("click", () => (isOpen ? closeMenu() : openMenu()));
	close?.addEventListener("click", closeMenu);
	menu
		.querySelectorAll("a")
		.forEach((link) => link.addEventListener("click", closeMenu));
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && isOpen) closeMenu();
	});
}
