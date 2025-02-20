import { createFileRoute } from '@tanstack/react-router';
import MobileReview from '#page/MobileReview.tsx';
import { store } from '#state-management/store.ts';
import { setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { RoutePath } from '#utils/route.ts';
import { items as itemsStub, reviews as reviewsStub } from '#testData.ts';
export const Route = createFileRoute(RoutePath.INTERNAL_MOBILEREVIEW)({
	beforeLoad: () => {
		store.dispatch(setIsShowheaderContainer(false));
	},
	loader: () => {
		return { item: itemsStub[0], reviews: reviewsStub };
	},
	component: MobileReview,
});
