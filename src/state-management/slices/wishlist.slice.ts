import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { TItem } from "#component/types/index.js";
import { RootState } from "#state-management/store.ts";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

export type TWishlist = {
	[productId: string]: TItem
};

interface IWishlistState {
	wishlistItems: TWishlist,
}

const initialState : IWishlistState= {
	wishlistItems: getFromLocalStorage('wishlist') as TWishlist
};

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		addToWishlist: (state, action: PayloadAction<TItem>) => {
			state.wishlistItems[""+action.payload.id] =  action.payload;
			saveToLocalStorage('wishlist', state.wishlistItems);
		},
		removeFromWishlist: (state, action: PayloadAction<string>) => {
			delete state.wishlistItems[action.payload];
			saveToLocalStorage('wishlist', state.wishlistItems);
		}
	}
});

export default wishlistSlice.reducer;
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = createSelector(
	[
		(state: RootState) => state.wishlist
	],
	(wishlist) => wishlist.wishlistItems
);

export const selectWishlistCount = createSelector(
	[ (state: RootState) => state.wishlist],
	(wishlist) => Object.keys(wishlist.wishlistItems).length
);