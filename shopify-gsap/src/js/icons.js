import { createIcons, icons } from "lucide";

export function initIcons() {
	createIcons({
		icons,
		attrs: {
			"stroke-width": 2,
			class: "lucide-icon",
		},
	});
}
