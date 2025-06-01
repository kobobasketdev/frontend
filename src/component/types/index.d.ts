export type CategorySelection = { id: number, name: string };
export type TPromotionInfo = { id: number, promotionName: string };
export type TAvatarSizing = { height?: string, width?: string };
export type TMiniGrid = { name: 'grid', spacing: number, column: number, size?: TAvatarSizing };
export type TMiniScroll = { name: 'scroll', spacing: number, size?: TAvatarSizing, scollBy?: number };
export type TProductVariant = {
	size?: string,
	weight: number,
	measurement?: string
	price: {
		default: number,
		converted: number,
		currency: string
	},
	marketPrice: {
		default: number,
		converted: number,
		currency: string
	}
};

export type TProductCategory = {
	id: number,
	name: string,
	description: string,
	status: 'active' | 'inactive',
	image?: string
};

export type TItemImage = {
	id: number,
	url: string,
};

export type TItem = { 
	id: number, 
	name: string,
	productCategoryId?: string,
	description?: string,
	isWishListItem: boolean, 
	productDetails?: string,
	category: {
		name: string
	}
	rating?: number,
	reviewCount?: number,
	soldCount?: number,
	likeCount?: number,
	images: TItemImage[], 
	isBestSeller?: boolean,
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

export enum MiniPromoTitle {
	BEST_SELLER,
	FREQUENTLY_BROUGHT
}

export type TMiniPromotionProps = { 
	width: number | string,
	type: TMiniGrid | TMiniScroll, 
	itemCount?: number,
	categoryInfo: { name: string, id: number, isPromotion?: boolean },
	bgColor: string, 
	showPrice?: boolean,
	isCircularImage?:boolean,
	dynamicClass?: boolean, 
	height?: string,
	title?: string
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
	disableWishlisting?: boolean,
}

export interface ICreateAccount {
	first_name?: string,
	last_name?: string,
	email: string,
	password: string,
	type: 'user'
};

export interface IOtherShippingInfo {
	province: string,
	city: string,
	postalCode: string,
	phone: string,
	address: string
};

export type TShippingKeys = keyof IOtherShippingInfo;
export interface IShippingAddress extends IOtherShippingInfo { 
	country: string 
};

export interface IResidentialAddress extends IShippingAddress {
	firstName: string,
	lastName: string,
	id: string
}

export interface IShippingAddressState extends IShippingAddress {
	firstName?: string,
	lastName?: string
}

export type TShippingErrorKey = keyof IShippingAddressState;
export type TAddressToEdit = IShippingAddressState & { isDefault?: boolean, isNew?: boolean, id?: string };

export interface INotificationList {
	title: string,
	id: string
}

export interface IUser extends Partial<Omit<ICreateAccount, 'password'>> {
	id?: string,
	phoneNumber?: string,
	photo?: FileList,
	gender?: string,
	maritalStatus?: string,
	country?: string,
	city?: string,
	state?: string,
	defaultAddressId?: string,
	residentialAddresses?: IResidentialAddress[],
	location?: string
}

export type TEmailRegistration = {
	email: string,
	password: string,
	isAgreed: boolean
};

export type TOrderItem = {
	id: string,
	name: string,
	image?: string,
	weight: string,
	quantity: number,
	price: number, 
	isReviewed?: boolean
};

export type TOrder = {
	items: TOrderItem[],
	userId: string,
	status: number,
	shippingFee: number,
	orderDate: Date,
	deliveryDate: Date,
	shippingAddress: Omit<IResidentialAddress, 'id'>,
	settlementCurrency: string
};

export type TCreateOrder = Omit<TOrder, 'orderDate' | 'deliveryDate'> & { payformeEmail: string | null };

export type TNewOrder = Omit<TOrder, 'deliveryDate' | 'shippingAddress'> & { shippingAddress: IResidentialAddress };

export type TDeliveredOrder = Omit<TOrder, 'orderDate' | 'shippingAddress'> & { shippingAddress: IResidentialAddress, id: string };

