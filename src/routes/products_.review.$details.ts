import { createFileRoute } from '@tanstack/react-router';
import MobileReview from '#page/MobileReview.tsx';
import { store } from '#state-management/store.ts';
import { setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { RoutePath } from '#utils/route.ts';
import { items as itemsStub, reviews as reviewsStub } from '#testData.ts';
import { getProductReviews } from '#hooks/query/product';
export const Route = createFileRoute(RoutePath.INTERNAL_MOBILEREVIEW)({
	beforeLoad: () => {
		store.dispatch(setIsShowheaderContainer(false));
	},
	loader: ({ context: { queryClient }, params }) => {
		queryClient.prefetchQuery(getProductReviews({ page: 1, productId: params.details }));
		// return queryClient.ensureQueryData(getProductById({ productId: +params.details }));
		return { item: itemsStub[0], reviews: reviewsStub };
	},
	component: MobileReview,
});
