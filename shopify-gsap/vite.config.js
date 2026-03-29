import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

const isWatch = process.argv.includes("--watch");

export default defineConfig({
	plugins: [tailwindcss()],
	build: {
		outDir: path.resolve(__dirname, "src/theme/assets"),
		watch: isWatch
			? {
					exclude: ["src/theme/assets/**"],
				}
			: null,
		emptyOutDir: false,
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "src/index.js"),
				styles: path.resolve(__dirname, "src/index.css"),
			},
			output: {
				entryFileNames: "index.js",
				assetFileNames: "index.css",
			},
		},
	},
});
