import WishlistDisplay from '#page/WishlistDisplay.tsx';
import { setActiveMenu, setShowMenu } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.WISHLIST)({
	beforeLoad: () => {
		store.dispatch(setShowMenu(false));
		store.dispatch(setActiveMenu(-1));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: WishlistDisplay,
});

