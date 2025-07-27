import App from '#App.tsx';
import { TProductCategory } from '#component/types/index.js';
import { getSupportedDeliveryCountries, getUserLocation } from '#hooks/query/country';
import { getAllCategories, getAllNewProducts, getAllProducts, getAllProductsByCategory } from '#hooks/query/product';
import { getWishlistItemIds } from '#hooks/query/wishlist';
import { setCategoryNames } from '#state-management/slices/active-menu.slice.ts';
import { setDeliveryLocation } from '#state-management/slices/delivery.slice.ts';
import { setSupportedCountries } from '#state-management/slices/supported-countries.ts';
import { store } from '#state-management/store.ts';
import { WishlistIdContext } from '#utils/context.ts';
import { countries as defaultCountries, TCountry } from '#utils/index.ts';
import { RouterContext } from '#utils/route.ts';
import { useQuery } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
	loader: async ({ context }) => {
		let categoryIds = [1, 2, 3, 4, 5, 6, 7];
		try {
			const categories = await context.queryClient.ensureQueryData(getAllCategories());
			console.log(categories);
			categoryIds = (categories.data.data as TProductCategory[]).map(category => +category.id);
			store.dispatch(setCategoryNames(categories.data.data as TProductCategory[]));
		}
		catch (e) {
			console.log('fail silently', e);
		}

		try {
			const supportedCountriesData = await context.queryClient.ensureQueryData(getSupportedDeliveryCountries());
			const supportedCountriesCode = (supportedCountriesData.data as { code: string, label: string, currency: string }[])?.map(c => c.code);
			const mappedSupportedCountries = supportedCountriesCode.reduce((acc, value) => {
				acc[value] = defaultCountries.find(ds => ds.code === value)!;
				return acc;
			}, {} as TCountry);

			store.dispatch(setSupportedCountries(mappedSupportedCountries));
		}
		catch (e) {
			console.log('country loading failed');
		}

		try {
			const userLocationData = await context.queryClient.ensureQueryData(getUserLocation());
			const userLocation = userLocationData.data as { region: string, country: string };
			if (userLocation) {
				const countryName = defaultCountries.find(dc => dc.code === userLocation.country)?.label || '';
				store.dispatch(setDeliveryLocation({ code: userLocation.country, country: countryName }));
			}
		}
		catch (e) {
			console.log('user location loading failed');
		}


		Promise.allSettled([
			context.queryClient.prefetchQuery(getAllProducts({ page: 1 })),
			context.queryClient.prefetchQuery(getAllNewProducts({ page: 1 })),
			...categoryIds.map((categoryId) => context.queryClient.prefetchQuery(
				getAllProductsByCategory({ page: 1, productCategory: +categoryId })
			)),
			context.queryClient.prefetchQuery(getWishlistItemIds())
		]);
	},
	component: AppWrapper,
});

function AppWrapper() {
	const { data } = useQuery(getWishlistItemIds());
	const wishlistIdsSet: Set<string> = new Set(data?.data || []);

	return (
		<>
			<WishlistIdContext value={wishlistIdsSet}>
				<App />
			</WishlistIdContext>
		</>
	);
}