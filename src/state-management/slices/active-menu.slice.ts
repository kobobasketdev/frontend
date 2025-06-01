import { RootState } from "#state-management/store.ts";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productCategories } from "../utils";
import { TProductCategory } from "#component/types/index.js";


const initialState = { 
	activeMenu: 0, 
	showMenu: true, 
	showHeader: true, 
	showHeaderContainer: true, 
	routeRedirect: '', 
	productCategories: [...productCategories] as TProductCategory[] 
};

export const activeMenuSlice = createSlice({
	name: 'active-menu',
	initialState,
	reducers: {
		setActiveMenu: (state, action: PayloadAction<number>) => {
			state.activeMenu = action.payload;
		},
		setShowMenu: (state, action: PayloadAction<boolean>) => {
			state.showMenu = action.payload;
		}, 
		setShowHeader: (state, action: PayloadAction<boolean>) => {
			state.showHeader = action.payload;
		},
		setIsShowheaderContainer: (state, action: PayloadAction<boolean>) => {
			state.showHeaderContainer = action.payload;
		},
		setRouteRedirect: (state, action: PayloadAction<string>) => {
			state.routeRedirect = action.payload;
		},
		setCategoryNames: (state, action: PayloadAction<TProductCategory[]>) => {
			state.productCategories = [productCategories[0], ...action.payload];
		}
	}
});

export default activeMenuSlice.reducer;
export const { 
	setActiveMenu, setShowMenu, 
	setShowHeader, setIsShowheaderContainer,
	setRouteRedirect, setCategoryNames 
} = activeMenuSlice.actions;

export const selectActiveMenu = (state: RootState) => state.menu.activeMenu;
export const selectIsShowMenu = (state: RootState) => state.menu.showMenu;
export const selectIsShowHeader = (state: RootState) => state.menu.showHeader;
export const selectIsShowheaderContainer = (state: RootState) => state.menu.showHeaderContainer;
export const selectRouteRedirect = (state: RootState) => state.menu.routeRedirect;
export const selectProductCategories = createSelector(
	[ (state: RootState) => state.menu ],
	(menu) => menu.productCategories
);