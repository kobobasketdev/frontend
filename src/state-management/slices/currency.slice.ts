import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "#state-management/store.ts";

export interface ICurrency {
	name: string,
	symbol: string,
	code: string
};

export type TCountryCurrency = {
	[country: string]: ICurrency
};

type TCurrencyState = {
	currencies: TCountryCurrency
};

type TUpdateCurrency = {
	country: string,
	currency: ICurrency
};

export const initialCurrencyState: TCurrencyState = {
	currencies: {
		"canada": { name: 'Canadian Dollar', code: 'CAD', symbol: '$' },
		"united states": { name: 'United States Dollar', code: 'USD', symbol: '$' },
		"united kingdom": { name: 'Pounds Sterling', code: 'GBP', symbol: '£' },
		"germany": { name: 'Euro', code: 'EUR', symbol: '€' },
		"china": { name: 'Chinese Yuan', code: 'CNY', symbol: '¥' },
		"france": { name: 'Euro', code: 'EUR', symbol: '€' },
		"australia ": { name: 'Australian Dollar', code: 'AUD', symbol: '$' },
		"finland": { name: 'Euro', code: 'EUR', symbol: '€' },
	}
};

export const currencySlice = createSlice({
	name: "currency",
	initialState: initialCurrencyState,
	reducers: {
		loadCurrency: (state, action: PayloadAction<TCountryCurrency>) => {
			state.currencies = action.payload;
		},
		updateCurrency: (state, action: PayloadAction<TUpdateCurrency>) => {
			const { country, currency } = action.payload;
			state.currencies[country] = currency;
		}
	}
});

export default currencySlice.reducer;
export const { loadCurrency, updateCurrency } = currencySlice.actions;

export const selectAllSupportedCurrency = createSelector(
	[(state: RootState) => state.currency],
	(currency) => currency.currencies
);

export const selectCurrency = createSelector(
	[
		(state: RootState) => state.currency.currencies,
		(_state: RootState, country: string) => country,
	],
	(currencies, country) => currencies[country]
);