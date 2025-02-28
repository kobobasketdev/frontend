import CheckoutOrder from '#page/CheckoutOrder.tsx';
import CheckoutSignIn from '#page/CheckoutSignIn.tsx';
import { useAppSelector } from '#state-management/hooks.ts';
import { setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { selectCheckoutEmail, selectToCheckoutSignin, setCheckoutEmail } from '#state-management/slices/cart.slice.ts';
import { selectLoginUserEmail } from '#state-management/slices/user.slice.ts';
import { store } from '#state-management/store.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.CHECKOUT)({
	beforeLoad: () => {
		store.dispatch(setIsShowheaderContainer(false));
		store.dispatch(setCheckoutEmail(''));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: RouteComponent,
});

function RouteComponent() {
	const guestEmail = useAppSelector(selectCheckoutEmail);
	const showCheckoutSignin = useAppSelector(selectToCheckoutSignin);
	const loginUserEmail = useAppSelector(selectLoginUserEmail);
	const checkoutEmail = loginUserEmail || guestEmail;
	return !checkoutEmail || showCheckoutSignin ? <CheckoutSignIn /> : <CheckoutOrder email={checkoutEmail} />;
}
