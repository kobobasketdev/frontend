import HeaderWithouSearch from "#component/HeaderWithoutSearch.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { useAppDispatch } from "#state-management/hooks.ts";
import { updateShowCheckoutSignin } from "#state-management/slices/cart.slice.ts";
import { countries, CountryType } from "#utils/index.ts";
import { CreditCard, ExpandMore } from "@mui/icons-material";
import {
	Accordion, AccordionDetails, AccordionSummary, Autocomplete, Avatar, Box,
	Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputAdornment, InputLabel,
	List, ListItem, OutlinedInput, Radio, Stack, styled,
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
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import parsePhoneNumber, { isValidPhoneNumber, CountryCode } from 'libphonenumber-js';
import { initialCurrencyState } from "#state-management/slices/currency.slice.ts";
import stripe from '@src/assets/stripe.png';
import paypal2 from '@src/assets/paypal2.png';
import CheckoutOrderSummary, { TPaymentType } from "#component/CheckoutOrderSummary.tsx";

type TOtherShippingInfo = {
	province: string,
	city: string,
	postalCode: string,
	phone: string,
	address: string
};

type TShippingError = TOtherShippingInfo & { country: string };
type TPaymentDetails = {
	card: string,
	holderName: string,
	expiry: string,
	cvc: string,
	payer: string,
};

type TBillingAddress = TOtherShippingInfo & {
	country: CountryType | null,
};

const payment = [
	americanPay, chinaPay, dinersPay, discoveryPay, jcbPay, mastercardPay, paypalPay, visaPay
];
const initialState: TOtherShippingInfo = {
	province: '',
	city: '',
	postalCode: '',
	phone: '',
	address: ''
};
const paymentInitialDetails: TPaymentDetails = {
	card: '',
	holderName: '',
	expiry: '',
	cvc: '',
	payer: ''
};
const shippingErrorState: TShippingError = {
	...initialState,
	country: ''
};

const billingAddressState: TBillingAddress = {
	...initialState,
	country: null
};
const parseExpiry = (expiry: string) => {
	if (expiry.length > 2) {
		return expiry.substring(0, 2) + '/' + expiry.substring(2);
	}
	return expiry;
};

export default function CheckoutOrder({ email }: { email: string }) {
	const dispatch = useAppDispatch();
	const [shippingCountry, setShippingCountry] = useState<CountryType | null>(null);
	const [otherShippingDetails, setOtherShippingDetails] = useState<TOtherShippingInfo>(initialState);
	const [paymentDetails, setPaymentDetails] = useState<TPaymentDetails>(paymentInitialDetails);
	const [billingAddress, setBillingAddress] = useState<TBillingAddress>(billingAddressState);
	const [shippingError, setShippingError] = useState<TShippingError>(shippingErrorState);
	const [paymentMethod, setPaymentMethod] = useState<TPaymentType>('card');
	const paymentAnchorRef = useRef<HTMLElement | null>(null);

	const shippingCost = 50;
	let deliveryInfo;
	if (shippingCountry && shippingCountry.label.toLowerCase() in initialCurrencyState.currencies) {
		deliveryInfo = {
			code: initialCurrencyState.currencies[shippingCountry.label.toLowerCase()].code,
			symbol: initialCurrencyState.currencies[shippingCountry.label.toLowerCase()].symbol,
		};
	}
	const handleChangeAccount = () => {
		console.log('change account');
		dispatch(updateShowCheckoutSignin(true));
	};

	const handleChangeShippingCountry = (_e: SyntheticEvent, value: CountryType | null) => {
		setShippingCountry(value);
		setOtherShippingDetails(initialState);
		setShippingError({
			...initialState,
			country: value && !(value.label.toLowerCase() in initialCurrencyState.currencies) ? `Delivery not available to ${value.label}. We are working fast to bring KoboBasket to your location` : ''
		});
	};

	const handleUseShippingAsBilling = (_e: SyntheticEvent, checked: boolean) => {
		let values = billingAddressState;

		if (checked) {
			values = {
				...otherShippingDetails,
				country: shippingCountry
			};
		}
		setBillingAddress(values);
	};

	const handlePaymentMethod = (paymentType: TPaymentType) => () => {
		setPaymentMethod(paymentType);
		scrollTo({
			top: paymentAnchorRef.current?.offsetTop
		});
		console.log(paymentAnchorRef.current?.offsetTop);
	};

	const handleCountryBillingAddress = (_e: SyntheticEvent, value: CountryType | null) => {
		setBillingAddress({
			...billingAddress,
			country: value
		});
	};

	const handleBillingAddress = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setBillingAddress({
			...billingAddress,
			[field]: e.target.value
		});
	};

	const handlePaymentInfo = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (field === 'expiry') {
			value = value.replace('/', '');
			value = /\D/.test(value) ? paymentDetails.expiry : value;
		}
		else if (field === 'card') {
			value = /\d{17}/.test(value) ? paymentDetails.card : value;
		}
		setPaymentDetails({
			...paymentDetails,
			[field]: value
		});
	};
	const handleShippingInfo = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (field === 'phone') {
			const phoneNumber = parsePhoneNumber(e.target.value, shippingCountry!.code as CountryCode);
			value = phoneNumber?.formatInternational() || value;
			setShippingError({
				...shippingError,
				[field]: !isValidPhoneNumber(value, shippingCountry!.code as CountryCode) ?
					`Enter a valid ${shippingCountry?.label} phone number` : ''
			});
		}
		setOtherShippingDetails({
			...otherShippingDetails,
			[field]: value
		});
	};
	return (
		<Stack>
			<HeaderWithouSearch />
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
									<Stack gap={2}>
										<Autocomplete
											options={countries}
											getOptionLabel={(option) => option.label}
											value={shippingCountry}
											onChange={handleChangeShippingCountry}
											isOptionEqualToValue={(option, value) => option.code === value.code}
											renderOption={(props, option) => {
												const { key, ...optionProps } = props;
												return (
													<Box
														key={key}
														component="li"
														sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
														{...optionProps}
													>
														<img
															loading="lazy"
															width="20"
															srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
															src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
															alt=""
														/>
														{option.label} ({option.code})
													</Box>
												);
											}}
											renderInput={(params) => <StyledTextField {...params}
												helperText={shippingError.country} label="Country"
												error={Boolean(shippingError.country)}
											/>}
										/>

										<StyledTextField label='Province/State/Region' value={otherShippingDetails.province}
											onChange={handleShippingInfo('province')} disabled={!deliveryInfo?.code} />

										<StyledTextField label='City' value={otherShippingDetails.city}
											onChange={handleShippingInfo('city')} disabled={!deliveryInfo?.code} />

										<StyledTextField label='Postal code' value={otherShippingDetails.postalCode}
											onChange={handleShippingInfo('postalCode')} disabled={!deliveryInfo?.code} />

										<StyledTextField label='Address' value={otherShippingDetails.address}
											onChange={handleShippingInfo('address')} disabled={!deliveryInfo?.code} />

										<FormControl variant="outlined" sx={{ bgcolor: 'white' }} disabled={!deliveryInfo?.code} error={Boolean(shippingError.phone)}>
											<InputLabel htmlFor="outlined-adornment-phone">Phone number</InputLabel>
											<OutlinedInput
												id="outlined-adornment-phone"
												value={otherShippingDetails.phone}
												onChange={handleShippingInfo('phone')}
												endAdornment={
													<InputAdornment position="end">
														{
															shippingCountry &&
															<img
																loading="lazy"
																width="20"
																srcSet={`https://flagcdn.com/w40/${shippingCountry.code.toLowerCase()}.png 2x`}
																src={`https://flagcdn.com/w20/${shippingCountry.code.toLowerCase()}.png`}
																alt=""
															/>
														}
													</InputAdornment>
												}
												label="Phone number"
											/>
											{
												shippingError.phone && <FormHelperText error={Boolean(shippingError.phone)}>{shippingError.phone}</FormHelperText>
											}
										</FormControl>
									</Stack>
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
									{
										deliveryInfo?.code &&
										<Stack direction={'row'} justifyContent={'space-between'}>
											<Typography color="rgba(27, 31, 38, 0.72)" fontSize={'14px'} width={'190px'}>
												Arrives within 5 - 14 business days
											</Typography>
											<Typography fontWeight={'500'} >
												{deliveryInfo.code} {deliveryInfo.symbol}{shippingCost}
											</Typography>
										</Stack>
									}
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
														<FormLabel htmlFor="card-method" sx={{ fontWeight: '500', fontFamily: 'Roboto', color: 'black' }}>Credit card</FormLabel>
														<img src={stripe} width={50} />
													</Stack>
												</StyledPaymentStack>
												{
													paymentMethod === 'card' &&
													<Stack p={1} gap={2}>
														<Stack gap={2} pt={1}>
															<FormControl variant="outlined" sx={{ bgcolor: 'white' }}>
																<InputLabel htmlFor="outlined-adornment-card-number">Card number</InputLabel>
																<OutlinedInput
																	type="number"
																	id="outlined-adornment-card-number"
																	value={paymentDetails.card}
																	onChange={handlePaymentInfo('card')}
																	startAdornment={
																		<InputAdornment position="start">
																			<CreditCard fontSize="small" />
																		</InputAdornment>
																	}
																	label="Card number"
																/>
															</FormControl>

															<StyledTextField label='Cardholder name'
																slotProps={{
																	inputLabel: {
																		shrink: true
																	}
																}}
																value={paymentDetails.holderName}
																onChange={handlePaymentInfo('holderName')} />

															<StyledTextField label='Expiration date'
																slotProps={{
																	inputLabel: {
																		shrink: true
																	},
																}}
																placeholder="MM / YY"
																value={parseExpiry(paymentDetails.expiry)}
																onChange={handlePaymentInfo('expiry')} />

															<StyledTextField label='CVC / CVC2'
																type="number"
																slotProps={{
																	inputLabel: {
																		shrink: true
																	}
																}}
																value={paymentDetails.cvc}
																onChange={handlePaymentInfo('cvc')} />
														</Stack>
														<FormGroup>
															<FormControlLabel onChange={handleUseShippingAsBilling} control={<Checkbox size="small" sx={{ 'svg': { color: 'black' } }} color="default" />} label={<Typography fontSize={'14px'}>Use shipping address as billing address</Typography>} />
														</FormGroup>
														<Stack gap={2} pb={1}>
															<Typography fontFamily={'Alata'} fontSize={'18px'} pl={.5}>BILLING ADDRESS</Typography>
															<Autocomplete
																options={countries}
																getOptionLabel={(option) => option.label}
																value={billingAddress.country}
																onChange={handleCountryBillingAddress}
																isOptionEqualToValue={(option, value) => option.code === value.code}
																renderOption={(props, option) => {
																	const { key, ...optionProps } = props;
																	return (
																		<Box
																			key={key}
																			component="li"
																			sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
																			{...optionProps}
																		>
																			<img
																				loading="lazy"
																				width="20"
																				srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
																				src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
																				alt=""
																			/>
																			{option.label} ({option.code})
																		</Box>
																	);
																}}
																renderInput={(params) => <StyledTextField {...params} label="Country"
																/>}
															/>

															<StyledTextField label='Province/State/Region' value={billingAddress.province}
																onChange={handleBillingAddress('province')} />

															<StyledTextField label='City' value={billingAddress.city}
																onChange={handleBillingAddress('city')} />

															<StyledTextField label='Postal code' value={billingAddress.postalCode}
																onChange={handleBillingAddress('postalCode')} />

															<StyledTextField label='Address' value={billingAddress.address}
																onChange={handleBillingAddress('address')} />

															<StyledTextField label='Phone number' value={billingAddress.phone}
																onChange={handleBillingAddress('phone')} />
														</Stack>
													</Stack>
												}
											</Stack>
										</ListItem>
										<ListItem disablePadding>
											<Stack width={1} >
												<StyledPaymentStack direction={'row'} alignItems={'center'} $isSelected={paymentMethod === 'paypal'}>
													<Radio id="paypal-method" size="small" color="default" checked={paymentMethod === 'paypal'} onChange={handlePaymentMethod('paypal')} />
													<Stack direction={'row'} justifyContent={'space-between'} width={1} pr={.5}>
														<FormLabel htmlFor="paypal-method" sx={{ fontWeight: '500', fontFamily: 'Roboto', color: 'black' }}>Paypal</FormLabel>
														<img src={paypal2} width={60} height={18} />
													</Stack>
												</StyledPaymentStack>
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
													<Stack p={1} gap={2}>
														<Stack gap={2} pt={1}>
															<StyledTextField label="Payer's email"
																slotProps={{
																	inputLabel: {
																		shrink: true
																	}
																}}
																value={paymentDetails.payer}
																onChange={handlePaymentInfo('payer')} />
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
						<CheckoutOrderSummary shippingFee={shippingCost} deliveryInfo={deliveryInfo} paymentMethod={paymentMethod} />
					</StyleContainerStack>
				</Stack>
			</StyledStackContent>
		</Stack>
	);
}

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