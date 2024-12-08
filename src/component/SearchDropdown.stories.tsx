import { Meta, StoryObj } from "@storybook/react";
import SearchDropdown from "./SearchDropdown";
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

const meta: Meta<typeof SearchDropdown> = {
	component: SearchDropdown,
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	}
};

export default meta;
type Story = StoryObj<typeof SearchDropdown>;

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