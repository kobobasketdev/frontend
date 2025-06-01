import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "#state-management/store.ts";
import { CountryType } from "#utils/index.ts";

export const extractsupportedCountries = (supportedCountries: TSupportedCountry, selectedCountryCode?: string) => {
	const countries = Object.keys(supportedCountries.countries);
	const extractedsupportedCountries: IDeliveryState[] = [];
	countries.forEach(countryCode => {
		if (countryCode !== selectedCountryCode) {
			extractedsupportedCountries.push({ code: countryCode, country: supportedCountries.countries[countryCode].label });
		}
	});
	return extractedsupportedCountries;
};
export interface IDeliveryState {
	country: string,
	code: string
};

export type TCountry = {
	[country: string]: CountryType
};


export type TSupportedCountry = {
	countries: TCountry
};

const initialDeliveryState: IDeliveryState = {
	country: 'canada',
	code: 'CA'
};

export const initialSupportedCountries: TSupportedCountry = {
	countries: {
		"CA": {
			code: 'CA',
			label: 'Canada',
			phone: '1',
			suggested: true,
		},
		"US": {
			code: 'US',
			label: 'United States',
			phone: '1',
			suggested: true,
		},
		'AE': {
			code: 'AE',
			label: 'United Arab Emirates',
			phone: '971',
			suggested: true,
		},
		'HK':{ code: 'HK', label: 'Hong Kong', phone: '852' },
		"GB": { code: 'GB', label: 'United Kingdom', phone: '44' },
		"DE": {
			code: 'DE',
			label: 'Germany',
			phone: '49',
			suggested: true,
		},
		"CN": { code: 'CN', label: 'China', phone: '86' },
		"FR": {
			code: 'FR',
			label: 'France',
			phone: '33',
			suggested: true,
		},
		"AU": {
			code: 'AU',
			label: 'Australia',
			phone: '61',
			suggested: true,
		},
	}
};

export const deliverySlice = createSlice({
	name: 'delivery',
	initialState: initialDeliveryState,
	reducers: {
		setDeliveryLocation: (state, action: PayloadAction<IDeliveryState>) => {
			state.country = action.payload.country;
			state.code = action.payload.code;
		}
	}
});

export default deliverySlice.reducer;
export const { setDeliveryLocation } = deliverySlice.actions;

export const selectDeliverLocation = createSelector(
	[ (state: RootState) => state ],
	(state) => state.delivery
);