
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { useAppSelector } from "#state-management/hooks.ts";
import { ExpandMore } from "@mui/icons-material";
import {
	Accordion, AccordionDetails, AccordionSummary, Avatar,
	Button, FormLabel,
	List, ListItem, Radio, Skeleton, Stack, styled,
	SvgIcon,
	TextField, Typography
} from "@mui/material";
import americanPay from '@src/assets/american.png';
import chinaPay from '@src/assets/china.png';
import dinersPay from '@src/assets/diners.png';
import discoveryPay from '@src/assets/discover.png';
import jcbPay from '@src/assets/jcb.png';
import mastercardPay from '@src/assets/mastercard.png';
import paypalPay from '@src/assets/paypal.png';
import visaPay from '@src/assets/visa.png';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import stripe from '@src/assets/stripe.png';
import CheckoutOrderSummary, { TCouponCode, TPaymentType } from "#component/CheckoutOrderSummary.tsx";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { ShippingAddressInfo } from "#component/ShippingAddress.tsx";
import { IOtherShippingInfo, IShippingAddressState, TCreateOrder, TShippingKeys } from "#component/types/index.js";
import { CountryType, getCartItems, getCartWeight, initialOtherShippingState, shippingInitialState } from "#utils/index.ts";
import { initialSupportedCountries, IDeliveryState, selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { selectCartItems } from "#state-management/slices/cart.slice.ts";
import axios from "axios";
import ShieldSvg from "#component/svg/ShieldSvg.tsx";
import { useCartMutation } from "#hooks/mutations/cart";

const env = import.meta.env;

const payment = [
	americanPay, chinaPay, dinersPay, discoveryPay, jcbPay, mastercardPay, paypalPay, visaPay
];

const stripePromise = loadStripe(env.VITE_STRIPE_PUBLIC_KEY);


export default function CheckoutOrder({ email, handleChangeEmail }: { email: string, handleChangeEmail: (args: boolean) => void }) {
	const [payForMeEmail, setPayForMeEmail] = useState<string>('');
	const [paymentMethod, setPaymentMethod] = useState<TPaymentType>('card');
	const [otherShippingDetails, setOtherShippingDetails] = useState<IOtherShippingInfo>(initialOtherShippingState);
	const [shippingError, setShippingError] = useState<IShippingAddressState>(shippingInitialState);
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	const [shippingCountry, setShippingCountry] = useState<CountryType | null>(initialSupportedCountries.countries[(deliveryLocation as IDeliveryState).code]);
	const [stripeClientSecret, setStripeClientSecret] = useState<{ id: string, secret: string }>();
	const [shippingFee, setShippingFee] = useState(0);
	const [couponCode, setCouponCode] = useState<TCouponCode>({ value: 0, isValid: false });
	const [shouldLoadingShippingFee, setLoadShippingFee] = useState(false);
	const { createOrderMutation } = useCartMutation();

	const [isDisablePayment, setIsDisablePayment] = useState(true);

	const paymentAnchorRef = useRef<HTMLElement | null>(null);

	const cartItemsMap = useAppSelector(selectCartItems);
	const cartItems = getCartItems(cartItemsMap);
	const cartItemInfo = getCartWeight(cartItems);

	const shouldDisablePayment = !shippingCountry || isDisablePayment || Object.keys(otherShippingDetails).some(shippingDetails => !otherShippingDetails[shippingDetails as TShippingKeys]);
	console.log(shouldDisablePayment, 'disable payment', stripeClientSecret?.id);

	const finalShippingFee = shouldLoadingShippingFee ? shippingFee : undefined;
	const paymentTotal = useMemo(() => cartItemInfo.total + (finalShippingFee || 0) - couponCode.value, [cartItemInfo.total, finalShippingFee, couponCode.value]);

	useEffect(() => {
		loadPaymentIntent({ initial: true });
	}, []);

	const handleCountryChange = (args: CountryType | null) => {
		setShippingCountry(args);
		if (!args) {
			setLoadShippingFee(false);
		}
	};
	const handleOtherShippingChange = (args: IOtherShippingInfo, key?: string) => {
		setOtherShippingDetails(args);
		if (key !== 'province') {
			return;
		}

		if (!args.province) {
			setLoadShippingFee(false);
			return;
		}

		loadPaymentIntent({ province: args.province });

	};
	function loadPaymentIntent({ initial, province }: { initial?: boolean, province?: string }) {
		setIsDisablePayment(true);

		let value;

		if (stripeClientSecret?.id) {
			value = {
				url: env.VITE_URL_ENDPOINT + '/v1/update-payment-intent',
				method: 'put'
			};
		}
		else {
			value = {
				url: env.VITE_URL_ENDPOINT + '/v1/create-payment-intent',
				method: 'post'
			};
		}
		axios({
			...value,
			data: {
				id: stripeClientSecret?.id,
				amount: paymentTotal.toFixed(2),
				currencyCode: cartItemInfo.code,
				weight: cartItemInfo.weight,
				deliveryCountry: {
					code: shippingCountry?.code, label: shippingCountry?.label,
					// city: otherShippingDetails.city, postalCode: otherShippingDetails.postalCode,
					province: province ?? otherShippingDetails.province
				}
			}
		}).then(response => {
			setShippingFee(response.data.shippingFee);
			setStripeClientSecret(response.data.stripeInfo);
			setIsDisablePayment(false);
			if (!initial) {
				setLoadShippingFee(true);
			}
		}).catch(() => {
			setIsDisablePayment(true);
			setLoadShippingFee(false);
		});
	}

	const handleChangeAccount = () => {
		handleChangeEmail(true);
	};

	const handlePaymentMethod = (paymentType: TPaymentType) => () => {
		setPaymentMethod(paymentType);
		scrollTo({
			top: paymentAnchorRef.current?.offsetTop
		});
		console.log(paymentAnchorRef.current?.offsetTop);
	};

	const handlePayForMeName = (e: ChangeEvent<HTMLInputElement>) => {
		setPayForMeEmail(e.target.value);
	};

	const createOrder = async () => {
		const orderData: TCreateOrder = {
			items: cartItems.map(cartitem => ({
				id: cartitem.item.id + '',
				name: cartitem.item.name,
				quantity: cartitem.quantity,
				weight: cartitem.item.variations[cartitem.variant] + 'kg',
				price: cartitem.item.variations[cartitem.variant].price.converted
			})),
			status: 0,
			shippingFee: finalShippingFee || 0,
			settlementCurrency: cartItemInfo.code,
			userId: email,
			shippingAddress: {
				firstName: '',
				lastName: '',
				address: otherShippingDetails.address,
				city: otherShippingDetails.city,
				country: shippingCountry?.code || '',
				postalCode: otherShippingDetails.postalCode,
				province: otherShippingDetails.province,
				phone: otherShippingDetails.phone
			},
			payformeEmail: paymentMethod === 'payforme' ? payForMeEmail : null
		};
		const { data } = await createOrderMutation.mutateAsync(orderData);
		return { orderId: data.id, email };
	};

	const appearance = {
		theme: 'stripe' as const,
	};
	// Enable the skeleton loader UI for optimal loading.
	const loader = 'auto';
	return (
		<>
			{
				!stripeClientSecret ?
					<SkeletionPayment />
					:
					<Elements options={{ clientSecret: stripeClientSecret.secret, appearance, loader }} stripe={stripePromise}>
						<form>
							<Stack>
								<StyledStackContent>
									<Stack gap={3}>
										<Stack gap={1} p={1}>
											<Typography fontFamily={'Alata'} fontSize={'24px'}>CHECKOUT YOUR ORDER</Typography>
											<Typography fontSize={'14px'}>Payment methods we accept.</Typography>
										</Stack>
										<StyleContainerStack>
											<Stack p={1} position={'relative'}>
												<Stack direction={'row'} flexWrap={'wrap'} gap={3} mt={2}>
													{
														payment.map((icon, index) => <Avatar variant="rounded" src={icon} key={index} />)
													}
												</Stack>
												<StyledAccordion defaultExpanded>
													<StyledAccordionSummary
														expandIcon={<ExpandMore />}
														aria-controls="account-content"
														id="account-header"
													>
														<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>ACCOUNT</Typography>
													</StyledAccordionSummary>
													<AccordionDetails>
														<Typography color="rgba(27, 31, 38, 0.72)">
															{email}
														</Typography>
														<Button variant="text" onClick={handleChangeAccount} sx={{
															color: theme.palette.primaryOrange.main,
															fontSize: '12px',
															textTransform: 'inherit',
															paddingLeft: 0
														}}>
															Change account
														</Button>
													</AccordionDetails>
												</StyledAccordion>
												<StyledAccordion defaultExpanded>
													<StyledAccordionSummary
														expandIcon={<ExpandMore />}
														aria-controls="shipping-content"
														id="shipping-header"

													>
														<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>SHIPPING ADDRESS</Typography>
													</StyledAccordionSummary>
													<AccordionDetails >
														<ShippingAddressInfo
															otherShippingDetails={otherShippingDetails}
															setOtherShippingDetails={handleOtherShippingChange}
															shippingCountry={shippingCountry}
															setShippingCountry={handleCountryChange}
															shippingError={shippingError}
															setShippingError={setShippingError}
														/>
													</AccordionDetails>
												</StyledAccordion>
												<StyledAccordion defaultExpanded>
													<StyledAccordionSummary
														expandIcon={<ExpandMore />}
														aria-controls="delivery-content"
														id="delivery-header"

													>
														<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>DELIVERY METHOD</Typography>
													</StyledAccordionSummary>
													<AccordionDetails>
														<Stack direction={'row'} justifyContent={'space-between'}>
															{
																shouldLoadingShippingFee ?
																	(<Typography color="rgba(27, 31, 38, 0.72)" fontSize={'14px'} width={'190px'} flexGrow={1}>
																		Arrives within 10 - 14 business days
																	</Typography>
																	) : <Typography color="rgba(27, 31, 38, 0.72)" fontSize={'14px'} width={'190px'} flexGrow={1}>
																		Select your delivery country and province
																	</Typography>
															}
															{
																shouldLoadingShippingFee && Boolean(shippingFee) && <Typography fontWeight={'500'} >
																	{cartItemInfo.code} {cartItemInfo.symbol}{shippingFee.toFixed(2)}
																</Typography>
															}
														</Stack>
													</AccordionDetails>
												</StyledAccordion>
												<span id="payment-method" ref={paymentAnchorRef} />
												<StyledAccordion defaultExpanded>
													<StyledAccordionSummary
														expandIcon={<ExpandMore />}
														aria-controls="payment-content"
														id="payment-header"

													>
														<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>PAYMENT METHOD</Typography>
													</StyledAccordionSummary>
													<AccordionDetails sx={{ p: 0 }}>
														<List disablePadding>
															<ListItem disablePadding >
																<Stack width={1} >
																	<StyledPaymentStack direction={'row'} alignItems={'center'} $isSelected={paymentMethod === 'card'}>
																		<Radio id="card-method" size="small" color="default" checked={paymentMethod === 'card'} onChange={handlePaymentMethod('card')} />
																		<Stack direction={'row'} justifyContent={'space-between'} width={1}>
																			<FormLabel htmlFor="card-method" sx={{ fontWeight: '500', fontFamily: 'Roboto', color: 'black' }}>Credit/Debit card</FormLabel>
																			<img src={stripe} width={50} />
																		</Stack>
																	</StyledPaymentStack>
																	{
																		paymentMethod === 'card' &&
																		<PaymentElement id="payment-element" />
																	}
																</Stack>
															</ListItem>
															<ListItem disablePadding >
																<Stack width={1} >
																	<StyledPaymentStack direction={'row'} alignItems={'center'} $isSelected={paymentMethod === 'payforme'}>
																		<Radio size="small" id="payforme-method" color="default" checked={paymentMethod === 'payforme'} onChange={handlePaymentMethod('payforme')} />
																		<Stack direction={'row'} justifyContent={'space-between'} width={1}>
																			<FormLabel htmlFor="payforme-method" sx={{ fontWeight: '500', fontFamily: 'Roboto', color: 'black' }}>
																				Pay for me
																			</FormLabel>

																		</Stack>
																	</StyledPaymentStack>
																	{
																		paymentMethod === 'payforme' &&
																		<Stack p={1} gap={2} maxWidth={'484px'}>
																			<Stack gap={2} pt={1}>
																				<StyledTextField label="Payer's email"
																					slotProps={{
																						inputLabel: {
																							shrink: true
																						}
																					}}
																					value={payForMeEmail}
																					onChange={handlePayForMeName} />
																				<Typography fontSize={'14px'} fontWeight={'500'}>Your checkout cart will be sent to the payer's email. When your payer completes the payment you will get a notification</Typography>
																			</Stack>
																		</Stack>
																	}
																</Stack>
															</ListItem>
														</List>
													</AccordionDetails>
												</StyledAccordion>
											</Stack>
											<CheckoutOrderSummary
												shippingFee={finalShippingFee}
												disablePayment={shouldDisablePayment}
												itemCount={cartItems.length}
												paymentTotal={paymentTotal}
												couponCode={couponCode}
												handleCouponChange={setCouponCode}
												createOrder={createOrder}
												cartItemInfo={cartItemInfo}
												paymentMethod={paymentMethod}
											/>
										</StyleContainerStack>
									</Stack>
								</StyledStackContent>
							</Stack>
						</form>
					</Elements>
			}
		</>
	);
}

const SkeletionPayment = () => {
	return (
		<Stack>
			<StyledStackContent>
				<Stack gap={3}>
					<Stack gap={1} p={1}>
						<Typography fontFamily={'Alata'} fontSize={'24px'}>CHECKOUT YOUR ORDER</Typography>
						<Typography fontSize={'14px'}>Payment methods we accept.</Typography>
					</Stack>
					<StyleContainerStack>
						<Stack p={1} position={'relative'}>
							<Stack direction={'row'} flexWrap={'wrap'} gap={3} mt={2}>
								{
									payment.map((icon, index) => <Avatar variant="rounded" src={icon} key={index} />)
								}
							</Stack>
							<StyledAccordion defaultExpanded>
								<StyledAccordionSummary
									expandIcon={<ExpandMore />}
									aria-controls="account-content"
									id="account-header"
								>
									<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>ACCOUNT</Typography>
								</StyledAccordionSummary>
								<AccordionDetails>
									<Skeleton />
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion defaultExpanded>
								<StyledAccordionSummary
									expandIcon={<ExpandMore />}
									aria-controls="shipping-content"
									id="shipping-header"

								>
									<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>SHIPPING ADDRESS</Typography>
								</StyledAccordionSummary>
								<AccordionDetails >
									<Skeleton />
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion defaultExpanded>
								<StyledAccordionSummary
									expandIcon={<ExpandMore />}
									aria-controls="delivery-content"
									id="delivery-header"

								>
									<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>DELIVERY METHOD</Typography>
								</StyledAccordionSummary>
								<AccordionDetails>
									<Skeleton />
								</AccordionDetails>
							</StyledAccordion>
							<StyledAccordion defaultExpanded>
								<StyledAccordionSummary
									expandIcon={<ExpandMore />}
									aria-controls="payment-content"
									id="payment-header"

								>
									<Typography component="span" fontFamily={'Alata'} fontSize={'18px'}>PAYMENT METHOD</Typography>
								</StyledAccordionSummary>
								<AccordionDetails sx={{ p: 0 }}>
									<Skeleton />
								</AccordionDetails>
							</StyledAccordion>
						</Stack>
						<Stack gap={0}>
							<Stack direction={'row'}>
								<SvgIcon viewBox="-1 0 9 9">
									<ShieldSvg />
								</SvgIcon>
								<Typography fontSize={'12px'}>
									Your payment is Safe, Secure and Encryted.
								</Typography>
							</Stack>
							<Skeleton sx={{ width: '300px', alignSelf: 'flex-start', height: '300px' }} />
						</Stack>
					</StyleContainerStack>
				</Stack>
			</StyledStackContent>
		</Stack>
	);
};
const StyleContainerStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	justifyContent: 'center',
	maxWidth: '1000px',
	gap: theme.spacing(),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column',
		maxWidth: '500px',
	}
}));

const StyledPaymentStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$isSelected'
})<{ $isSelected: boolean }>(({ $isSelected, theme }) => ({
	...($isSelected ? {
		backgroundColor: theme.palette.primaryYellow.main,
		border: 'none'
	}
		:
		{
			border: '1px solid rgba(27, 31, 38, 0.72)'
		}
	)
}));

const StyledTextField = styled(TextField)({
	backgroundColor: 'white'
});

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
	alignItem: 'left',
	justifyContent: 'left',
	borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
	' > span': {
		flexGrow: 'unset'
	},
	'&.Mui-expanded': {
		height: '50px',
		minHeight: 'unset',
	}
}));

const StyledAccordion = styled(Accordion)(() => ({
	backgroundColor: '#F5F5F5',
	boxShadow: 'none',
	border: '1px solid #EBEDF0',
	'::before': {
		backgroundColor: 'unset'
	},
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(12),
	alignItems: 'center',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(8)
	},
}));