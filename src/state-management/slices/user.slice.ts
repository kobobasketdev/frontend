import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "#state-management/store.ts";

interface IUser {
	email: string,
	firstName: string,
	lastName: string,
	phone: number
}
type TUserState = {
	currentUser: IUser | null
};
const initialState: TUserState = {
	currentUser: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<IUser>) => {
			state.currentUser = action.payload;
		}
	}
});

export default userSlice.reducer;

export const { setCurrentUser } = userSlice.actions;

export const selectLoginUserEmail = createSelector(
	[(state: RootState) => state.user],
	(user) => user.currentUser?.email
);