import { gsap } from "gsap";

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
					gsap.to(header, { y: "-100%", duration: 0.3, ease: "power2.inOut" });
				} else {
					gsap.to(header, { y: "0%", duration: 0.3, ease: "power2.inOut" });
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

		gsap.to(menu, { opacity: 1, duration: 0.3, ease: "power2.out" });
		gsap.to(barTop, { rotation: 45, y: 6, duration: 0.3 });
		gsap.to(barMid, { opacity: 0, duration: 0.2 });
		gsap.to(barBot, { rotation: -45, y: -6, duration: 0.3 });

		gsap.fromTo(
			"#mobile-menu a",
			{ opacity: 0, y: 20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
				stagger: 0.06,
				ease: "power2.out",
				delay: 0.1,
			},
		);

		document.body.style.overflow = "hidden";
	}

	function closeMenu() {
		isOpen = false;
		menu.setAttribute("aria-hidden", "true");
		toggle.setAttribute("aria-expanded", "false");

		gsap.to(menu, {
			opacity: 0,
			duration: 0.25,
			ease: "power2.in",
			onComplete: () => menu.classList.add("pointer-events-none"),
		});
		gsap.to(barTop, { rotation: 0, y: 0, duration: 0.3 });
		gsap.to(barMid, { opacity: 1, duration: 0.2 });
		gsap.to(barBot, { rotation: 0, y: 0, duration: 0.3 });

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
