import { minimumWeight } from "#constants.tsx";
import { Card, Divider, List, ListItem, Stack, styled, Typography } from "@mui/material";
import CartProgressbar from "./CartProgressbar";
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { closeCart, selectCartItems } from "#state-management/slices/cart.slice.ts";
import { getCartItems, getCartWeight } from "#utils/index.ts";
import { CartButton, CheckoutButton } from "./CommonViews";
import { useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";



export default function CartDisplay() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const cartItemsMap = useAppSelector(selectCartItems);
	const cartItems = getCartItems(cartItemsMap);
	const cartInfo = getCartWeight(cartItems);

	const isDisabled = cartInfo.weight < minimumWeight;
	const handleGoToCart = (action: string) => () => {
		let route;
		switch (action) {
			case 'cart':
				route = RoutePath.CART;
				break;
			default:
				route = RoutePath.CHECKOUT;
		}
		dispatch(closeCart());
		navigate({
			to: route
		});
	};

	return (
		<Stack overflow={'hidden'} position={'relative'} height={1}>
			<CustomCartContainer>
				<Stack gap={1}>
					<CartHeadingTypography fontFamily={'Alata'}>
						CART
					</CartHeadingTypography>
					<CartSubheadTypography>
						To offer affordable prices, Kobobasket requires a <span>{minimumWeight}kg</span> minimum order.
					</CartSubheadTypography>
				</Stack>
				<Stack gap={1.5}>
					<CheckoutButton disabled={isDisabled} $disabledButton={isDisabled} onClick={handleGoToCart('checkout')}>
						Checkout {cartItems.length} item
					</CheckoutButton>
					<CartButton variant="outlined" onClick={handleGoToCart('cart')}>
						Go to Cart
					</CartButton>
				</Stack>
				<StyledCheckoutCard sx={{ minHeight: 160 }}>
					<Stack gap={2}>
						<Stack gap={1.5} alignItems={'center'}>
							<CartTotalHeadingTypography textAlign={'center'}>
								Subtotal of products
							</CartTotalHeadingTypography>
							<CartTotalbodyTypography>
								{cartInfo.symbol}{cartInfo.total.toFixed(2)} {cartInfo.code}
							</CartTotalbodyTypography>
						</Stack>
						<Divider />
						<CartProgressbar cartWeight={cartInfo.weight} showProgressWeight />
					</Stack>
				</StyledCheckoutCard>
				<List>
					{cartItems.map((cartItem, index) => (
						<CartListItem key={index}>
							<CartItem item={cartItem.item} variant={cartItem.variant} quantity={cartItem.quantity} />
						</CartListItem>
					))}
				</List>
			</CustomCartContainer>
		</Stack>
	);
}

const CustomCartContainer = styled('div')(({ theme }) => ({
	// position: 'absolute', 
	height: '100%',
	overflowY: 'auto',
	left: '0px',
	top: '0px',
	display: 'flex',
	scrollbarWidth: 'thin',
	flexDirection: 'column',
	gap: theme.spacing(2),
	padding: `0px  ${theme.spacing()}`
}));

const CartHeadingTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Alata',
	fontSize: '20px',
	lineHeight: '133.4%',
}));

const CartSubheadTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontSize: '12px',
	lineHeight: '148%',
	letterSpacing: '0.15px',
	'& span': {
		color: theme.palette.primaryOrange.main,
	}
}));

const StyledCheckoutCard = styled(Card)(({ theme }) => ({
	padding: theme.spacing(2),
	border: '1px solid rgba(106, 106, 106, 0.04)',
	boxShadow: '0px 1px 8.8px -1px rgba(0, 0, 0, 0.1)',
	borderRadius: '4px',
}));



const CartTotalHeadingTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.lightshade,
	fontFamily: 'Roboto',
	width: '100%',
	fontWeight: '400',
	fontSize: '14px',
	lineHeight: '100%',
	letterSpacing: '0.15px',
}));

const CartTotalbodyTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '16px',
	lineHeight: '13px',
	letterSpacing: '0.46px',
}));

const CartListItem = styled(ListItem)(({ theme }) => ({
	margin: `0px 0px ${theme.spacing(2)} 0px`
}));