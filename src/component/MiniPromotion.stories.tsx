import { Meta, StoryObj } from "@storybook/react";
import MiniPromotion from "./MiniPromotion";
import { TMiniGrid, TMiniScroll } from ".";
import { DEFAULT_VIEWPORT } from "@storybook/addon-viewport";

const meta: Meta<typeof MiniPromotion> = {
	component: MiniPromotion,
	parameters: {
		viewport: {
			defaultViewport: DEFAULT_VIEWPORT
		}
	},
	args: {
		title: 'Best sellers in Food', 
		type: ({ spacing: 2, size: { height: '120px', width: '120px' }, }) as TMiniScroll, 
		items: [
			{
				productId: 1, 
				name: 'test image', 
				isWishListItem: false,
				weight: '2kg', 
				price: 22, 
				locationPrice: 35, 
				images: [""], 
				promotion: { 
					promoName: 'Best seller', 
					promoPrice: 19 
				}
			},
			{
				productId: 2, 
				name: 'test image 2', 
				weight: '3kg', 
				isWishListItem: false,
				price: 15, 
				locationPrice: 30, 
				images: [""], 
				promotion: { 
					promoName: 'Best seller', 
					promoPrice: 10 
				}
			},
			{
				productId: 3, 
				isWishListItem: false,
				name: 'test image 4', 
				weight: '500g', 
				price: 29, 
				locationPrice: 35, 
				images: [""], 
			}
		], 
		bgColor: '#EFEBE9',
		showPrice :  true, 
		isCircularImage : false, 
	}
};

export default meta;
type Story = StoryObj<typeof MiniPromotion>;

export const DESKTOP_SCROLL: Story = {
	decorators: (Story) => (<div style={{ width: '350px' }}><Story /></div>)
};

export const TABLET_SCROLL: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	decorators: (Story) => (<div style={{ width: '350px' }}><Story /></div>)

};

export const LARGEMOBILE_SCROLL: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	}
};

export const SMALLMOBILE_SCROLL: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	}
};

const circleArgs: { isCircularImage: boolean, showPrice: boolean, type: TMiniScroll }  = {
	isCircularImage : true,
	showPrice :  false, 
	type: ({ name: 'scroll', spacing: 2, size: { height: '120px', width: '120px' }, }), 
};
export const DESKTOP_SCROLL_CIRCLE: Story = {
	decorators: (Story) => (<div style={{ width: '350px' }}><Story /></div>),
	args: {
		...circleArgs
	}
};

export const TABLET_SCROLL_CIRCLE: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	decorators: (Story) => (<div style={{ width: '350px' }}><Story /></div>),
	args: {
		...circleArgs
	}
};

export const LARGEMOBILE_SCROLL_CIRCLE: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: {
		...circleArgs
	}
};

export const SMALLMOBILE_SCROLL_CIRCLE: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: {
		...circleArgs
	}
};

const gridArgs: { showPrice: boolean, type: TMiniGrid } = {
	showPrice :  false, 
	type: ({ name: 'grid', spacing: 2, size: { height: '100px', width: '100px' }, column: 1 }) , 
};
export const DESKTOP_GRID: Story = {
	decorators: (Story) => (<div style={{ width: '350px' }}><Story /></div>),
	args: {
		...gridArgs
	}
};

export const TABLET_GRID: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'tablet'
		}
	},
	decorators: (Story) => (<div style={{ width: '350px' }}><Story /></div>),
	args: {
		...gridArgs
	}
};

export const LARGEMOBILE_GRID: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile2'
		}
	},
	args: {
		...gridArgs
	}
};

export const SMALLMOBILE_GRID: Story = {
	parameters: {
		viewport:{
			defaultViewport: 'mobile1'
		}
	},
	args: {
		...gridArgs
	}
};