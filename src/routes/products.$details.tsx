import ProductDisplay from '#page/ProductDisplay.tsx';
import { setShowMenu } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { items } from '#testData.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	const { item } = Route.useLoaderData();
	return <ProductDisplay item={item} />;
};

export const Route = createFileRoute(RoutePath.PRODUCT_DISPLAY)({
	beforeLoad: () => {
		store.dispatch(setShowMenu(false));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	loader: ()=> {
		return { item: items[0] };
	},
	component: RouteComponent
});


