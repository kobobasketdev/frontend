import Layout from "#page/Layout.tsx";
import { setActiveMenu, setShowMenu, setIsShowheaderContainer } from "#state-management/slices/active-menu.slice.ts";
import { store } from "#state-management/store.ts";
import { RoutePath } from "#utils/route.ts";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/_auth')({
	beforeLoad: () => {
		if(!store.getState().user.currentUser) {
			throw redirect({
				to: RoutePath.SIGNUP
			});
		}
		store.dispatch(setActiveMenu(-1));
		store.dispatch(setShowMenu(true));
		store.dispatch(setIsShowheaderContainer(true));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: Layout
});