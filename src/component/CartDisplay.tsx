import { minimumWeight } from "#constants.tsx";
import { Button, Card, Divider, List, ListItem, Stack, styled, Typography } from "@mui/material";
import CartProgressbar from "./CartProgressbar";
import CartItem from "./CartItem";
import { items } from "#testData.ts";
import ScrollableContainer from "./ScrollableContainer";

export default function CartDisplay() {
	const cartWeight = 10;
	const itemCount = 4;
	const cartTotalAmount = 40;
	const currency = 'CAD';
	const currencySymbol = '$';
	const isDisabled = cartWeight < minimumWeight;
	return (
		<Stack gap={2} p={1} pl={2} height={'100%'}>
			<Stack gap={1}>
				<CartHeadingTypography fontFamily={'Alata'}>
					Cart
				</CartHeadingTypography>
				<CartSubheadTypography>
					To offer affordable prices, Kobobasket requires a <span>{minimumWeight}kg</span> minimum order. 
				</CartSubheadTypography>
			</Stack>
			<Stack>
				<CheckoutButton disabled={isDisabled} $disabledButton={isDisabled}>
					Checkout {itemCount} item
				</CheckoutButton>
			</Stack>
			<Stack width={1} flexGrow={1} >
				<ScrollableContainer showNavigation>
					<Stack>
						<StyledCheckoutCard>
							<Stack gap={2} >
								<Stack gap={1.5} alignItems={'center'}>
									<CartTotalHeadingTypography>
										Subtotal of products
									</CartTotalHeadingTypography>
									<CartTotalbodyTypography>
										{currencySymbol}{cartTotalAmount} {currency}
									</CartTotalbodyTypography>
								</Stack>
								<Divider/>
								<CartProgressbar cartWeight={cartWeight}/>
							</Stack>
						</StyledCheckoutCard>
						<List>
							{items.slice(0, 5).map((item, index) => (
								<CartListItem key={index}>
									<CartItem item={item} />
								</CartListItem>
							))}
						</List>
					</Stack>
				</ScrollableContainer>
			</Stack>
			
			{/* <Stack gap={1}>
				<CheckoutButton disabled={isDisabled} $disabledButton={isDisabled}>
					Checkout {itemCount} item
				</CheckoutButton>
			</Stack> */}
		</Stack>
	);
}

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
	padding: theme.spacing(3),
	paddingBottom: theme.spacing(5),
	border: '1px solid rgba(106, 106, 106, 0.04)',
	boxShadow: '0px 1px 8.8px -1px rgba(0, 0, 0, 0.1)',
	borderRadius: '4px',
}));

const CheckoutButton= styled(Button, {
	shouldForwardProp: prop => prop !== '$disabledButton'
})<{ $disabledButton: boolean }>(({ theme, $disabledButton }) => ({
	backgroundColor: !$disabledButton ? theme.palette.primaryOrange.main : theme.palette.primaryOrange.lightshade,
	borderRadius: '15px',
	textTransform: 'inherit',
	color: 'white',
	fontFamily: 'Roboto',
	fontSize: '13px',
	':disabled': {
		color: 'white'
	}
}));

const CartTotalHeadingTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.lightshade,
	fontFamily: 'Roboto',
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