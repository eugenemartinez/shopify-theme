export function initDarkMode() {
	const toggle = document.getElementById("theme-toggle");
	const iconSun = document.getElementById("icon-sun");
	const iconMoon = document.getElementById("icon-moon");

	if (!toggle) return;

	// ── Apply saved preference on load ────────────
	const saved = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	// Priority: localStorage → Shopify setting → system preference
	const shopifyDark = document.body.classList.contains("dark");

	if (saved === "dark" || (!saved && !shopifyDark && prefersDark)) {
		document.body.classList.add("dark");
		setIcons(true);
	} else if (saved === "light") {
		document.body.classList.remove("dark");
		setIcons(false);
	} else {
		// Follow Shopify setting
		setIcons(shopifyDark);
	}

	// ── Toggle on click ────────────────────────────
	toggle.addEventListener("click", () => {
		const isDark = document.body.classList.toggle("dark");
		localStorage.setItem("theme", isDark ? "dark" : "light");
		setIcons(isDark);
	});

	// ── Icon state ─────────────────────────────────
	function setIcons(isDark) {
		if (!iconSun || !iconMoon) return;

		iconSun.style.display = isDark ? "block" : "none";
		iconMoon.style.display = isDark ? "none" : "block";
	}
}
