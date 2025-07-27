import fetcher from '#hooks/fetcher.ts';
import Cart from '#page/Cart.tsx';
import { setActiveMenu, setShowMenu, setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { addBulkItemToCart, TCartItems } from '#state-management/slices/cart.slice.ts';
import { store } from '#state-management/store.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

const env = import.meta.env;

export const Route = createFileRoute(RoutePath.CART)({
	beforeLoad: () => {
		store.dispatch(setActiveMenu(0));
		store.dispatch(setShowMenu(false));
		store.dispatch(setIsShowheaderContainer(true));
      
		scrollTo({
			top: 0,
			behavior: 'instant'
		});

		if(localStorage.getItem('access_token')) {
			fetcher.get(env.VITE_URL_ENDPOINT + 'v1/cart')
				.then(response => {
					const { data: savedCarts }: { data: TCartItems[] } = response;
					const mappedCart = savedCarts.reduce((acc, savedCart) => {
						const { item, variant } = savedCart;
						acc[item.id + '_' + variant] = savedCart;
						return acc;
					}, {} as Record<string, TCartItems>);
					store.dispatch(addBulkItemToCart(mappedCart));
				})
				.catch(response => {
					console.log(response, 'error');
				});
		}
	},
	component: Cart,
});

