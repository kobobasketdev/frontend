import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICurrency } from "./currency.slice";
import type { RootState } from "#state-management/store.ts";

export interface IDeliveryState extends ICurrency {
	country: string,
};
const initialDeliveryState: IDeliveryState = {
	country: 'canada',
	name: 'Canadian Dollar', 
	code: 'CAD', 
	symbol: '$'
};

export const deliverySlice = createSlice({
	name: 'delivery',
	initialState: initialDeliveryState,
	reducers: {
		setDeliveryLocation: (state, action: PayloadAction<IDeliveryState>) => {
			state.country = action.payload.country;
			state.code = action.payload.code;
			state.name = action.payload.name;
			state.symbol = action.payload.symbol;
		}
	}
});

export default deliverySlice.reducer;
export const { setDeliveryLocation } = deliverySlice.actions;

export const selectDeliverLocation = createSelector(
	[ (state: RootState) => state ],
	(state) => state.delivery
);