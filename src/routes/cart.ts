import Cart from '#page/Cart.tsx';
import { setActiveMenu, setShowMenu, setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.CART)({
	beforeLoad: () => {
		store.dispatch(setActiveMenu(0));
		store.dispatch(setShowMenu(false));
		store.dispatch(setIsShowheaderContainer(true));
      
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: Cart,
});

