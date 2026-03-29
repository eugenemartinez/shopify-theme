import { gsap } from "gsap";
import { initPageTransition } from "./js/page-transition.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGsapMotion } from "./js/gsap-motion.js";
import { initHeader } from "./js/header.js";
import { initDarkMode } from "./js/dark-mode.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
	initPageTransition();
	initGsapMotion();
	initHeader();
	initDarkMode();
});
