import { Palette } from "lucide-react";
import { useStore } from "../store";
import type { ThemeName } from "../themes";
import { cn } from "../utils";

const themeOptions: { name: ThemeName; color: string; label: string }[] = [
	{ name: "blue", color: "#B0C6FF", label: "Ocean Blue" },
	{ name: "red", color: "#FFB4AB", label: "OnePlus Red" },
	{ name: "green", color: "#6EE7B7", label: "Emerald" },
];

export function ThemeSelector() {
	const theme = useStore((state) => state.theme);
	const setTheme = useStore((state) => state.setTheme);

	return (
		<div className="bg-surface-container-low rounded-[2rem] p-4 border border-outline-variant/10">
			<div className="flex items-center gap-2 mb-4">
				<Palette className="w-4 h-4 text-primary" />
				<span className="text-[10px] font-black text-surface-on uppercase tracking-widest">
					Theme
				</span>
			</div>

			<div className="flex items-center justify-center gap-6">
				{themeOptions.map((option) => (
					<button
						key={option.name}
						type="button"
						onClick={() => setTheme(option.name)}
						className={cn(
							"flex flex-col items-center gap-2 p-3 rounded-2xl transition-all",
							theme === option.name
								? "bg-surface-container-high scale-105"
								: "hover:bg-surface-container-high/50",
						)}
						aria-label={`Select ${option.label} theme`}
					>
						<div
							className={cn(
								"w-10 h-10 rounded-full border-2 transition-all",
								theme === option.name
									? "border-surface-on ring-2 ring-surface-on/20"
									: "border-surface-variant",
							)}
							style={{ backgroundColor: option.color }}
						/>
						<span className="text-[8px] font-bold text-surface-on-variant uppercase tracking-wider">
							{option.label}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
