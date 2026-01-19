import { LayoutGrid, LineChart, Settings, Zap } from "lucide-react";
import { useStore } from "../store";
import { cn } from "../utils";

interface DashboardHeaderProps {
	showInsights: boolean;
	onToggleInsights: () => void;
}

export function DashboardHeader({
	showInsights,
	onToggleInsights,
}: DashboardHeaderProps) {
	const bikeModel = useStore((state) => state.bikeModel);

	return (
		<header className="flex items-center justify-between mb-8">
			<div className="flex justify-between items-center w-full mb-10">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-pulsar-blue to-pulsar-blue/40 flex items-center justify-center shadow-lg shadow-pulsar-blue/20">
						<Zap className="w-6 h-6 text-black fill-white" />
					</div>
					<div>
						<h1 className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">
							{bikeModel}
						</h1>
						<div className="flex items-center gap-2 mt-0.5">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
							<span className="text-[9px] font-black tracking-widest text-emerald-500 uppercase">
								System Ready
							</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
