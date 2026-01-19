import { motion } from "framer-motion";
import { cn } from "../utils";

interface LoadingSkeletonProps {
	variant?: "modal" | "module" | "overlay";
	className?: string;
}

export function LoadingSkeleton({
	variant = "module",
	className,
}: LoadingSkeletonProps) {
	const shimmerAnimation = {
		animate: {
			backgroundPosition: ["-200%", "200%"],
		},
		transition: {
			duration: 1.5,
			repeat: Infinity,
			ease: "linear",
		},
	};

	if (variant === "modal") {
		return (
			<div
				className={cn(
					"fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm",
					className,
				)}
			>
				<motion.div
					className="w-80 h-96 rounded-[2.5rem] bg-surface-container border border-outline-variant/20"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.2 }}
				>
					<div className="p-6 space-y-4">
						<motion.div
							className="h-6 w-32 rounded-full bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high bg-[length:200%_100%]"
							{...shimmerAnimation}
						/>
						<div className="space-y-3">
							{[...Array(5)].map((_, i) => (
								<motion.div
									key={i}
									className="h-12 rounded-2xl bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high bg-[length:200%_100%]"
									{...shimmerAnimation}
									transition={{
										...shimmerAnimation.transition,
										delay: i * 0.1,
									}}
								/>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		);
	}

	if (variant === "overlay") {
		return (
			<motion.div
				className={cn(
					"fixed inset-0 z-50 flex items-center justify-center bg-surface",
					className,
				)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<div className="text-center space-y-4">
					<motion.div
						className="h-8 w-48 mx-auto rounded-full bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high bg-[length:200%_100%]"
						{...shimmerAnimation}
					/>
					<motion.div
						className="h-4 w-32 mx-auto rounded-full bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high bg-[length:200%_100%]"
						{...shimmerAnimation}
						transition={{ ...shimmerAnimation.transition, delay: 0.1 }}
					/>
				</div>
			</motion.div>
		);
	}

	// Default: module variant
	return (
		<motion.div
			className={cn(
				"bg-surface-container-low rounded-[2.5rem] p-6 border border-outline-variant/10",
				className,
			)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<div className="space-y-4">
				<motion.div
					className="h-5 w-24 rounded-full bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high bg-[length:200%_100%]"
					{...shimmerAnimation}
				/>
				<motion.div
					className="h-40 rounded-2xl bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container-high bg-[length:200%_100%]"
					{...shimmerAnimation}
					transition={{ ...shimmerAnimation.transition, delay: 0.1 }}
				/>
			</div>
		</motion.div>
	);
}
