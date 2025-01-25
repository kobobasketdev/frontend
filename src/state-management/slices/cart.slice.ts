import { TItem } from "#component/types/index.js";
import type { RootState } from "#state-management/store.ts";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

export type TCartItems = {
	item: TItem,
	quantity: number
};

export type TCartMap = {
	[productId: string]: TCartItems
};

type TCartState = {
	isOpen: boolean,
	cartItemsMap: TCartMap
};

type TRemoveItem = {
	productId: number
};

type TUpdateCardItem = {
	productId: number,
	quantity: number
};

const initialCartState: TCartState = {
	isOpen: false,
	cartItemsMap: getFromLocalStorage('cart') as TCartMap
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
			const cartProductExist = state.cartItemsMap[action.payload.item.productId];
			if(!cartProductExist) {
				state.cartItemsMap[action.payload.item.productId] = action.payload;
			}
			else {
				state.cartItemsMap[action.payload.item.productId].quantity += action.payload.quantity; 
			}
			saveToLocalStorage('cart', state.cartItemsMap);
		},
		removeItemFromCart: (state, action: PayloadAction<TRemoveItem>) => {
			delete state.cartItemsMap[action.payload.productId];
			saveToLocalStorage('cart', state.cartItemsMap);
		},
		updateCartItem: (state, action: PayloadAction<TUpdateCardItem>) => {
			state.cartItemsMap[action.payload.productId].quantity = action.payload.quantity;
			saveToLocalStorage('cart', state.cartItemsMap);
		}
	}
});

export default cartSlice.reducer;
export const { openCart, closeCart, addItemToCart, removeItemFromCart, updateCartItem } = cartSlice.actions;

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