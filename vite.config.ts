/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
			manifest: {
				name: "RideTheBike",
				short_name: "RideTheBike",
				description: "Gamify mechanical sympathy for your bike",
				theme_color: "#000000",
				background_color: "#000000",
				display: "standalone",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
		}),
	],
	base: "/ride-the-bike/",
	build: {
		outDir: "dist",
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("recharts") || id.includes("d3")) {
						return "vendor-viz";
					}
					if (
						id.includes("framer-motion") ||
						id.includes("@radix-ui") ||
						id.includes("lucide-react")
					) {
						return "vendor-ui";
					}
					if (
						id.includes("react") ||
						id.includes("zustand") ||
						id.includes("@tanstack")
					) {
						return "vendor-core";
					}
				},
			},
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./src/test/setup.js",
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/e2e/**",
			"**/tests-examples/**",
		],
	},
});
