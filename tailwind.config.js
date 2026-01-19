/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// M3 Semantic Colors (Ocean Blue Config)
				primary: {
					DEFAULT: "#B0C6FF", // Blue 80
					on: "#002D6F", // Blue 20
					container: "#004398", // Blue 30
					onContainer: "#D8E2FF", // Blue 90
				},
				secondary: {
					DEFAULT: "#C0C6DC", // Blue/Gray 80
					on: "#2A3042", // Blue/Gray 20
					container: "#404659", // Blue/Gray 30
					onContainer: "#DCE2F9", // Blue/Gray 90
				},
				tertiary: {
					DEFAULT: "#E0BBDD", // Harmony (Pink/Purple) 80
					on: "#412741", // Harmony 20
					container: "#5A3D59", // Harmony 30
					onContainer: "#FDD7FA", // Harmony 90
				},
				error: {
					DEFAULT: "#FFB4AB", // Error 80
					on: "#690005", // Error 20
					container: "#93000A", // Error 30
					onContainer: "#FFDAD6", // Error 90
				},
				surface: {
					DEFAULT: "#111318", // Surface (Blue Tint)
					on: "#E2E2E9", // On Surface
					variant: "#44474F", // Surface Variant
					onVariant: "#C4C6D0", // On Surface Variant
					container: "#111318", // Surface Container
					"container-high": "#2B2D33", // Surface Container High
					"container-highest": "#36383E", // Surface Container Highest
					"container-low": "#191B20", // Surface Container Low
					"container-lowest": "#0C0E13", // Surface Container Lowest
					dim: "#111318", // Surface Dim
					bright: "#37393E", // Surface Bright
				},
				m3outline: {
					DEFAULT: "#938F99", // Outline Base
					variant: "#49454F", // Outline Variant
				},
				"outline-base": "#938F99", // For backward compatibility
				"outline-variant": "#49454F", // For backward compatibility

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
			borderColor: {
				"m3-outline": "#938F99",
				"m3-outline-variant": "#49454F",
			},
		},
	},
	plugins: [],
};
