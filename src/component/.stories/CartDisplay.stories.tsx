import { Meta, StoryObj } from "@storybook/react";
import CartDisplay from '../CartDisplay';
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

const meta: Meta<typeof CartDisplay> = {
	component: CartDisplay,
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
type Story = StoryObj<typeof CartDisplay>;

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

