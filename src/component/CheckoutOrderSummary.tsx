import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectCartItems } from "#state-management/slices/cart.slice.ts";
import { getCartItems, getCartWeight } from "#utils/index.ts";
import { Check, ExpandMore, Remove } from "@mui/icons-material";
import { Box, Button, Checkbox, FormLabel, List, ListItem, Stack, styled, SvgIcon, TextField, Typography } from "@mui/material";
import pluralize from "pluralize";
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import ShieldSvg from "./svg/ShieldSvg";
import { Link } from "@tanstack/react-router";
import { theme } from "#customtheme.ts";
import { RoutePath } from "#utils/route.ts";
import { CheckoutButton } from "./CommonViews";
import { selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";

type TDeliveryInfo = {
	code: string,
	symbol: string
};
export type TPaymentType = 'card' | 'paypal' | 'payforme';

export default function CheckoutOrderSummar({
	shippingFee,
	deliveryInfo,
	paymentMethod
}: { shippingFee: number, deliveryInfo?: TDeliveryInfo, paymentMethod: TPaymentType }) {
	const cartItemsMap = useAppSelector(selectCartItems);
	const deliverLocation = useAppSelector(selectDeliverLocation);
	const cartItems = getCartItems(cartItemsMap);
	const cartItemInfo = getCartWeight(cartItems);
	const [couponCode, setCouponCode] = useState<string>('');
	const [saveMyInfo, setSaveMyInfo] = useState<boolean>(true);
	const paymentContainerRef = useRef<HTMLDivElement | null>(null);
	const [termAgreement, setTermAgreement] = useState<boolean>(false);
	const currenciesSymbol = deliveryInfo || { code: deliverLocation.code, symbol: deliverLocation.symbol };

	const taxes = 30;
	let couponDiscount = 0;

	const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCouponCode(e.target.value);
	};

	const handleApplyCoupon = () => {
		couponDiscount = 19;
		setCouponCode('');
	};

	const handleSaveMyInfo = (_e: SyntheticEvent, checked: boolean) => {
		setSaveMyInfo(checked);
	};

	const handledAgreement = (_e: SyntheticEvent, checked: boolean) => {
		setTermAgreement(checked);
	};

	useEffect(() => {
		const handleScrollEvent = () => {
			if (!paymentContainerRef.current) {
				return;
			}

			const parent = paymentContainerRef.current.parentNode;
			if (scrollY <= 100) {
				paymentContainerRef.current.classList.remove('sticky');
				paymentContainerRef.current.classList.remove('absolute');

			}
			else if (scrollY > 100 && Math.abs((parent as HTMLElement).clientHeight - scrollY) > 450) {
				paymentContainerRef.current.classList.add('sticky');
				paymentContainerRef.current.classList.remove('absolute');

			}
			else {
				console.log('here');
				paymentContainerRef.current.classList.add('absolute');
				paymentContainerRef.current.classList.remove('sticky');

			}
		};

		addEventListener('scroll', handleScrollEvent);
		return () => {
			removeEventListener('scroll', handleScrollEvent);
		};
	});
	return (
		<ContainerStack position={'relative'}>
			<PaymentFinalizeStack pt={3} gap={2} ref={paymentContainerRef}>
				<WebSecurityStack direction={'row'} alignItems={'center'} p={1} pl={2} pr={2}>
					<SvgIcon viewBox="-1 0 9 9">
						<ShieldSvg />
					</SvgIcon>
					<Typography fontSize={'12px'}>
						Your payment is Safe, Secure and Encryted.
					</Typography>
				</WebSecurityStack>
				<OrderSummaryStack>
					<PayNowContainerStack>
						<Stack gap={2}>
							<StyledStack>
								<Stack p={1} pl={2} direction={'row'} alignItems={'center'} borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}>
									<Typography component="span" fontFamily={'Alata'} fontSize={'24px'}>ORDER SUMMARY</Typography>
									<ExpandMore />
								</Stack>
								<Stack p={1} pl={2} pr={2}>
									<StyledList>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'}>
													Subtotal ({cartItems.length} {pluralize('item', cartItems.length)})
												</Typography>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'} fontWeight={'500'}>
													{currenciesSymbol.code} {currenciesSymbol.symbol}{cartItemInfo.total}
												</Typography>
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'}>
													Shipping fee
												</Typography>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'} fontWeight={'500'}>
													{currenciesSymbol.code} {currenciesSymbol.symbol}{shippingFee}
												</Typography>
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'}>
													Taxes
												</Typography>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'} fontWeight={'500'}>
													{currenciesSymbol.code} {currenciesSymbol.symbol}{taxes}
												</Typography>
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												{
													couponDiscount ?
														<>
															<Typography fontSize={'14px'} color="rgba(27, 31, 38, 0.8)">
																<Check color="success" fontSize="small" /> Coupon Applied
															</Typography>
															<Typography color="error" fontSize={'14px'}>
																<Remove color="error" /> {currenciesSymbol.code} {currenciesSymbol.symbol}{couponDiscount}
															</Typography>
														</>
														:
														<>
															<TextField size="small" value={couponCode} onChange={handleCouponChange} label="Coupon code" />
															<Button variant="contained" sx={{ bgcolor: 'black' }} onClick={handleApplyCoupon} size="small">Apply</Button>
														</>
												}
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1} pt={1}>
												<Typography fontSize={'16px'} fontWeight={'600'}>
													Total
												</Typography>
												<Typography fontSize={'16px'} fontWeight={'600'}>
													{currenciesSymbol.code} {currenciesSymbol.symbol}{(cartItemInfo.total + shippingFee + taxes - couponDiscount)}
												</Typography>
											</Stack>
										</ListItem>
									</StyledList>
								</Stack>
							</StyledStack>
							<Box p={1} pl={2} pr={2}>
								<Stack direction={'row'} alignItems={'center'} border={'1px solid rgba(0, 0, 0, 0.1)'} borderRadius={1}>
									<Checkbox id="saveInfo" size="small" sx={{ 'svg': { color: 'black' } }} checked={saveMyInfo} onChange={handleSaveMyInfo} />
									<FormLabel htmlFor="saveInfo" sx={{ fontSize: '13px', color: 'black', fontWeight: '600' }}>Save my information for a faster checkout</FormLabel>
								</Stack>
							</Box>
						</Stack>
						<SecurityStack direction={'row'} alignItems={'center'} p={1} pl={2} pr={2}>
							<SvgIcon viewBox="-1 0 9 9">
								<ShieldSvg />
							</SvgIcon>
							<Typography fontSize={'12px'}>
								Your payment is Safe, Secure and Encryted.
							</Typography>
						</SecurityStack>
					</PayNowContainerStack>
					<Stack p={1} gap={2} pl={2} pr={2}>
						<Stack direction={'row'} pt={1} gap={1} pl={.5}>
							<Checkbox checked={termAgreement} size="small" onChange={handledAgreement} sx={{ padding: 0 }} />
							<Typography fontSize={'12px'} >
								By submitting your order, you agree to our <Link to={RoutePath.HOME} style={{
									fontWeight: '500', color: theme.palette.primaryOrange.main
									,
									textDecoration: 'underline'
								}}> Term's of Service</Link> & <Link to={RoutePath.HOME} style={{
									fontWeight: '500', color: theme.palette.primaryOrange.main
									,
									textDecoration: 'underline'
								}}>Privacy Notice</Link>
							</Typography>
						</Stack>
						<CheckoutButton $isCurved={false} sx={{ fontWeight: '500' }}>
							{
								paymentMethod === 'payforme' ? 'SEND TO MY PAYER' : 'PAY NOW'
							}
						</CheckoutButton>
					</Stack>
				</OrderSummaryStack >
			</PaymentFinalizeStack>
		</ContainerStack>
	);
}

const ContainerStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '400px',
		paddingLeft: theme.spacing(1.5)
	}
}));

const PaymentFinalizeStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		'&.sticky': {
			position: 'fixed',
			top: '10%',
		},
		'&.absolute': {
			position: 'absolute',
			bottom: '6px'
		},
		width: '370px',
	}
}));

const WebSecurityStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const SecurityStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const StyledList = styled(List)(({ theme }) => ({
	'> *': {
		marginBottom: theme.spacing(1.5)
	}
}));

const PayNowContainerStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'column-reverse',
	gap: theme.spacing(),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column'
	}
}));

const OrderSummaryStack = styled(Stack)(({ theme }) => ({
	height: 'fit-content',
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		boxShadow: '0px 1px 30.7px 16px rgba(0, 0, 0, 0.05), 0px 1px 30.7px -1px rgba(0, 0, 0, 0.05)',
		borderRadius: '4px',
	}
}));

const StyledStack = styled(Stack)(({ theme }) => ({
	background: '#F5F5F5',
	border: '1px solid rgba(106, 106, 106, 0.04)',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		background: 'rgba(255, 243, 242, 0.91)',
		border: '1px solid #F5F5F5',
	}
}));