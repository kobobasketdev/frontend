import { minimumWeight } from "#constants.tsx";
import { Button, Card, Divider, List, ListItem, Stack, styled, Typography } from "@mui/material";
import CartProgressbar from "./CartProgressbar";
import CartItem from "./CartItem";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { selectCartItems, TCartItems, TCartMap } from "#state-management/slices/cart.slice.ts";

const weightMap: { [x: string]: number } = {
	'kg': 1,
	'g': 1000,
	'lb': 2.205
};

const getCartWeight = (cartItems: TCartItems[]) => {
	return cartItems.reduce((acc, cartItem) => (
		{
			weight: acc.weight + (((cartItem.item.weight.value)/weightMap[cartItem.item.weight.measurement])*cartItem.quantity),
			total: acc.total + ((cartItem.item.promotion?.promoPrice || cartItem.item.price)*cartItem.quantity)
		}
	), { weight: 0, total: 0 });
};

const getCartItems = (cartItemsMap: TCartMap) => {
	const cartKeys = Object.keys(cartItemsMap);
	const cartItems = [];
	for(const key of cartKeys) {
		cartItems.push(cartItemsMap[key]);
	}
	return cartItems;
};

export default function CartDisplay() {
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	const cartItemsMap = useAppSelector(selectCartItems);
	const cartItems = getCartItems(cartItemsMap);
	const cartInfo = getCartWeight(cartItems);
	
	const isDisabled = cartInfo.weight < minimumWeight;

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
				<Stack>
					<CheckoutButton disabled={isDisabled} $disabledButton={isDisabled}>
						Checkout {cartItems.length} item
					</CheckoutButton>
				</Stack>
				<StyledCheckoutCard sx={{ minHeight: 160 }}>
					<Stack gap={2}>
						<Stack gap={1.5} alignItems={'center'}>
							<CartTotalHeadingTypography textAlign={'center'}>
								Subtotal of products
							</CartTotalHeadingTypography>
							<CartTotalbodyTypography>
								{deliveryLocation.symbol}{cartInfo.total} {deliveryLocation.code}
							</CartTotalbodyTypography>
						</Stack>
						<Divider/>
						<CartProgressbar cartWeight={cartInfo.weight}/>
					</Stack>
				</StyledCheckoutCard>
				<List>
					{cartItems.slice(0, 5).map((cartItem, index) => (
						<CartListItem key={index}>
							<CartItem item={cartItem.item} quantity={cartItem.quantity}/>
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

const CheckoutButton= styled(Button, {
	shouldForwardProp: prop => prop !== '$disabledButton'
})<{ $disabledButton: boolean }>(({ theme, $disabledButton }) => ({
	backgroundColor: $disabledButton ? theme.palette.action.disabled : theme.palette.primaryYellow.main,
	borderRadius: '15px',
	textTransform: 'inherit',
	color: theme.palette.primaryBlack.moreDeeper,
	fontFamily: 'Roboto',
	fontSize: '13px',
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