import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "#state-management/store.ts";
import { TReview } from "#component/types/index.js";

type TReviewImage = Pick<TReview, 'id' | 'images'>;
type TReviewState = {
	reviewToView:  TReviewImage | null,
	isWebReviewOpen: boolean
};

const initialState: TReviewState = {
	reviewToView: null,
	isWebReviewOpen: false
};

const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {
		setReviewImageToView: (state, action: PayloadAction<TReviewImage | null>) => {
			state.reviewToView = action.payload;
		},
		setIsOpenWebReview: (state, action: PayloadAction<boolean>) => {
			state.isWebReviewOpen = action.payload;
		}
	}
});

export default reviewSlice.reducer;

export const { setReviewImageToView, setIsOpenWebReview } = reviewSlice.actions;

export const selectReviewToView = createSelector(
	[(state: RootState) => state.review],
	(review) => review.reviewToView
);

export const selectIsWebReviewOpen = createSelector(
	[(state: RootState) => state.review],
	(review) => review.isWebReviewOpen
);