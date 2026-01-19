/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// M3 Semantic Colors
				primary: {
					DEFAULT: "#D0BCFF", // Example Primary (Purple 80) for Dark Mode
					on: "#381E72", // On Primary
					container: "#4F378B", // Primary Container
					onContainer: "#EADDFF", // On Primary Container
				},
				secondary: {
					DEFAULT: "#CCC2DC", // Secondary
					on: "#332D41", // On Secondary
					container: "#4A4458", // Secondary Container
					onContainer: "#E8DEF8", // On Secondary Container
				},
				tertiary: {
					DEFAULT: "#EFB8C8", // Tertiary
					on: "#492532", // On Tertiary
					container: "#633B48", // Tertiary Container
					onContainer: "#FFD8E4", // On Tertiary Container
				},
				error: {
					DEFAULT: "#F2B8B5", // Error
					on: "#601410", // On Error
					container: "#8C1D18", // Error Container
					onContainer: "#F9DEDC", // On Error Container
				},
				surface: {
					DEFAULT: "#141218", // Surface
					on: "#E6E1E5", // On Surface
					variant: "#49454F", // Surface Variant
					onVariant: "#CAC4D0", // On Surface Variant
					container: "#141218", // Surface Container (base)
					"container-high": "#2B2930", // Surface Container High
					"container-highest": "#36343B", // Surface Container Highest
					"container-low": "#1D1B20", // Surface Container Low
					"container-lowest": "#0F0D13", // Surface Container Lowest
					dim: "#141218", // Surface Dim
					bright: "#3B383E", // Surface Bright
				},
				outline: "#938F99",
				"outline-variant": "#49454F",

				// Preserving existing functionality
				"oled-black": "#000000",
				"oled-gray": {
					50: "#0a0a0a",
					100: "#141414",
					200: "#1f1f1f",
					300: "#2a2a2a",
					400: "#353535",
				},
				"pulsar-blue": {
					DEFAULT: "#0052cc",
					50: "#e6f0ff",
					100: "#b3d1ff",
					200: "#80b2ff",
					300: "#4d93ff",
					400: "#1a74ff",
					500: "#0052cc",
					600: "#0041a3",
					700: "#00317a",
					800: "#002052",
					900: "#001029",
				},
				"warning-orange": {
					DEFAULT: "#ff6b35",
					50: "#fff4f0",
					100: "#ffe0d1",
					200: "#ffccb2",
					300: "#ffb893",
					400: "#ffa474",
					500: "#ff6b35",
					600: "#cc562a",
					700: "#994020",
					800: "#662b15",
					900: "#33160b",
				},
			},
			borderRadius: {
				none: "0",
				xs: "4px",
				sm: "8px",
				md: "12px",
				lg: "16px",
				xl: "28px",
				"2xl": "100px", // Full / Pill
			},
			transitionTimingFunction: {
				// M3 Expressive Motion
				emphasized: "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
				"emphasized-decelerate": "cubic-bezier(0.05, 0.7, 0.1, 1.0)",
				"emphasized-accelerate": "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
				standard: "cubic-bezier(0.2, 0.0, 0, 1.0)",
				"standard-decelerate": "cubic-bezier(0, 0, 0, 1.0)",
				"standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
			},
			transitionDuration: {
				short1: "50ms",
				short2: "100ms",
				short3: "150ms",
				short4: "200ms",
				medium1: "250ms",
				medium2: "300ms",
				medium3: "350ms",
				medium4: "400ms",
				long1: "450ms",
				long2: "500ms",
				long3: "550ms",
				long4: "600ms",
				"extra-long1": "700ms",
				"extra-long2": "800ms",
				"extra-long3": "900ms",
				"extra-long4": "1000ms",
			},
			fontFamily: {
				sans: [
					"Roboto Flex",
					"Inter",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				mono: [
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					"Liberation Mono",
					"Courier New",
					"monospace",
				],
				dashboard: ["Roboto Flex", "Inter", "ui-monospace", "monospace"],
			},
			backgroundColor: {
				oled: "#000000",
			},
			textColor: {
				oled: "#000000",
				pulsar: "#0052cc",
				warning: "#ff6b35",
			},
		},
	},
	plugins: [],
};
