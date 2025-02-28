import { theme } from "#customtheme.ts";
import { Box, Typography, Stack, styled, Button } from "@mui/material";
import CartProgressbar from "./CartProgressbar";
import { ProductPriceTypography, CheckoutButton } from "./CommonViews";
import { IDeliveryState } from "#state-management/slices/delivery.slice.ts";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Link } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";

export default function MobileCartContainer({
	deliveryLocation, weight, totalPrice, totalSavings, itemCount,
	isDisabled,
	handleCartButton
}: {
	deliveryLocation: IDeliveryState,
	weight: number,
	totalPrice: number,
	totalSavings: number,
	itemCount: number,
	isDisabled: boolean,
	handleCartButton: () => void
}) {
	return (
		<CustomDiv>
			<Stack pl={1}>
				<Link to={RoutePath.HOME} style={{ color: '#090909', textDecoration: 'underline' }}>
					Continue Shopping
				</Link>
			</Stack>
			<MobileCheckoutContainer>
				<Box bgcolor={'#FFE8E6'} borderRadius={'14px 14px 0px 0px'} p={1}>
					{
						isDisabled ?
							<Typography>
								Reach the <b>20kg minimum</b> for better delivery rates. Keep shopping to enjoy the savings!
							</Typography>
							:
							<Typography>
								Based on local market price, Your Savings: <span style={{ color: theme.palette.primaryOrange.main, fontSize: '20px', fontWeight: '600' }}>
									{deliveryLocation.code} {deliveryLocation.symbol}{totalSavings}
								</span>
							</Typography>
					}
				</Box>
				<Stack direction={'row'} justifyContent={"space-between"} pb={1} pr={1}>
					<Box minWidth={'100px'} p={1} pl={2}>
						<CartProgressbar cartWeight={weight} />
					</Box>
					<Stack direction={'row'} gap={2}>
						<Stack textAlign={'right'}>
							<Typography>
								Subtotal
							</Typography>
							<ProductPriceTypography $fontSize={'24px'} $fontWeight={'600'}>
								{deliveryLocation.code} {deliveryLocation.symbol}{totalPrice}
							</ProductPriceTypography>
						</Stack>
						{
							isDisabled ?
								<ContinueShoppingButton>
									Continue Shopping
								</ContinueShoppingButton>
								:
								<CheckoutButton onClick={handleCartButton}>Checkout {itemCount} item</CheckoutButton>

						}
					</Stack>
				</Stack>
			</MobileCheckoutContainer>
		</CustomDiv>
	);
}

const ContinueShoppingButton = styled(Button)(({ theme }) => ({
	backgroundColor: 'black',
	color: 'white',
	borderRadius: theme.shape.borderRadius * 5,
	textTransform: 'inherit'
}));

const CustomDiv = styled('div')(({ theme }) => ({
	flexDirection: 'column',
	display: 'none',
	gap: theme.spacing(),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'flex',
	}
}));
const MobileCheckoutContainer = styled('div')(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		position: 'fixed',
		backgroundColor: 'white',
		bottom: 0,
		left: 0,
		width: '100%',
		zIndex: theme.zIndex.tooltip,
		boxShadow: '4px 0px 29.3px rgba(0, 0, 0, 0.59)',
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
		borderRadius: '14px 14px 0px 0px',
		marginTop: theme.spacing(),
		paddingBottom: theme.spacing()
	}
}));