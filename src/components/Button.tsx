import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "../utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
	variant?: "filled" | "outlined" | "text";
	size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "filled", size = "md", children, ...props }, ref) => {
		const baseStyles =
			"inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-oled-black";

		const variants = {
			filled:
				"bg-primary text-primary-on hover:bg-primary/90 active:bg-primary/80 shadow-sm hover:shadow-md",
			outlined:
				"border border-outline-base text-primary hover:bg-primary/10 active:bg-primary/20",
			text: "text-primary hover:bg-primary/10 active:bg-primary/20",
		};

		const sizes = {
			sm: "h-8 px-4 text-xs",
			md: "h-10 px-6 text-sm",
			lg: "h-12 px-8 text-base",
		};

		return (
			<motion.button
				ref={ref}
				whileTap={{ scale: 0.95 }}
				className={cn(baseStyles, variants[variant], sizes[size], className)}
				{...props}
			>
				{children}
			</motion.button>
		);
	},
);

Button.displayName = "Button";
