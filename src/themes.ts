// Theme definitions for the app
// Each theme is a dark mode variant with different accent colors

export type ThemeName = "blue" | "red" | "green";

export interface ThemeColors {
	primary: string;
	primaryOn: string;
	primaryContainer: string;
	primaryOnContainer: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
	blue: {
		// Original Pulsar Blue
		primary: "#B0C6FF",
		primaryOn: "#002D6F",
		primaryContainer: "#004398",
		primaryOnContainer: "#D8E2FF",
	},
	red: {
		// OnePlus Red - easy on eyes for dark theme
		primary: "#FFB4AB",
		primaryOn: "#690005",
		primaryContainer: "#930009",
		primaryOnContainer: "#FFDAD6",
	},
	green: {
		// Emerald green (from checklist widget)
		primary: "#6EE7B7", // emerald-300 for dark mode visibility
		primaryOn: "#064E3B",
		primaryContainer: "#10B981", // emerald-500
		primaryOnContainer: "#D1FAE5",
	},
};

export function applyTheme(themeName: ThemeName): void {
	const theme = themes[themeName];
	const root = document.documentElement;

	root.style.setProperty("--theme-primary", theme.primary);
	root.style.setProperty("--theme-primary-on", theme.primaryOn);
	root.style.setProperty("--theme-primary-container", theme.primaryContainer);
	root.style.setProperty(
		"--theme-primary-on-container",
		theme.primaryOnContainer,
	);

	// Also set data attribute for potential CSS-only theming
	root.setAttribute("data-theme", themeName);
}
