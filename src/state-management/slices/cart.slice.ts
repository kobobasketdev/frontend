import { TItem } from "#component/types/index.js";
import type { RootState } from "#state-management/store.ts";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

export type TCartItems = {
	item: TItem,
	variant: number,
	quantity: number
};

export type TCartMap = {
	[productId_Variant: string]: TCartItems
};

type TCartState = {
	isOpen: boolean,
	cartItemsMap: TCartMap,
	showCheckoutSignIn: boolean,
	popupItem: TItem | null
};

type TRemoveItem = {
	productId_Variant: string
};

type TUpdateCardItem = {
	productId_Variant: string,
	quantity: number
};

const initialCartState: TCartState = {
	isOpen: false,
	cartItemsMap: getFromLocalStorage('cart') as TCartMap,
	showCheckoutSignIn: false,
	popupItem: null
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		closeCart: state => {
			state.isOpen = false;
		},
		openCart: state => {
			state.isOpen = true;
		},
		addItemToCart: (state, action: PayloadAction<TCartItems>) => {
			const cartId = `${action.payload.item.id}-${action.payload.variant}`;
			const cartProductExist = state.cartItemsMap[`${action.payload.item.id}-${action.payload.variant}`];
			if(!cartProductExist) {
				state.cartItemsMap[cartId] = action.payload;
			}
			else {
				state.cartItemsMap[cartId].quantity += action.payload.quantity; 
			}
			saveToLocalStorage('cart', state.cartItemsMap);
		},
		removeItemFromCart: (state, action: PayloadAction<TRemoveItem>) => {
			delete state.cartItemsMap[action.payload.productId_Variant];
			saveToLocalStorage('cart', state.cartItemsMap);
		},
		updateCartItem: (state, action: PayloadAction<TUpdateCardItem>) => {
			state.cartItemsMap[action.payload.productId_Variant].quantity = action.payload.quantity;
			saveToLocalStorage('cart', state.cartItemsMap);
		},
		setAddToCartPopup: (state, action: PayloadAction<TItem | null>) => {
			state.popupItem = action.payload;
		},
	}
});

export default cartSlice.reducer;
export const { openCart, closeCart, 
	addItemToCart, removeItemFromCart, 
	updateCartItem, setAddToCartPopup 
} = cartSlice.actions;

export const selectCartVisibile = createSelector(
	[(state: RootState) => state.cart],
	(cart) => cart.isOpen
);

export const selectCartItems = createSelector(
	[ (state: RootState) => state.cart],
	(cart) => cart.cartItemsMap
);

export const selectCartItemsCount = createSelector(
	[ (state: RootState) => state.cart.cartItemsMap],
	(cartItems) => Object.keys(cartItems).length
);

export const selectPopupAddToCartItem = createSelector(
	[ (state: RootState) => state.cart],
	(cart) => cart.popupItem
);