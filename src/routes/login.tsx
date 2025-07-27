import Login from '#page/Login.tsx';
import { setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.LOGIN)({
	beforeLoad: () => {
		store.dispatch(setIsShowheaderContainer(false));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: Login,
});

