import { createFileRoute } from "@tanstack/react-router";
import { RoutePath } from "../utils/route";
import ProductCategory from "#page/ProductCategory.tsx";
import { setActiveMenu, setShowMenu } from "#state-management/slices/active-menu.slice.ts";
import { menus } from "#state-management/utils/index.ts";
import { store } from "#state-management/store.ts";

export const Route = createFileRoute(RoutePath.CATEGORY)({
	beforeLoad: ({ params: { category } }) => {
		const menuIndex = menus.indexOf(category);
		store.dispatch(setActiveMenu(menuIndex));
		store.dispatch(setShowMenu(true));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: ProductCategory
});
