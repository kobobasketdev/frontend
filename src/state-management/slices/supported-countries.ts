import { RootState } from "#state-management/store.ts";
import { IDeliveryState, TCountry } from "#utils/index.ts";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";


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

export type TSupportedCountry = {
	countries: TCountry
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
	}
};

export const supportedCountries = createSlice({
	name: 'supported-countries',
	initialState: initialSupportedCountries,
	reducers: {
		setSupportedCountries: (state, action: PayloadAction<TCountry>) => {
			state.countries = action.payload;
		},
	}
});

export default supportedCountries.reducer;
export const { setSupportedCountries } = supportedCountries.actions;

export const selectSupportedCountries = createSelector(
	[ (state: RootState) => state ],
	(state) => state.supportedcountries
);