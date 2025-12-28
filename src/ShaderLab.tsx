import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { PlasmaBattery } from "./components/shaders/PlasmaBattery";

export function ShaderLab() {
	const [batteryLevel, setBatteryLevel] = useState(50);
	const [charging, setCharging] = useState(false);

	return (
		<div className="w-full h-screen bg-black text-white p-8 flex flex-col items-center">
			<h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pulsar-blue to-white">
				Shader Lab
			</h1>

			<div className="w-full max-w-3xl h-[400px] border border-white/10 rounded-3xl overflow-hidden bg-oled-gray-100 relative">
				<Canvas>
					<color attach="background" args={["#141414"]} />
					<ambientLight intensity={0.5} />

					<PlasmaBattery level={batteryLevel} charging={charging} />
				</Canvas>
			</div>

			<div className="mt-8 space-y-4 w-full max-w-md">
				<div className="space-y-2">
					<div className="flex justify-between text-xs font-bold uppercase tracking-widest">
						<span>Battery Level</span>
						<span>{batteryLevel}%</span>
					</div>
					<input
						type="range"
						min="0"
						max="100"
						value={batteryLevel}
						onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
						className="w-full accent-pulsar-blue"
					/>
				</div>

				<div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
					<span className="text-xs font-bold uppercase tracking-widest">
						Charging State
					</span>
					<button
						onClick={() => setCharging(!charging)}
						className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
							charging
								? "bg-pulsar-blue text-white"
								: "bg-white/10 text-white/50"
						}`}
					>
						{charging ? "Active" : "Inactive"}
					</button>
				</div>
			</div>

			<div className="mt-12 text-center opacity-30 text-[10px] uppercase tracking-[0.3em]">
				Experimental • WebGL • R3F
			</div>
		</div>
	);
}
