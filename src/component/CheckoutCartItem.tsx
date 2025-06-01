import { Stack, styled, SvgIcon, Typography } from "@mui/material";
import CheckoutItem from "./CheckoutItem";
import { TCartItems } from "#state-management/slices/cart.slice.ts";
import CartSvg from "./svg/CartSvg";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";

export default function CheckoutCartItem({ cartItems }: { cartItems: TCartItems[] }) {

	return (
		<StyledStack p={1} gap={4}>
			<Stack gap={6}>
				{
					cartItems.length ? cartItems.map((item, index) => (
						<CheckoutItem key={index} cartItem={item} />
					)) : (
						<Stack alignItems={'center'}>
							<SvgIcon viewBox="0 0 22 22" sx={{ width: '120px', height: '120px' }}>
								<CartSvg />
							</SvgIcon>
							<Typography fontFamily={'Alata'} fontSize={'18px'}>No item in Cart</Typography>
						</Stack>
					)
				}
			</Stack>
		</StyledStack >
	);
}

const StyledStack = styled(Stack)(({ theme }) => ({
	minWidth: '540px',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		minWidth: '300px'
	}
}));