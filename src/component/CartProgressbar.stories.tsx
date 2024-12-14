import { Meta, StoryObj } from "@storybook/react";
import CartProgressbar from "./CartProgressbar";
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

const meta: Meta<typeof CartProgressbar> = {
	component: CartProgressbar,
	args: {
		cartWeight: 0
	},
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	}
};

export default meta;
type Story = StoryObj<typeof CartProgressbar>;

export const DESKTOP: Story = {};

export const TABLET: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	}
};

export const LARGEMOBILE: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	}
};

export const SMALLMOBILE: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	}
};

