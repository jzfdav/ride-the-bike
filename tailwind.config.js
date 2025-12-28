/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// OLED True Black
				"oled-black": "#000000",
				// Additional shades for depth
				"oled-gray": {
					50: "#0a0a0a",
					100: "#141414",
					200: "#1f1f1f",
					300: "#2a2a2a",
					400: "#353535",
				},
				// Pulsar Neon Blue with shades
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
				// Warning Orange for low battery health with shades
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
			fontFamily: {
				sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
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
				dashboard: ["Outfit", "ui-monospace", "monospace"],
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
