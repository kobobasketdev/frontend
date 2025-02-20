import ProductDisplay from '#page/ProductDisplay.tsx';
import { setActiveMenu, setIsShowheaderContainer, setShowMenu } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { items as itemsStub } from '#testData.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	const { item } = Route.useLoaderData();
	return <ProductDisplay item={item} />;
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
	loader: ()=> {
		return { item: itemsStub[0] };
	},
	component: RouteComponent
});


