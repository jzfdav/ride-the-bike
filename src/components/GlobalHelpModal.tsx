import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { useStore } from "../store";

export function GlobalHelpModal() {
	const { activeHelp, setActiveHelp } = useStore();

	return (
		<Dialog.Root
			open={!!activeHelp}
			onOpenChange={(open) => !open && setActiveHelp(null)}
		>
			<AnimatePresence>
				{activeHelp && (
					<Dialog.Portal forceMount>
						<Dialog.Overlay asChild>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="fixed inset-0 z-[100] bg-oled-black/80 backdrop-blur-md"
							/>
						</Dialog.Overlay>
						<div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
							<Dialog.Content asChild>
								<motion.div
									initial={{ opacity: 0, scale: 0.9, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.9, y: 20 }}
									className="w-full max-w-xs bg-oled-gray-100 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl pointer-events-auto outline-none"
								>
									<div className="flex justify-between items-start mb-6">
										<div className="flex items-center gap-3">
											<div className="p-2 bg-pulsar-blue/10 rounded-xl">
												<Info className="w-4 h-4 text-pulsar-blue" />
											</div>
											<Dialog.Title className="text-sm font-black uppercase tracking-[0.2em] text-pulsar-blue">
												{activeHelp.title}
											</Dialog.Title>
										</div>
										<Dialog.Close asChild>
											<button
												type="button"
												className="p-2 -mr-2 -mt-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
												aria-label="Close"
											>
												<X className="w-5 h-5 text-white/40 hover:text-white" />
											</button>
										</Dialog.Close>
									</div>
									<Dialog.Description className="text-sm leading-relaxed text-oled-gray-400 font-medium whitespace-pre-wrap">
										{activeHelp.content}
									</Dialog.Description>
								</motion.div>
							</Dialog.Content>
						</div>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
