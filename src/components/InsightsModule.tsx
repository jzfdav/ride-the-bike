import { motion } from "framer-motion";
import { Droplet, Milestone, TrendingUp } from "lucide-react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useStore } from "../store";

export function InsightsModule() {
	const { rides, fuelLog, currentOdo, targetOdo, baseOdo } = useStore();

	// Process ride data for burn-down
	const burnDownData = [...rides].reverse().map((r) => ({
		name: new Date(r.date).toLocaleDateString([], {
			month: "short",
			day: "numeric",
		}),
		odo: r.odometer,
		target: targetOdo,
	}));

	// Process fuel data
	const fuelData = [...fuelLog]
		.reverse()
		.slice(-5)
		.map((f, i, arr) => {
			const prev = arr[i - 1];
			const fe = prev ? (f.odo - prev.odo) / f.liters : 0;
			return {
				name: new Date(f.date).toLocaleDateString([], {
					month: "short",
					day: "numeric",
				}),
				fe: parseFloat(fe.toFixed(1)),
			};
		})
		.filter((d) => d.fe > 0);

	const progressPercent = Math.min(
		100,
		((currentOdo - baseOdo) / (targetOdo - baseOdo)) * 100,
	);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="space-y-6"
		>
			{/* Progress Over Time (Burn-down) */}
			<section className="bg-oled-gray-50/50 rounded-3xl p-6 border border-white/5">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-pulsar-blue mb-1 flex items-center gap-2">
							<Milestone className="w-3.5 h-3.5" /> Target Progress
						</h3>
						<p className="text-[9px] text-white/40 uppercase font-bold">
							Odometer accumulation vs. Goal
						</p>
					</div>
					<div className="text-right">
						<div className="text-lg font-black text-white">
							{progressPercent.toFixed(1)}%
						</div>
						<div className="text-[8px] text-pulsar-blue font-black tracking-widest uppercase">
							Complete
						</div>
					</div>
				</div>

				<div className="h-[200px] w-full mt-2">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={burnDownData}>
							<defs>
								<linearGradient id="colorOdo" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
									<stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="#ffffff05"
							/>
							<XAxis
								dataKey="name"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 9, fill: "#ffffff30", fontWeight: "bold" }}
							/>
							<YAxis hide domain={[baseOdo, targetOdo]} />
							<Tooltip
								contentStyle={{
									backgroundColor: "#0A0A0A",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "12px",
									fontSize: "10px",
									fontWeight: "bold",
								}}
								itemStyle={{ color: "#00E5FF" }}
							/>
							<Area
								type="monotone"
								dataKey="odo"
								stroke="#00E5FF"
								strokeWidth={3}
								fillOpacity={1}
								fill="url(#colorOdo)"
								animationDuration={1500}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</section>

			{/* Fuel efficiency trends */}
			<section className="bg-oled-gray-50/50 rounded-3xl p-6 border border-white/5">
				<div className="mb-6">
					<h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-warning-orange mb-1 flex items-center gap-2">
						<TrendingUp className="w-3.5 h-3.5" /> Efficiency Trend
					</h3>
					<p className="text-[9px] text-white/40 uppercase font-bold">
						KM per Liter (Last 5 Refuels)
					</p>
				</div>

				<div className="h-[150px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={fuelData}>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="#ffffff05"
							/>
							<XAxis
								dataKey="name"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 9, fill: "#ffffff30", fontWeight: "bold" }}
							/>
							<Bar
								dataKey="fe"
								fill="#FF9E00"
								radius={[4, 4, 0, 0]}
								animationDuration={1500}
								label={{
									position: "top",
									fill: "#FF9E00",
									fontSize: 10,
									fontWeight: "black",
								}}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</section>
		</motion.div>
	);
}
