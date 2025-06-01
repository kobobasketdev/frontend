import CheckoutOrder from '#page/CheckoutOrder.tsx';
import CheckoutSignIn from '#page/CheckoutSignIn.tsx';
import { useAppSelector } from '#state-management/hooks.ts';
import { setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { selectLoginUserEmail } from '#state-management/slices/user.slice.ts';
import { store } from '#state-management/store.ts';
import { GuestContext } from '#utils/context.ts';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

export const Route = createFileRoute(RoutePath.CHECKOUT)({
	beforeLoad: () => {
		store.dispatch(setIsShowheaderContainer(false));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [showCheckoutSignin, setShowCheckoutSignin] = useState<boolean>(false);
	const [guestEmail, setGuestEmail] = useState<string>('');
	const loginUserEmail = useAppSelector(selectLoginUserEmail);

	const checkoutEmail = loginUserEmail || guestEmail;
	const context = useMemo(() => ({
		handleShowGuestLogin: setShowCheckoutSignin,
		handleSetGuestEmail: setGuestEmail
	}), []);
	return (
		<GuestContext value={context}>
			{
				showCheckoutSignin || !checkoutEmail ?
					<CheckoutSignIn /> :
					<CheckoutOrder email={checkoutEmail} handleChangeEmail={setShowCheckoutSignin} />
			}
		</GuestContext>
	);
}
