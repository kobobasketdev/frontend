import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Cancel, ExpandMore, Remove } from "@mui/icons-material";
import { Alert, Box, Button, Checkbox, FormLabel, List, ListItem, Stack, styled, SvgIcon, TextField, Typography } from "@mui/material";
import pluralize from "pluralize";
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import ShieldSvg from "./svg/ShieldSvg";
import { Link, useNavigate } from "@tanstack/react-router";
import { theme } from "#customtheme.ts";
import { RoutePath } from "#utils/route.ts";
import { CheckoutButton } from "./CommonViews";
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useSnackbar } from "notistack";
// import { validateEmail } from "#utils/validation.ts";
import { useCartMutation } from "#hooks/mutations/cart";

const env = import.meta.env;
export type TPaymentType = 'card' | 'paypal' | 'payforme';
export type TCouponCode = { value: number, isValid: boolean, code?: string, type?: 'percentage' | 'exact' };
export default function CheckoutOrderSummar({
	shippingFee,
	clearanceFee,
	itemCount,
	cartItemInfo,
	paymentMethod,
	couponCode,
	disablePayment,
	paymentTotalWithoutCoupon,
	createOrder,
	handleCouponChange,
}: {
	shippingFee?: number,
	clearanceFee?: number,
	itemCount: number,
	couponCode: TCouponCode,
	cartItemInfo: {
		weight: number;
		total: number;
		code: string;
		symbol: string;
	},
	paymentTotalWithoutCoupon: number,
	disablePayment: boolean,
	paymentMethod: TPaymentType,
	handleCouponChange: (args: TCouponCode | null) => void,
	createOrder: () => Promise<{ orderId: string, email: string }>,
}) {
	const [saveMyInfo, setSaveMyInfo] = useState<boolean>(true);
	const paymentContainerRef = useRef<HTMLDivElement | null>(null);
	const [termAgreement, setTermAgreement] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [coupon, setCoupon] = useState('');
	const { enqueueSnackbar } = useSnackbar();
	const stripe = useStripe();
	const { applyCouponCode } = useCartMutation();
	const elements = useElements();
	const navigate = useNavigate();

	const shouldDisablePayment = isLoading || disablePayment || !termAgreement;

	const handlePayForMe = async () => {
		try {
			const { orderId } = await createOrder();
			navigate({
				to: '/complete/$orderId',
				params: { orderId }
			});
		}
		catch (e: any) {
			enqueueSnackbar(<Alert severity="error">
				Error creating "Pay for me" order: {e.message}
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};

	const handleConfirmPayment = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (paymentMethod === 'payforme') {
			await handlePayForMe();
		}
		else if (paymentMethod === 'card') {
			if (!stripe || !elements) {
				return;
			}

			setIsLoading(true);
			try {
				const { orderId, email } = await createOrder();

				const { error } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						receipt_email: email,
						return_url: 'http://' + env.VITE_CLIENT_URL + '/complete/' + orderId
					}
				});

				if (error.type === 'card_error' || error.type === 'validation_error') {
					enqueueSnackbar(<Alert severity="error">
						{error.type ? 'Card error' : 'Validation error'}
					</Alert>, {
						anchorOrigin: { horizontal: 'center', vertical: 'top' },
						style: { backgroundColor: '#fdeded', padding: '0px 0px', }
					});
				}
				else {
					enqueueSnackbar(<Alert severity="error">
						Error completing payment occurred: {error.message}
					</Alert>, {
						anchorOrigin: { horizontal: 'center', vertical: 'top' },
						style: { backgroundColor: '#fdeded', padding: '0px 0px', }
					});
				}
			}
			catch (e: any) {
				enqueueSnackbar(<Alert severity="error">
					An unexpected error occurred: {e.message}
				</Alert>, {
					anchorOrigin: { horizontal: 'center', vertical: 'top' },
					style: { backgroundColor: '#fdeded', padding: '0px 0px', }
				});
			}
		}

		setIsLoading(false);
	};

	const handleOnCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCoupon(e.target.value);
	};

	const handleApplyCoupon = async () => {
		if (!coupon) {
			return;
		}
		try {
			const { data } = await applyCouponCode.mutateAsync(coupon);
			if (!data.isValid) {
				throw Error('Invalid coupon');
			}
			handleCouponChange({ value: data.coupon.discount, isValid: true, code: data.coupon.code, type: data.coupon.discount_type });
		}
		catch (e: any) {
			enqueueSnackbar(<Alert severity="error">
				Could not apply coupon, {e.message}
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};

	const handleRemoveCoupon = () => {
		handleCouponChange(null);
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
													Total Cart Weight
												</Typography>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'} fontWeight={'500'}>
													{cartItemInfo.weight.toFixed(2)}kg
												</Typography>
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'}>
													Subtotal ({itemCount} {pluralize('item', itemCount)})
												</Typography>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'} fontWeight={'500'}>
													{cartItemInfo.code} {cartItemInfo.symbol}{cartItemInfo.total.toFixed(2)}
												</Typography>
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'}>
													Shipping fee
												</Typography>
												{
													shippingFee &&
													<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'} fontWeight={'500'}>
														{cartItemInfo.code} {cartItemInfo.symbol}{shippingFee.toFixed(2)}
													</Typography>
												}
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'}>
													Clearance fee
												</Typography>
												{
													clearanceFee &&
													<Typography color="rgba(27, 31, 38, 0.8)" fontSize={'14px'} fontWeight={'500'}>
														{cartItemInfo.code} {cartItemInfo.symbol}{clearanceFee.toFixed(2)}
													</Typography>
												}
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack direction={'row'} justifyContent={'space-between'} width={1}>
												{
													couponCode.isValid ?
														<>
															<Typography fontSize={'14px'} color="rgba(27, 31, 38, 0.8)">
																Coupon Applied
															</Typography>
															<Stack direction={'row'} gap={1}>
																<Stack color="#d32f2f" fontWeight={'500'} fontSize={'14px'} alignItems={'center'} direction={'row'}>
																	<Remove color="error" /> {cartItemInfo.code} {cartItemInfo.symbol}{couponCode.value}
																</Stack>
																<Button color="inherit" onClick={handleRemoveCoupon} size="small"> {couponCode.code} <Cancel fontSize="small" /> </Button>
															</Stack>
														</>
														:
														<>
															<TextField size="small" value={coupon} onChange={handleOnCouponChange} placeholder="Coupon code" />
															<Button variant="contained" sx={{ bgcolor: 'black' }} disabled={applyCouponCode.isPending || isLoading || disablePayment} onClick={handleApplyCoupon} size="small">Apply</Button>
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
													{cartItemInfo.code} {cartItemInfo.symbol}{(paymentTotalWithoutCoupon + (shippingFee || 0) + (clearanceFee || 0) - couponCode.value).toFixed(2)}
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
						<CheckoutButton
							type="submit"
							$isCurved={false} sx={{ fontWeight: '500' }}
							onClick={handleConfirmPayment} disabled={shouldDisablePayment} $disabledButton={shouldDisablePayment}
						>
							{
								isLoading ? 'Please wait..' :
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