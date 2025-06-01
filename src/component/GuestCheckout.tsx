import { Box, Typography, Stack, Alert, TextField } from "@mui/material";
import { CheckoutButton } from "./CommonViews";
import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import { GuestContext } from "#utils/context.ts";
import { validateEmail } from "#utils/validation.ts";

export default function GuestCheckout() {
	const guestContext = useContext(GuestContext);
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	const handleGuestCheckout = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!email || !validateEmail(email)) {
			setError(true);
			return;
		}
		if (guestContext) {
			guestContext.handleShowGuestLogin(false);
			guestContext.handleSetGuestEmail(email);
		}
	};

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setError(false);
	};
	return (
		<form>
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
						<TextField label='Email address' fullWidth value={email} onChange={handleEmail} type="email" error={error} />
						<Typography color="rgba(27, 31, 38, 0.72)" fontSize={'12px'} mt={1}>
							You will receive confirmation of your order details via Email
						</Typography>
					</Box>
					<CheckoutButton type="submit" $isCurved={false} onClick={handleGuestCheckout}>
						Continue as a Guest
					</CheckoutButton>
				</Stack>
			</Stack>
		</form>
	);
}