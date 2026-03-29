import { initMotion } from "./js/motion-presets.js";
import { initPageTransition } from "./js/page-transition.js";
import { initHeader } from "./js/header.js";
import { initDarkMode } from "./js/dark-mode.js";

document.addEventListener("DOMContentLoaded", () => {
	initPageTransition();
	initMotion();
	initHeader();
	initDarkMode();
});
