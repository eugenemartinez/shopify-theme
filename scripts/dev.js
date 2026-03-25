#!/usr/bin/env node
import { spawn } from "child_process";

const args = process.argv.slice(2);
if (args.length === 0) {
	console.error("❌ Usage: npm run dev:store <store-name>");
	console.error("   Example: npm run dev:store abcdef-gh");
	process.exit(1);
}
const store = args[0];

// ── 1) Vite build --watch ──────────────────────────
const vite = spawn("npx", ["vite", "build", "--watch"], {
	stdio: "inherit",
});
vite.on("close", (code) => console.log(`Vite exited with code ${code}`));

// ── 2) Shopify theme dev ───────────────────────────
console.log(`🛍  Starting Shopify theme dev for store: ${store}`);
const shopify = spawn(
	"shopify",
	["theme", "dev", "--store", store, "--path", "./src/theme"],
	{
		stdio: "inherit",
	},
);
shopify.on("close", (code) => console.log(`Shopify exited with code ${code}`));
