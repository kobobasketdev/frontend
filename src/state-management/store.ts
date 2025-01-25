import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currency.slice";
import deliveryReducer from "./slices/delivery.slice";
import cartReducer from "./slices/cart.slice";
import wishlistReducer from "./slices/wishlist.slice";
import activeMenuReducer from './slices/active-menu.slice';

export const store = configureStore({
	reducer: {
		currency: currencyReducer,
		delivery: deliveryReducer,
		cart: cartReducer,
		wishlist: wishlistReducer,
		menu: activeMenuReducer
	}
});

export type AppStore = typeof store; 
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];