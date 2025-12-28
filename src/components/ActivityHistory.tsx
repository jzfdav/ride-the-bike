import { motion } from "framer-motion";
import { History, MapPin } from "lucide-react";
import type { Ride } from "../store";

interface ActivityHistoryProps {
	rides: Ride[];
	totalRidesThisWeek: number;
}

export function ActivityHistory({
	rides,
	totalRidesThisWeek,
}: ActivityHistoryProps) {
	if (rides.length === 0) return null;

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between px-2">
				<h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
					<History className="w-4 h-4" /> Activity
				</h2>
				<span className="text-[10px] font-black text-pulsar-blue uppercase tracking-widest">
					{totalRidesThisWeek}/3 WEEKLY RIDES
				</span>
			</div>

			<div className="space-y-3">
				{rides.slice(0, 3).map((ride, idx) => (
					<div
						key={`${ride.id}-${idx}`}
						className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5"
					>
						<div className="flex items-center gap-4">
							<div className="p-2 bg-pulsar-blue/10 rounded-xl">
								<MapPin className="w-4 h-4 text-pulsar-blue" />
							</div>
							<div>
								<div className="text-sm font-bold">Ride Logged</div>
								<div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
									{new Date(ride.date).toLocaleDateString(undefined, {
										month: "short",
										day: "numeric",
									})}
								</div>
							</div>
						</div>
						<div className="text-right">
							<div className="text-sm font-bold text-pulsar-blue">
								+{ride.distance} km
							</div>
							<div className="text-[10px] text-white/20 font-bold tracking-tighter">
								{ride.odometer.toLocaleString()} total
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
