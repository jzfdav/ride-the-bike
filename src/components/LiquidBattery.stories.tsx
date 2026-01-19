import type { Meta, StoryObj } from "@storybook/react";
import { LiquidBattery } from "./LiquidBattery";

const meta: Meta<typeof LiquidBattery> = {
	title: "Dashboard/LiquidBattery",
	component: LiquidBattery,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story: React.ComponentType) => (
			<div className="w-[300px] p-8 bg-black">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof LiquidBattery>;

export const Optimal: Story = {
	args: {
		health: 98,
	},
};

export const Normal: Story = {
	args: {
		health: 65,
	},
};

export const Warning: Story = {
	args: {
		health: 45,
	},
};

export const Critical: Story = {
	args: {
		health: 12,
	},
};
