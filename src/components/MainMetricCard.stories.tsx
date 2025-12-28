import type { Meta, StoryObj } from "@storybook/react";
import { MainMetricCard } from "./MainMetricCard";

const meta: Meta<typeof MainMetricCard> = {
	title: "Dashboard/MainMetricCard",
	component: MainMetricCard,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story: React.ComponentType) => (
			<div className="w-[450px] p-8 bg-black">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof MainMetricCard>;

export const Default: Story = {
	args: {
		currentOdo: 10000,
		baseOdo: 9000,
		targetOdo: 12000,
		progress: 33.3,
	},
};

export const LargeValue: Story = {
	args: {
		currentOdo: 125430,
		baseOdo: 0,
		targetOdo: 200000,
		progress: 62.7,
	},
};

export const HighProgress: Story = {
	args: {
		currentOdo: 11950,
		baseOdo: 9000,
		targetOdo: 12000,
		progress: 98.3,
	},
};
