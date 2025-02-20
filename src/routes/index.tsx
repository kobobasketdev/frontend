import MarketPlace from '#page/MarketPlace.tsx';
import { setActiveMenu, setIsShowheaderContainer, setShowMenu } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.HOME)({
	beforeLoad: () => {
		store.dispatch(setActiveMenu(0));
		store.dispatch(setShowMenu(true));
		store.dispatch(setIsShowheaderContainer(true));
		
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: MarketPlace,
});