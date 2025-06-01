import { minimumWeight, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Check } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, Stack, Step, StepLabel, Stepper, styled, Typography } from "@mui/material";
import CartProgressbar from "./CartProgressbar";
import { theme } from "#customtheme.ts";
import { CheckoutButton, ProductPriceTypography } from "./CommonViews";
import americanPay from '@src/assets/american.png';
import chinaPay from '@src/assets/china.png';
import dinersPay from '@src/assets/diners.png';
import discoveryPay from '@src/assets/discover.png';
import jcbPay from '@src/assets/jcb.png';
import mastercardPay from '@src/assets/mastercard.png';
import paypalPay from '@src/assets/paypal.png';
import visaPay from '@src/assets/visa.png';

const payment = [
	americanPay, chinaPay, dinersPay, discoveryPay, jcbPay, mastercardPay, paypalPay, visaPay
];

const steps = [
	{ label: 'CART', isComplete: true, level: 1 },
	{ label: 'CHECKOUT', isComplete: false, level: 1 },
	{ label: 'ORDER COMPLETE', isComplete: false, level: 0 }
];
export default function WebCartContainer({
	weight, userCurrency, totalPrice, totalSavings, handleCartButton
}: {
	weight: number, userCurrency: { code: string, symbol: string }, totalPrice: number, totalSavings: number, handleCartButton: () => void
}) {
	const isDisabled = weight < minimumWeight;
	return (
		<StyledStack minWidth={'400px'} maxWidth={'420px'} gap={4} pt={1}>
			<Stepper activeStep={1}>
				{steps.map((step, index) => (
					<StyledStep key={index}>
						<StepLabel icon={
							<StyledSpan $level={step.level}>
								{step.isComplete ? <Check fontSize="small" /> : (index + 1)}
							</StyledSpan>
						}>{step.label}</StepLabel >
					</StyledStep>
				))}
			</Stepper>
			<Card sx={{ padding: 0 }}>
				<CardContent sx={{ padding: 0, ':last-child': { paddingBottom: 0 } }}>
					<Stack gap={2}>
						<Stack textAlign={'center'} gap={2} pl={2} pr={2}>
							<Typography fontFamily={'Alata'} fontSize={'30px'}>ORDER SUMMARY</Typography>
							<OrderLabelContainer alignItems={'center'} gap={3} pb={2} pt={2} maxWidth={'85%'} alignSelf={'center'}>
								{
									!isDisabled &&
									<Typography color={theme.palette.primaryGreen.main} fontSize={'.8rem'} pl={1} pr={1}>
										Kobobasket offers exceptional delivery prices, with a minimum delivery weight of just 20kg. Enjoy affordable rates for larger orders and seamless delivery right to your door.
									</Typography>
								}
								<Box maxWidth={'300px'} p={1} width={1} position={'relative'} display={'flex'}>
									<Box flexGrow={1}>
										<CartProgressbar cartWeight={weight} showProgressWeight={isDisabled} showCartWeight={isDisabled} />
									</Box>
									{
										!isDisabled &&
										<Box position={'relative'} width={'50px'}>
											<span style={{
												color: theme.palette.primaryOrange.main,
												fontSize: '20px',
												fontWeight: '600',
												position: 'absolute',
												top: '-10px',
												left: 4
											}}>
												{weight}kg
											</span>
										</Box>
									}
								</Box>
								{
									isDisabled &&
									<Stack gap={2} >
										<Typography color={theme.palette.primaryGreen.main} fontSize={'.8rem'} pl={1} pr={1}>
											Reach the <b>20kg minimum</b> for better delivery rates. Keep shopping to enjoy the savings!
										</Typography>
										<Stack width={1 / 2} alignSelf={'center'}>
											<CheckoutButton $isCurved={false} onClick={handleCartButton}>
												Continue Shopping
											</CheckoutButton>
										</Stack>
									</Stack>
								}
							</OrderLabelContainer>
							<Stack gap={1}>
								<Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
									<Typography>
										Weight of total products
									</Typography>
									<ProductPriceTypography $isPromotion $fontWeight="600">
										{weight.toFixed(2)}kg
									</ProductPriceTypography>
								</Stack>
								<Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
									<Typography>
										Subtotal of products
									</Typography>
									<ProductPriceTypography $fontWeight="600">
										{userCurrency.code} {userCurrency.symbol}{totalPrice.toFixed(2)}
									</ProductPriceTypography>
								</Stack>
								<Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
									<Typography>
										Market price savings
									</Typography>
									<ProductPriceTypography $isPromotion $fontWeight="600">
										{userCurrency.code} {userCurrency.symbol}{totalSavings.toFixed(2)}
									</ProductPriceTypography>
								</Stack>
								<Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
									<Typography>
										Shipping fee
									</Typography>
									<Typography >
										Calculated at checkout
									</Typography>
								</Stack>
								<Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
									<Typography>
										Estimated Taxes
									</Typography>
									<Typography >
										Calculated at checkout
									</Typography>
								</Stack>
							</Stack>
							<Stack pt={3} gap={1}>
								<ProceedToCheckoutButton variant="contained" disabled={isDisabled} onClick={handleCartButton}>
									Proceed to Checkout
								</ProceedToCheckoutButton>
								<Typography fontSize={'14px'}>
									You won't be charged until you review your order and see the delivery fee on the next page.
								</Typography>
							</Stack>
						</Stack>
						<Stack bgcolor={'#F2F2F7'} textAlign={'left'} height={1} p={2} gap={1}>
							<Typography>
								Payment methods
							</Typography>
							<Stack direction={'row'} flexWrap={'wrap'} gap={2}>
								{
									payment.map((icon, index) => <Avatar variant="rounded" src={icon} key={index} />)
								}
							</Stack>
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		</StyledStack>
	);
}

const ProceedToCheckoutButton = styled(Button)(() => ({
	backgroundColor: 'black'
}));

const OrderLabelContainer = styled(Stack)(({ theme }) => ({
	backgroundColor: '#FFE8E6',
	borderRadius: theme.shape.borderRadius,
	width: '100%'
}));

const StyledSpan = styled('span', {
	shouldForwardProp: prop => prop !== '$level'
})<{ $level: number }>(({ theme, $level }) => ({
	width: '22px',
	borderRadius: theme.shape.borderRadius * 3,
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '13px',
	height: '22px',
	backgroundColor: $level ? theme.palette.primaryYellow.main : 'rgba(0, 0, 0, 0.38)',
	color: 'black'
}));

const StyledStep = styled(Step)(({ theme }) => ({
	'.MuiStepIcon-root': {
		color: theme.palette.primaryYellow.main,
	},
}));

const StyledStack = styled(Stack)(({ theme }) => ({
	display: 'none',

	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'flex'
	},
}));