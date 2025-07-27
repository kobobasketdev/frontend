import { configureStore } from "@reduxjs/toolkit";
import deliveryReducer from "./slices/delivery.slice";
import cartReducer from "./slices/cart.slice";
import wishlistReducer from "./slices/wishlist.slice";
import activeMenuReducer from './slices/active-menu.slice';
import reviewReducer from './slices/review.slice';
import userReducer from './slices/user.slice';
import supportedCountries from "./slices/supported-countries";

export const store = configureStore({
	reducer: {
		delivery: deliveryReducer,
		cart: cartReducer,
		wishlist: wishlistReducer,
		menu: activeMenuReducer,
		review: reviewReducer,
		user: userReducer,
		supportedcountries: supportedCountries
	}
});

export type AppStore = typeof store; 
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];