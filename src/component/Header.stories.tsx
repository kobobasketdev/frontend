import { Meta, StoryObj } from '@storybook/react';
import { DEFAULT_VIEWPORT } from '@storybook/addon-viewport';
import Header from './Header';

const meta: Meta<typeof Header> = {
	component: Header,
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	}
};

export default meta;

type Story = StoryObj<typeof Header>;

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