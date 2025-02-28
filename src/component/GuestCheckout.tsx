import { Box, Typography, Stack, Alert, TextField } from "@mui/material";
import { CheckoutButton } from "./CommonViews";
import { useAppDispatch } from "#state-management/hooks.ts";
import { ChangeEvent, useState } from "react";
import { setCheckoutEmail, updateShowCheckoutSignin } from "#state-management/slices/cart.slice.ts";

export default function GuestCheckout() {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState<string>('');

	const handleGuestCheckout = () => {
		if (!email) {
			return;
		}
		dispatch(setCheckoutEmail(email));
		dispatch(updateShowCheckoutSignin(false));
	};

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	return (
		<Stack gap={1}>
			<Box>
				<Typography textAlign={'center'} fontSize={'14px'}>You can always create an account or sign in later.</Typography>
			</Box>
			<Stack gap={3}>
				<Alert severity="warning" >
					<Stack gap={1}>
						<Typography fontWeight={'500'}>Enter A Valid Email</Typography>
						<Typography fontSize={'13px'}>
							Please make sure to enter your correct email address and ensure it is valid to proceed with checkout.
						</Typography>
					</Stack>
				</Alert>
				<Box width={1}>
					<TextField label='Email address' fullWidth value={email} onChange={handleEmail} type="email" />
					<Typography color="rgba(27, 31, 38, 0.72)" fontSize={'12px'} mt={1}>
						You will receive confirmation of your order details via Email
					</Typography>
				</Box>
				<CheckoutButton $isCurved={false} onClick={handleGuestCheckout}>
					Continue as a Guest
				</CheckoutButton>
			</Stack>
		</Stack>
	);
}