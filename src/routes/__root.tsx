import App from '#App.tsx';
import { TProductCategory } from '#component/types/index.js';
import { getAllCategories, getAllNewProducts, getAllProducts, getAllProductsByCategory } from '#hooks/query/product';
import { setCategoryNames } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { RouterContext } from '#utils/route.ts';
import { createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
	loader: async ({ context }) => {
		let categoryIds = [1, 2, 3, 4, 5, 6, 7];
		try {
			const categories = await context.queryClient.ensureQueryData(getAllCategories());
			categoryIds = (categories.data as TProductCategory[]).map(category => +category.id);
			store.dispatch(setCategoryNames(categories.data as TProductCategory[]));
		}
		catch {
			console.log('fail silently');
		}

		Promise.allSettled([
			getAllProducts({ page: 1 }),
			getAllNewProducts({ page: 1 }),
			...categoryIds.map((categoryId) => context.queryClient.prefetchQuery(getAllProductsByCategory({ page: 1, productCategory: +categoryId })
			))
		]);
	},
	component: () => (
		<>
			<App />
		</>
	),
});