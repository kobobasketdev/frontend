import { TItem } from '#component/types/index.js';
import { items as itemStubs } from '#testData.ts';
import { getProductById } from '#hooks/query/product';
import ProductDisplay from '#page/ProductDisplay.tsx';
import { setActiveMenu, setIsShowheaderContainer, setShowMenu } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	// const { data } = Route.useLoaderData();
	// const item = data.item as TItem;
	return <ProductDisplay item={itemStubs[0]} />;
};

export const Route = createFileRoute(RoutePath.PRODUCT_DISPLAY)({
	beforeLoad: () => {
		store.dispatch(setShowMenu(false));
		store.dispatch(setActiveMenu(-1));
		store.dispatch(setIsShowheaderContainer(true));

		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	loader: async ({ params, context: { queryClient } }) => {
		// return queryClient.ensureQueryData(getProductById({ productId: +params.details }));
	},
	component: RouteComponent
});


