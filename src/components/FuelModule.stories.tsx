import type { Meta, StoryObj } from "@storybook/react";
import { FuelModuleUI } from "./FuelModule";

const meta: Meta<typeof FuelModuleUI> = {
	title: "Dashboard/FuelModule",
	component: FuelModuleUI,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div className="w-[350px] p-8 bg-black">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof FuelModuleUI>;

export const FullTank: Story = {
	args: {
		fuelBars: 12,
		avgFE: "42.5",
		fuelLogCount: 5,
		isVisible: true,
	},
};

export const HalfTank: Story = {
	args: {
		fuelBars: 6,
		avgFE: "40.2",
		fuelLogCount: 3,
		isVisible: true,
	},
};

export const Reserve: Story = {
	args: {
		fuelBars: 2,
		avgFE: "38.1",
		fuelLogCount: 10,
		isVisible: true,
	},
};

export const Critical: Story = {
	args: {
		fuelBars: 1,
		avgFE: "35.4",
		fuelLogCount: 15,
		isVisible: true,
	},
};

export const NoData: Story = {
	args: {
		fuelBars: 12,
		avgFE: "--.-",
		fuelLogCount: 0,
		isVisible: true,
	},
};
