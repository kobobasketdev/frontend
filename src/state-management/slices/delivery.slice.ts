import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "#state-management/store.ts";
import { IDeliveryState } from "#utils/index.ts";

const initialDeliveryState: IDeliveryState = {
	country: 'canada',
	code: 'CA'
};

export const deliverySlice = createSlice({
	name: 'delivery',
	initialState: initialDeliveryState,
	reducers: {
		setDeliveryLocation: (state, action: PayloadAction<IDeliveryState>) => {
			state.country = action.payload.country;
			state.code = action.payload.code;
		},
	}
});

export default deliverySlice.reducer;
export const { setDeliveryLocation } = deliverySlice.actions;

export const selectDeliverLocation = createSelector(
	[ (state: RootState) => state ],
	(state) => state.delivery
);