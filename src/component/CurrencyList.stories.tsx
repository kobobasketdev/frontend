import { Meta, StoryObj } from "@storybook/react";
import CurrencyList from "./CurrencyList";
import { fn } from '@storybook/test';
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

const meta: Meta<typeof CurrencyList> = {
	component: CurrencyList,
	args: {
		currencyList: [
			{ id: 1, name: 'Canadian Dollar', currency: 'CAD $', country: 'Canada' }, 
			{ id: 2, name: 'United States Dollar', currency: 'USD $', country: 'United States' }, 
			{ id: 3, name: 'Pounds Sterling', currency: 'GBP £', country: 'United Kingdom' }, 
			{ id: 4, name: 'Euro', currency: 'EUR €', country: 'Germany' },
			{ id: 5, name: 'United States Dollar', currency: 'USD $', country: 'United States' }, 
			{ id: 6, name: 'Pounds Sterling', currency: 'GBP £', country: 'United Kingdom' }, 
			{ id: 7, name: 'Euro', currency: 'EUR €', country: 'Germany' }
		], 
		selection : { name: 'Canadian Dollar', country: 'Canada',code: 'CAD', symbol: '$' },
		open: true, 
		isLocationBased: true,
		handleChooseSelection: fn(),
		handleClose: fn()
	},
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	}
};

export default meta;
type Story = StoryObj<typeof CurrencyList>;

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

