import { AnimatePresence, motion } from "framer-motion";
import {
	Bike,
	CircleDot,
	Fuel,
	LayoutGrid,
	LineChart,
	Plus,
	Settings,
	X,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";
import { cn } from "../utils";

type FormType = "ride" | "fuel" | "bars" | "tyre" | null;

export function BottomActions({
	onOpenSettings,
	showInsights,
	onToggleInsights,
}: {
	onOpenSettings: () => void;
	showInsights: boolean;
	onToggleInsights: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [activeForm, setActiveForm] = useState<FormType>(null);
	const [val1, setVal1] = useState(""); // distance or liters
	const [val2, setVal2] = useState(""); // cost or rear psi
	const [val3, setVal3] = useState(""); // fuel price per litre

	const [showSuccess, setShowSuccess] = useState<string | null>(null);
	const {
		logRide,
		logFuel,
		setFuelBars,
		setTyrePressure,
		lastFuelPrice,
		setLastFuelPrice,
	} = useStore();

	const triggerSuccess = (msg: string) => {
		setShowSuccess(msg);
		setTimeout(() => setShowSuccess(null), 2000);
	};

	const handleAction = (type: FormType) => {
		if (type === "fuel" && lastFuelPrice) {
			setVal3(lastFuelPrice.toString());
		}
		setActiveForm(type);
	};

	const onFuelValChange = (
		field: "liters" | "cost" | "price",
		value: string,
	) => {
		const num = parseFloat(value);
		const price =
			field === "price" ? num : parseFloat(val3) || lastFuelPrice || 0;

		if (field === "liters") {
			setVal1(value);
			if (!isNaN(price) && price > 0 && !isNaN(num)) {
				setVal2((num * price).toFixed(2));
			}
		} else if (field === "cost") {
			setVal2(value);
			if (!isNaN(price) && price > 0 && !isNaN(num)) {
				setVal1((num / price).toFixed(2));
			}
		} else if (field === "price") {
			setVal3(value);
			const liters = parseFloat(val1);
			const cost = parseFloat(val2);
			if (!isNaN(num) && num > 0) {
				if (!isNaN(liters) && liters > 0) {
					setVal2((liters * num).toFixed(2));
				} else if (!isNaN(cost) && cost > 0) {
					setVal1((cost / num).toFixed(2));
				}
			}
		}
	};

	const handleSubmit = () => {
		if (activeForm === "ride") {
			const d = parseFloat(val1);
			if (d > 0) {
				logRide(d);
				triggerSuccess(`${d} KM Ride Logged!`);
			}
		} else if (activeForm === "fuel") {
			const l = parseFloat(val1);
			const c = parseFloat(val2);
			const p = parseFloat(val3);
			if (l > 0 && c > 0) {
				logFuel(l, c);
				if (!isNaN(p)) setLastFuelPrice(p);
				setFuelBars(12); // Always reset to full on top-up
				triggerSuccess(`Fuel Refilled!`);
			}
		} else if (activeForm === "bars") {
			let b = parseInt(val1);
			if (!isNaN(b)) {
				b = Math.max(0, Math.min(12, b)); // Clamp 0-12
				setFuelBars(b);
				triggerSuccess(`Fuel Level Updated!`);
			}
		} else if (activeForm === "tyre") {
			const f = parseFloat(val1);
			const r = parseFloat(val2);
			if (!isNaN(f) && !isNaN(r) && f >= 0 && r >= 0) {
				setTyrePressure(f, r);
				triggerSuccess(`Tyre Pressure Logged!`);
			}
		}
		closeForm();
	};

	const closeForm = () => {
		setActiveForm(null);
		setVal1("");
		setVal2("");
		setVal3("");
		setIsOpen(false);
	};

	return (
		<div className="fixed bottom-6 left-0 right-0 z-40 px-6 pointer-events-none">
			<div className="max-w-md mx-auto relative pointer-events-auto">
				<AnimatePresence>
					{isOpen && !activeForm && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							className="absolute bottom-20 left-0 right-0 grid grid-cols-2 gap-3"
						>
							{[
								{
									id: "ride" as const,
									label: "Ride",
									icon: Bike,
									color: "bg-primary",
									show: true,
								},
								{
									id: "fuel" as const,
									label: "Refuel",
									icon: Fuel,
									color: "bg-tertiary",
									show: true,
								},
								{
									id: "bars" as const,
									label: "Fuel Bars",
									icon: Fuel,
									color: "bg-secondary",
									show: true,
								},
								{
									id: "tyre" as const,
									label: "Tyre PSI",
									icon: CircleDot,
									color: "bg-error",
									show: true,
								},
							]
								.filter((btn) => btn.show)
								.map((btn) => (
									<button
										key={btn.id}
										onClick={() => handleAction(btn.id)}
										className={cn(
											btn.color,
											"p-4 rounded-2xl flex flex-col items-center gap-2 shadow-xl border border-white/10 text-white",
										)}
									>
										<btn.icon className="w-6 h-6" />
										<span className="text-[10px] font-bold uppercase tracking-wider">
											{btn.label}
										</span>
									</button>
								))}
						</motion.div>
					)}
				</AnimatePresence>

				{activeForm && (
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 100 }}
						className="absolute bottom-0 left-0 right-0 bg-surface-container-high p-6 rounded-3xl border border-outline-base/20 shadow-2xl"
					>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xs font-bold uppercase tracking-widest text-surface-on-variant">
								Log {activeForm}
							</h3>
							<button onClick={closeForm}>
								<X className="w-5 h-5 text-surface-on-variant hover:text-surface-on" />
							</button>
						</div>

						<div className="space-y-4">
							{activeForm === "fuel" && (
								<div className="relative">
									<input
										type="number"
										value={val3}
										onChange={(e) => onFuelValChange("price", e.target.value)}
										className="w-full bg-surface-container-highest border-2 border-transparent focus:border-tertiary rounded-2xl px-5 py-4 text-2xl font-bold text-tertiary focus:outline-none transition-colors placeholder:text-surface-on-variant/30"
										placeholder="Price per Litre"
										min={0}
									/>
									<span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-surface-on-variant/50">
										₹/L
									</span>
								</div>
							)}

							<div className="relative">
								<input
									type="number"
									value={val1}
									onChange={(e) =>
										activeForm === "fuel"
											? onFuelValChange("liters", e.target.value)
											: setVal1(e.target.value)
									}
									className={cn(
										"w-full bg-surface-container-highest border-2 border-transparent rounded-2xl px-5 py-4 text-2xl font-bold focus:outline-none transition-colors placeholder:text-surface-on-variant/30",
										activeForm === "fuel"
											? "text-tertiary focus:border-tertiary"
											: "text-primary focus:border-primary",
									)}
									placeholder={
										activeForm === "ride"
											? "Distance"
											: activeForm === "fuel"
												? "Liters"
												: activeForm === "bars"
													? "Remaining Bars (0-12)"
													: "Front PSI"
									}
									autoFocus
									min={0}
									max={activeForm === "bars" ? 12 : undefined}
								/>
								<span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-surface-on-variant/50">
									{activeForm === "ride"
										? "KM"
										: activeForm === "fuel"
											? "L"
											: activeForm === "bars"
												? "/12"
												: "F"}
								</span>
							</div>

							{(activeForm === "fuel" || activeForm === "tyre") && (
								<div className="relative">
									<input
										type="number"
										value={val2}
										onChange={(e) =>
											activeForm === "fuel"
												? onFuelValChange("cost", e.target.value)
												: setVal2(e.target.value)
										}
										className={cn(
											"w-full bg-surface-container-highest border-2 border-transparent rounded-2xl px-5 py-4 text-2xl font-bold focus:outline-none transition-colors placeholder:text-surface-on-variant/30",
											activeForm === "fuel"
												? "text-tertiary focus:border-tertiary"
												: "text-primary focus:border-primary",
										)}
										placeholder={
											activeForm === "fuel" ? "Total Cost" : "Rear PSI"
										}
									/>
									<span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-surface-on-variant/50">
										{activeForm === "fuel" ? "₹" : "R"}
									</span>
								</div>
							)}

							<button
								onClick={handleSubmit}
								className={cn(
									"w-full text-surface-on font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-[0.98]",
									activeForm === "fuel"
										? "bg-tertiary"
										: "bg-primary text-primary-on",
								)}
							>
								CONFIRM
							</button>
						</div>
					</motion.div>
				)}

				{!activeForm && (
					<div className="relative">
						{/* Blurred Backdrop Dock */}
						<div className="absolute -inset-x-4 -inset-y-3 bg-surface-container/90 backdrop-blur-xl rounded-[2rem] border border-outline-base/10 shadow-2xl z-0" />

						<div className="relative z-10 flex items-center gap-4">
							{/* Left: Stats/Insights Button */}
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={onToggleInsights}
								className={cn(
									"w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg transition-colors duration-medium2",
									showInsights
										? "bg-primary border-primary text-primary-on"
										: "bg-surface-container-high border-white/5 text-surface-on-variant hover:text-surface-on",
								)}
							>
								{showInsights ? (
									<LayoutGrid className="w-6 h-6" />
								) : (
									<LineChart className="w-6 h-6" />
								)}
							</motion.button>

							{/* Center: Main Action Button */}
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsOpen(!isOpen)}
								className={cn(
									"flex-1 h-16 rounded-2xl flex items-center justify-center shadow-2xl border transition-all duration-medium2",
									isOpen
										? "bg-surface-container-high border-white/5"
										: "bg-primary border-primary shadow-primary/20",
								)}
							>
								<motion.div
									animate={{ rotate: isOpen ? 45 : 0 }}
									transition={{ type: "spring", damping: 10, stiffness: 200 }}
								>
									<Plus
										className={cn(
											"w-8 h-8",
											isOpen ? "text-surface-on-variant" : "text-primary-on",
										)}
									/>
								</motion.div>
							</motion.button>

							{/* Right: Settings Button */}
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={onOpenSettings}
								className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center border border-white/5 shadow-lg text-surface-on-variant hover:text-surface-on transition-colors duration-medium2"
							>
								<Settings className="w-6 h-6" />
							</motion.button>
						</div>
					</div>
				)}

				{/* Success Toast Overlay */}
				<AnimatePresence>
					{showSuccess && (
						<motion.div
							initial={{ opacity: 0, y: 20, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.9 }}
							className="absolute bottom-20 left-4 right-4 bg-primary text-primary-on font-black text-[10px] uppercase tracking-[0.2em] py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(var(--primary),0.4)] flex items-center justify-center gap-3 z-50 overflow-hidden"
						>
							<motion.div
								initial={{ x: -20 }}
								animate={{ x: 0 }}
								className="w-1.5 h-1.5 rounded-full bg-primary-on animate-pulse"
							/>
							{showSuccess}
							<div className="absolute bottom-0 left-0 h-1 bg-primary-on/20 animate-progress" />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
