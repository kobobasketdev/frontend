export type CurrencySelection = { id: number, name: string, currency: string, country: string  };
export type CategorySelection = { id: number, name: string };
export type TPromotionInfo = { promoName: string, promoPrice: number };
export type TAvatarSizing = { height?: string, width?: string };
export type TMiniGrid = { name: 'grid', spacing: number, column: number, size?: TAvatarSizing };
export type TMiniScroll = { name: 'scroll', spacing: number, size?: TAvatarSizing, scollBy?: number };
export type TItem = { productId: number, name: string, weight: string, price: number, locationPrice: number, isWishListItem: boolean, images: string[], promotion?: TPromotionInfo };
export type TMiniPromotionProps = { 
	title: string, 
	width: number | string,
	type: TMiniGrid | TMiniScroll, 
	items: TItem[], 
	bgColor: string, 
	showPrice?: boolean,
	isCircularImage?:boolean,
	dynamicClass?: boolean, 
	height?: string
};
export type TScrollOrientation = 'horizontal' | 'vertical';
export type TScrollNavigationMode = {
	float: boolean,
	id: number,
	orientation: TScrollOrientation,
};

export interface IProductItemProps{ 
	item: TItem, 
	showPrice: boolean, 
	isCircularImage: boolean,
	fullDetails?: boolean,
	fontWeight?: string,
	fontSize?: string,
	contentArea?: string,
	showSavedAmount?: boolean
}