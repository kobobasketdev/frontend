import { Meta, StoryObj } from "@storybook/react";
import CartItem from "../CartItem";
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";
import { items as itemsStub } from "#testData.ts";

const meta: Meta<typeof CartItem> = {
	component: CartItem,
	args: {
		item: itemsStub[0]
	},
	decorators: (Story) => (<div style={{ width: '500px' }}>
		<Story />
	</div>),
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	}
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const DESKTOP: Story = {};

export const TABLET: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'tablet'
		}
	}
};

export const LARGEMOBILE: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'mobile2'
		}
	}
};

export const SMALLMOBILE: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'mobile1'
		}
	}
};

