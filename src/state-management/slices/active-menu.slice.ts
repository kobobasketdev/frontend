import { RootState } from "#state-management/store.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export const activeMenuSlice = createSlice({
	name: 'active-menu',
	initialState: { activeMenu: 0, showMenu: true, showHeader: true, showHeaderContainer: true },
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
		}
	}
});

export default activeMenuSlice.reducer;
export const { setActiveMenu, setShowMenu, setShowHeader, setIsShowheaderContainer } = activeMenuSlice.actions;

export const selectActiveMenu = (state: RootState) => state.menu.activeMenu;
export const selectIsShowMenu = (state: RootState) => state.menu.showMenu;
export const selectIsShowHeader = (state: RootState) => state.menu.showHeader;
export const selectIsShowheaderContainer = (state: RootState) => state.menu.showHeaderContainer;