import { motion } from "framer-motion";
import { Cloud, CloudRain, MapPin, Sun, Thermometer, Wind } from "lucide-react";
import { useRiderInsights } from "../hooks/useRiderInsights";
import { cn } from "../utils";
import { InfoTooltip } from "./InfoTooltip";

const getWeatherInfo = (code: number | null) => {
	if (code === null)
		return { text: "Loading...", icon: Sun, color: "text-primary" };

	// WMO Weather interpretation codes (WW)
	if (code === 0)
		return { text: "Clear Sky", icon: Sun, color: "text-tertiary" };
	if (code <= 3)
		return {
			text: "Partly Cloudy",
			icon: Cloud,
			color: "text-surface-on-variant",
		};
	if (code <= 48)
		return { text: "Foggy", icon: Cloud, color: "text-surface-on-variant" };
	if (code <= 55)
		return { text: "Drizzle", icon: CloudRain, color: "text-primary" };
	if (code <= 65)
		return { text: "Raining", icon: CloudRain, color: "text-primary" };
	if (code <= 77)
		return { text: "Snowing", icon: CloudRain, color: "text-surface-on" };
	if (code <= 82)
		return { text: "Rain Showers", icon: CloudRain, color: "text-primary" };
	return { text: "Cloudy", icon: Cloud, color: "text-surface-on-variant" };
};

export function WeatherModule() {
	const {
		data: insights,
		isLoading,
		isError,
		geoError,
		isLocating,
	} = useRiderInsights();

	if (isLocating) {
		return (
			<div className="bg-white/[0.03] rounded-3xl p-5 border border-white/5 animate-pulse">
				<div className="flex items-center gap-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
					<MapPin className="w-3.5 h-3.5" /> Getting location...
				</div>
			</div>
		);
	}

	if (geoError) {
		return (
			<div className="bg-warning-orange/5 rounded-3xl p-5 border border-warning-orange/10">
				<div className="text-[10px] text-warning-orange font-bold uppercase tracking-widest">
					Location Access Denied
				</div>
				<p className="text-[9px] text-white/40 mt-1">
					Please enable location for weather data.
				</p>
			</div>
		);
	}

	if (isLoading) return null;
	if (isError || !insights) {
		return (
			<div className="bg-oled-gray-50/50 rounded-3xl p-6 border border-white/5 opacity-50">
				<div className="flex items-center gap-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
					<Cloud className="w-3.5 h-3.5" /> Weather Service Offline
				</div>
				<p className="text-[9px] text-white/10 mt-2 font-medium">
					Stats will resume once connection is restored.
				</p>
			</div>
		);
	}

	const { weather, aqi, location, lastUpdated } = insights;
	const info = getWeatherInfo(weather.code);
	const Icon = info.icon;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between px-2">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
					<h2 className="text-[10px] font-black text-surface-on-variant uppercase tracking-[0.2em] flex items-center gap-2">
						Riding in <span className="text-surface-on">{location.city}</span>
					</h2>
				</div>
				<span className="text-[8px] text-surface-on-variant/50 font-bold tracking-widest uppercase">
					Updated{" "}
					{new Date(lastUpdated).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<section className="relative bg-surface-container-low rounded-[2rem] p-4 shadow-sm border border-outline-base/10">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<Thermometer className="w-3.5 h-3.5 text-primary" />
							<span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/5">
								READY
							</span>
						</div>
						<InfoTooltip
							title="Weather Stats"
							content="Real-time weather data for your current location. Updated every 15 minutes."
						/>
					</div>

					<div className="flex items-center gap-3">
						<Icon className={cn("w-8 h-8", info.color)} />
						<div className="space-y-0.5">
							<div className="text-lg font-black tracking-tight text-surface-on leading-none">
								{weather.temp}°
								<span className="text-[10px] opacity-30 ml-0.5">C</span>
							</div>
							<div className="text-[9px] font-bold text-surface-on-variant uppercase tracking-tight truncate max-w-[120px]">
								{info.text}
							</div>
						</div>
					</div>

					<div className="mt-4 pt-3 border-t border-outline-variant/10 flex items-center justify-between">
						<div className="flex items-center gap-1">
							<CloudRain className="w-2.5 h-2.5 text-primary/60" />
							<span className="text-[9px] font-black text-surface-on-variant/40">
								{weather.rainProb}%{" "}
								<span className="text-[8px] opacity-50 ml-0.5">RAIN</span>
							</span>
						</div>
					</div>
				</section>

				<section className="relative bg-surface-container-low rounded-[2rem] p-4 shadow-sm border border-outline-base/10">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<Wind className="w-3.5 h-3.5 text-primary" />
							<div
								className={cn(
									"px-1.5 py-0.5 rounded-[4px] text-[7px] font-black uppercase tracking-widest",
									aqi.label === "Good"
										? "bg-emerald-500/10 text-emerald-500"
										: aqi.label === "Moderate"
											? "bg-amber-500/10 text-amber-500"
											: "bg-error/10 text-error animate-pulse",
								)}
							>
								{aqi.label}
							</div>
						</div>
						<InfoTooltip
							title="Air Quality"
							content="Measures pollutants like PM2.5 and PM10 using the international EPA standard. Higher values indicate poorer air quality."
						/>
					</div>

					<div className="text-3xl font-black tracking-tighter text-surface-on mb-1">
						{aqi.value}
					</div>
					<div className="text-[9px] font-bold text-surface-on-variant uppercase tracking-widest opacity-80">
						AIR QUALITY INDEX
					</div>

					<div className="mt-3 overflow-hidden bg-surface-container-highest rounded-full h-1 w-full">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${Math.min(100, (aqi.value || 0) / 2)}%` }}
							className={cn(
								"h-full rounded-full",
								aqi.label === "Good"
									? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
									: aqi.label === "Moderate"
										? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
										: "bg-error shadow-[0_0_8px_rgba(var(--error),0.4)]",
							)}
						/>
					</div>
				</section>
			</div>
		</div>
	);
}
