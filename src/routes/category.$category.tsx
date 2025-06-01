import { createFileRoute } from "@tanstack/react-router";
import { RoutePath } from "../utils/route";
import ProductCategory from "#page/ProductCategory.tsx";
import { setActiveMenu, setIsShowheaderContainer, setShowMenu } from "#state-management/slices/active-menu.slice.ts";
import { store } from "#state-management/store.ts";
import { getAllCategories } from "#hooks/query/product";
import { TProductCategory } from "#component/types/index.js";

export const Route = createFileRoute(RoutePath.CATEGORY)({
	beforeLoad: () => {
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	loader: async ({ context: { queryClient }, params: { category } }) => {
		let categoryId = 0;
		try {
			const { data: categoriesData } = await queryClient.ensureQueryData(getAllCategories());
			const categories = categoriesData as TProductCategory[];
			const menuIndex = categories.findIndex(categoryItem => categoryItem.name === category);
			categoryId = categories.find(categoryItem => categoryItem.name === category)?.id || 0;

			store.dispatch(setActiveMenu(menuIndex >= 0 ? menuIndex + 1 : menuIndex));
			store.dispatch(setShowMenu(true));
			store.dispatch(setIsShowheaderContainer(true));
		}
		catch {
			console.log('category route fail silently');
		}
		return categoryId;
	},
	component: RouteComponent
});

function RouteComponent() {
	const categoryId = Route.useLoaderData();
	return <ProductCategory categoryId={categoryId} />;
}