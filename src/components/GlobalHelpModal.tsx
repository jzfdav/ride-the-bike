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
								className="fixed inset-0 z-[100] bg-surface/80 backdrop-blur-md"
							/>
						</Dialog.Overlay>
						<div className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none">
							<Dialog.Content asChild>
								<motion.div
									initial={{ opacity: 0, scale: 0.9, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.9, y: 20 }}
									className="w-full max-w-xs bg-surface-container-high border border-outline-variant/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl pointer-events-auto outline-none"
								>
									<div className="flex justify-between items-start mb-6">
										<div className="flex items-center gap-3">
											<div className="p-2 bg-primary-container rounded-xl">
												<Info className="w-4 h-4 text-on-primary-container" />
											</div>
											<Dialog.Title className="text-sm font-black uppercase tracking-[0.2em] text-primary">
												{activeHelp.title}
											</Dialog.Title>
										</div>
										<Dialog.Close asChild>
											<button
												type="button"
												className="p-2 -mr-2 -mt-2 bg-surface-on/5 rounded-full hover:bg-surface-on/10 transition-colors"
												aria-label="Close"
											>
												<X className="w-5 h-5 text-surface-on-variant hover:text-surface-on" />
											</button>
										</Dialog.Close>
									</div>
									<Dialog.Description className="text-sm leading-relaxed text-surface-on-variant font-medium whitespace-pre-wrap">
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
