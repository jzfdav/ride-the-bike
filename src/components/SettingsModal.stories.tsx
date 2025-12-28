import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SettingsModalUI } from "./SettingsModal";

const meta: Meta<typeof SettingsModalUI> = {
	title: "Dashboard/SettingsModal",
	component: SettingsModalUI,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story: React.ComponentType) => (
			<div className="min-h-screen bg-black p-8">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SettingsModalUI>;

export const Default: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
		onSave: (data: any) => console.log("Save:", data),
		initialData: {
			serviceDueDate: new Date().toISOString(),
			currentOdo: 10450,
			baseOdo: 10000,
			targetOdo: 15000,
			bikeModel: "Pulsar NS200",
			showLubeTracker: true,
			showFuelTracker: true,
			showTyreTracker: true,
			showChecklist: true,
		},
	},
};

export const MinimalWidgets: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
		onSave: (data: any) => console.log("Save:", data),
		initialData: {
			serviceDueDate: new Date().toISOString(),
			currentOdo: 500,
			baseOdo: 0,
			targetOdo: 2000,
			bikeModel: "KTM Duke 390",
			showLubeTracker: false,
			showFuelTracker: false,
			showTyreTracker: false,
			showChecklist: true,
		},
	},
};
