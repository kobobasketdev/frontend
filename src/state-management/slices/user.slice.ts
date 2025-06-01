import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "#state-management/store.ts";
import { IResidentialAddress, IUser } from "#component/types/index.js";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

export interface ICurrency {
	name: string,
	symbol: string,
	code: string
};

export interface ILocationCurrency extends ICurrency {
	country: string,
};


type TUserState = {
	currentUser: IUser | null,
	token: string | null,
	userLocationCurrency: ILocationCurrency 
};

const user: IUser = getFromLocalStorage('user');
const initialState: TUserState = {
	currentUser: user.email ? user : null,
	token: localStorage.getItem('access_token') || null,
	userLocationCurrency: {
		code: 'USD', symbol: '$',
		country: '',
		name: 'United States Dollar'
	}
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<IUser>) => {
			state.currentUser = action.payload;
			saveToLocalStorage('user', action.payload);
		},
		setAuthToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			localStorage.setItem('access_token', action.payload);
		},
		updateLoginUser: (state, action: PayloadAction<IUser>) => {
			const currentUser = { ...state.currentUser, ...action.payload };
			state.currentUser = currentUser;
			saveToLocalStorage('user', currentUser);
		},
		addResidenceAddress: (state, action: PayloadAction<IResidentialAddress>) => {
			const currentAddresses = state.currentUser?.residentialAddresses || [];
			const updateUserInfor: IUser = { ...state.currentUser, residentialAddresses: [ ...currentAddresses, { ...action.payload }] };
			state.currentUser = updateUserInfor;
			saveToLocalStorage('user', updateUserInfor);
		},
		updateResidenceAddress: (state, action: PayloadAction<IResidentialAddress>) => {
			const currentUser = state.currentUser;
			if(currentUser?.residentialAddresses) {
				const addressToUpdateIndex = currentUser.residentialAddresses.findIndex(address => address.id === action.payload.id);
				currentUser.residentialAddresses[addressToUpdateIndex] = action.payload;
				state.currentUser = currentUser;
				saveToLocalStorage('user', currentUser);
			}
		},
		deleteShippingAddress: (state, action: PayloadAction<string>) => {
			const currentUser = state.currentUser;
			if(currentUser?.defaultAddressId === action.payload) {
				delete currentUser.defaultAddressId;
			}

			if(currentUser?.residentialAddresses) {
				const newResidentialAddresses = currentUser.residentialAddresses.filter(address => address.id !== action.payload) || [];
				currentUser.residentialAddresses = newResidentialAddresses;
			}

			state.currentUser = currentUser;
			saveToLocalStorage('user', currentUser);
		},
		signOut: (state) => {
			state.token = null;
			state.currentUser= null;
			localStorage.removeItem('user');
			localStorage.removeItem('access_token');
		}
	}
});

export default userSlice.reducer;

export const { 
	setCurrentUser, setAuthToken, signOut, 
	updateLoginUser, addResidenceAddress,
	updateResidenceAddress, deleteShippingAddress 
} = userSlice.actions;

export const selectLoginUserEmail = createSelector(
	[(state: RootState) => state.user],
	(user) => user.currentUser?.email
);

export const selectLoginUserId = createSelector(
	[(state: RootState) => state.user],
	(user) => user.currentUser?.id
);

export const selectLoginUserFirstname = createSelector(
	[(state: RootState) => state.user],
	(user) => user.currentUser?.first_name
);

export const selectLoginUserFullname = createSelector(
	[(state: RootState) => state.user],
	(user) => user.currentUser?.first_name+' '+user.currentUser?.last_name
);

export const selectResidentialAddresses = createSelector(
	[(state: RootState) => state.user.currentUser],
	(user) => user?.residentialAddresses || []
);

export const selectDefaultAddressId = createSelector(
	[(state: RootState) => state.user.currentUser],
	(user) => user?.defaultAddressId
);