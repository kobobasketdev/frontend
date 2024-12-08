import { Grid2Props, StackProps } from "@mui/material";

export type CurrencySelection = { id: number, name: string, currency: string, country: string  };
export type CategorySelection = { id: number, name: string };
export type TPromotionInfo = { promoName: string, promoPrice: number };
export type TAvatarSizing = { height?: number, width?: number };
export type TMiniGrid = { name: 'grid', spacing: number, column: number, size: TAvatarSizing };
export type TMiniScroll = { name: 'scroll', spacing: number, size: TAvatarSizing, contentViewArea?: string, scollBy?: number };
export type TItem = { productId: number, name: string, weight: string, price: number, locationPrice: number, isWishListItem: boolean, images: string[], promotion?: TPromotionInfo };
export type TMiniPromotionProps = { 
	title: string, 
	width: number | string,
	type: TMiniGrid | TMiniScroll, 
	items: TItem[], 
	bgColor: string, 
	showPrice?: boolean,
	isCircularImage?:boolean 
};
export type TScrollOrientation = 'horizontal' | 'vertical';
export type TScrollNavigationMode = {
	float: boolean,
	id: number,
	orientation: TScrollOrientation,
	floatPosition?: string
};

export interface IProductItemProps extends Grid2Props{ 
	item: TItem, 
	showPrice: boolean, 
	isCircularImage: boolean,
	imageSize?: TAvatarSizing,
	fullDetails?: boolean,
	fontWeight?: string,
	fontSize?: string,
	contentArea?: string,
	showSavedAmount?: boolean
}