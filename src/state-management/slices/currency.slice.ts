import { createSlice } from "@reduxjs/toolkit";

type TCurrency = {
	name: string,
	symbol: string,
    abrevation:
};

type TCountryCurrency = {
	[country: string]: TCurrency
};

const initialCurrencyState: TCountryCurrency = {
    canada: {name: "Canadian Dollar", symbol: "$", abv: "CAD"}
}