export type CategorySelection = { id: number, name: string };
export type TPromotionInfo = { promoName: string, promoPrice: number };
export type TAvatarSizing = { height?: string, width?: string };
export type TMiniGrid = { name: 'grid', spacing: number, column: number, size?: TAvatarSizing };
export type TMiniScroll = { name: 'scroll', spacing: number, size?: TAvatarSizing, scollBy?: number };
export type TProductWeight = { value: number, measurement: string };
export type TProductVariant = {
	size?: string,
	weight: TProductWeight,
	price: number,
	promotion?: TPromotionInfo,
	locationPrice?: number
};
export type TItem = { 
	productId: number, 
	name: string,
	weight: TProductWeight, 
	category?: string,
	productDescription?: string,
	price: number, 
	locationPrice: number, 
	isWishListItem: boolean, 
	productDetails?: string,
	rating?: number,
	reviewCount?: number,
	soldCount?: number,
	likeCount?: number,
	images: string[], 
	bestSellerCategory?: string
	promotion?: TPromotionInfo,
	variations: TProductVariant[],
	ratingBank?: {
		[x: string]: {
			percent: number,
			reviewCount: number
		}
	}
};
export type TReview = {
	id: string,
	userAvatar?: string,
	name: string,
	date: string,
	rating: number,
	heading: string,
	content: string,
	images?: string[],
	helpfulCount?: number
};

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
	showSavedAmount?: boolean,
	showShareProduct?: boolean,
	disableProductSlider?: boolean,
	disableWishlisting?: boolean
}