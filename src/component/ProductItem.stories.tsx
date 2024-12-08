import { Meta, StoryObj } from "@storybook/react";
import ProductItem from "./ProductItem";
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

const meta: Meta<typeof ProductItem> = {
	component: ProductItem,
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	},
	decorators: (Story) => (<div style={{ width: 'fit-content' }}><Story /></div>),
	args: {
		item : { productId: 5, 
			name: 'White Ijebu Garri', 
			weight: '3kg', 
			price: 15, 
			isWishListItem: false,
			locationPrice: 30, 
			images: [""], 
			promotion: { 
				promoName: 'Best seller', 
				promoPrice: 10
			} }, 
		showPrice: true, 
		isCircularImage: false, 
		imageSize: { width: 243 }, 
		fullDetails: true,
		fontSize: '18px',
		fontWeight: '700',
	}
};



export default meta;
type Story = StoryObj<typeof ProductItem>;

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