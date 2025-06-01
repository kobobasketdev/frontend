import { useAppSelector } from "#state-management/hooks.ts";
import { selectDefaultAddressId, selectResidentialAddresses } from "#state-management/slices/user.slice.ts";
import { Alert, Autocomplete, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Stack, styled, TextField, Typography } from "@mui/material";
import { IOtherShippingInfo, IResidentialAddress, IShippingAddressState, TAddressToEdit, TShippingErrorKey } from "./types";
import { UnderlineButton } from "./ContactDetails";
import { countries, CountryType, initialOtherShippingState, province, shippingInitialState } from "#utils/index.ts";
import { initialSupportedCountries, IDeliveryState, selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { parsePhoneNumberFromString, CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import { useState, SyntheticEvent, ChangeEvent, useEffect } from "react";
import { BuyagainButton } from "./CommonViews";
import { validateResidentialAddress } from "#utils/validation.ts";
import { useSnackbar } from "notistack";
import { useAuthMutation } from "#hooks/mutations/auth";
import { startCase } from "lodash";

export default function ShippingAddress() {
	const addresses = useAppSelector(selectResidentialAddresses);
	const defaultAddressId = useAppSelector(selectDefaultAddressId);
	const [open, setOpen] = useState<boolean>(false);
	const [addressToEdit, setAddressToEdit] = useState<TAddressToEdit>();
	const [isNew, setIsNew] = useState<boolean>(false);

	let content;

	const handleOpenEditAddress = (addressId: string) => {
		setOpen(true);
		const editAddress = addresses.find(address => address.id === addressId);
		setAddressToEdit({ ...editAddress!, isDefault: defaultAddressId === addressId, id: addressId });
		setIsNew(false);
	};

	if (addresses.length == 0) {
		content = <Typography color="rgba(0, 0, 0, 0.6)" fontSize={'13px'}>
			Items will be delivered to this Address
		</Typography>;
	}
	else {
		content = <Stack gap={2} pt={1}>
			{
				addresses.map((address, index) => (
					<SavedAddress {...address} showControl key={index} isDefault={address.id === defaultAddressId} handleOpenEditAddress={handleOpenEditAddress} />
				))
			}
		</Stack>;
	}

	const handleCloseModal = () => {
		setOpen(false);
	};

	const handleOpenNewAddress = () => {
		setOpen(true);
		setAddressToEdit({ ...shippingInitialState, id: '' });
		setIsNew(true);
	};
	return (
		<>
			<ResidentialAddressModal open={open} handleCloseModal={handleCloseModal} addressToEdit={addressToEdit} isNew={isNew} />
			<Stack direction={'row'} justifyContent={'space-between'}>
				<Typography fontWeight={'500'}>
					Shipping Address(es)
				</Typography>
				<UnderlineButton size="small" onClick={handleOpenNewAddress}>
					Add new address
				</UnderlineButton>
			</Stack>
			{content}
		</>
	);
}

const ResidentialAddressModal = ({ open, handleCloseModal, addressToEdit, isNew = false }: {
	open: boolean, handleCloseModal: () => void, addressToEdit?: TAddressToEdit, isNew?: boolean
}) => {
	const [isDefault, setIsDefault] = useState<boolean>(false);
	const [addressFieldName, setAddressFieldName] = useState<{ [x: string]: string }>({});
	const [otherShippingDetails, setOtherShippingDetails] = useState<IOtherShippingInfo>(initialOtherShippingState);
	const [shippingError, setShippingError] = useState<IShippingAddressState>(shippingInitialState);
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	const { createNewShippingAddress, updateShippingAddress } = useAuthMutation();
	const { enqueueSnackbar } = useSnackbar();
	const [shippingCountry, setShippingCountry] = useState<CountryType | null>(initialSupportedCountries.countries[(deliveryLocation as IDeliveryState).code]);

	useEffect(() => {
		if (addressToEdit) {
			const { firstName, lastName, country, isDefault, ...otherShippingData } = addressToEdit;

			setAddressFieldName({
				firstName: firstName || '',
				lastName: lastName || ''
			});
			setShippingCountry(initialSupportedCountries.countries[countries.find(countryInfo => countryInfo.label.toLowerCase() === country.trim().toLowerCase())?.code || (deliveryLocation as IDeliveryState).code]);
			setOtherShippingDetails(otherShippingData);
			setIsDefault(isDefault || false);
		}
	}, [addressToEdit, deliveryLocation]);

	const hasError = Object.keys(shippingError).reduce((acc, current) => {
		if (acc) {
			return true;
		}
		if (shippingError[current as TShippingErrorKey]?.trim()) {
			return true;
		}
		return false;
	}, false);

	const handleDefaultAddress = () => {
		setIsDefault(prev => !prev);
	};

	const handleChangeField = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setAddressFieldName({
			...addressFieldName,
			[field]: e.target.value
		});
		setShippingError({
			...shippingError,
			[field]: ''
		});
	};

	const handleSubmitAddress = async () => {
		const { success, errors } = validateResidentialAddress({
			firstName: addressFieldName.firstName,
			lastName: addressFieldName.lastName,
			...otherShippingDetails,
			country: shippingCountry?.label || ''
		});
		if (!success) {
			const errorContent = Object.keys(errors!).reduce((acc, current) => {
				acc[current as TShippingErrorKey] = errors![current as TShippingErrorKey]![0];
				return acc;
			}, {} as IShippingAddressState);
			setShippingError({
				...shippingError,
				...errorContent
			});
			return;
		}
		try {
			const data = {
				address: {
					firstName: addressFieldName.firstName,
					lastName: addressFieldName.lastName,
					...otherShippingDetails,
					country: shippingCountry?.label || '',
				},
				isDefault,
			};
			if (isNew) {
				await createNewShippingAddress.mutateAsync(data);
			}
			else {
				await updateShippingAddress.mutateAsync({ ...data, addressId: addressToEdit?.id || '' });
			}
			handleCloseModal();
			setIsDefault(false);
			setOtherShippingDetails(initialOtherShippingState);
			setAddressFieldName({
				firstName: '',
				lastName: ''
			});
		}
		catch {
			enqueueSnackbar(<Alert severity="error">
				Could not submit address
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};
	return (
		<>
			<Modal open={open}>
				<Stack alignItems={'center'} height={1} justifyContent={'center'}>
					<ModalStyledStack bgcolor={'#F5F5F5'} width={1 / 1.2} minWidth={'300px'} maxWidth={'350px'} gap={.5} maxHeight={'750px'} height={'90%'} pb={2}>
						<Typography p={1} fontWeight={'500'}>Shipping Address</Typography>
						<Divider />
						<Stack p={1} pt={2} gap={2} overflow={'auto'} height={1}>
							<StyledTextField label='First Name' value={addressFieldName['firstName']} onChange={handleChangeField('firstName')} error={Boolean(shippingError.firstName)} />
							<StyledTextField label='Last Name' value={addressFieldName['lastName']} onChange={handleChangeField('lastName')} error={Boolean(shippingError.lastName)} />
							<ShippingAddressInfo
								otherShippingDetails={otherShippingDetails}
								setOtherShippingDetails={setOtherShippingDetails}
								shippingCountry={shippingCountry}
								setShippingCountry={setShippingCountry}
								shippingError={shippingError}
								setShippingError={setShippingError}
							/>
							<FormControlLabel control={<Checkbox checked={isDefault} onChange={handleDefaultAddress} size="small" sx={{ 'svg': { color: 'black' } }} />} label={<Typography color="rgba(27, 31, 38, 0.72)" fontSize={'14px'}> Save as default address</Typography>} />
							<Stack direction={'row'} justifyContent={'space-between'}>
								<Button variant="outlined" color="inherit" sx={{ textTransform: 'inherit' }} onClick={handleCloseModal}>
									Cancel
								</Button>

								<BuyagainButton sx={{ pl: 2, pr: 2 }} onClick={handleSubmitAddress} disabled={hasError}>
									Save Address
								</BuyagainButton>
							</Stack>
						</Stack>
					</ModalStyledStack>
				</Stack>
			</Modal>
		</>
	);
};

export const SavedAddress = (props: IResidentialAddress & {
	showControl?: boolean,
	fontWeight?: string,
	fontSize?: string,
	isDefault?: boolean,
	handleOpenEditAddress?: (addressId: string) => void
}) => {
	const { handleOpenEditAddress } = props;
	const { deleteResidentShippingAddress } = useAuthMutation();
	const { enqueueSnackbar } = useSnackbar();
	const handleDeleteAddress = (id: string) => async () => {
		try {
			await deleteResidentShippingAddress.mutateAsync(id);
		}
		catch {
			enqueueSnackbar(<Alert severity="error">
				Could not delete address
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};
	return (
		<Stack gap={.5} pb={.5}>
			<Stack direction={'row'} gap={1}>
				<Typography fontWeight={'500'} fontSize={props.fontSize || '13px'}>{props.firstName + ' ' + props.lastName}</Typography>
				{
					props.isDefault && <DefaultChip>Default</DefaultChip>
				}
			</Stack>
			<Typography color={'rgba(27, 31, 38, 0.72)'} fontWeight={props.fontWeight || 'light'} fontSize={props.fontSize || '13px'}>
				{props.phone}
			</Typography>
			<Typography color={'rgba(27, 31, 38, 0.72)'} fontWeight={props.fontWeight || 'light'} fontSize={props.fontSize || '13px'}>
				{props.address}
			</Typography>
			<Typography color={'rgba(27, 31, 38, 0.72)'} fontWeight={props.fontWeight || 'light'} fontSize={props.fontSize || '13px'}>
				{props.city || ''} {props.province || ''}, {props.postalCode || ''}
			</Typography>
			<Typography color={'rgba(27, 31, 38, 0.72)'} fontWeight={props.fontWeight || 'light'} fontSize={props.fontSize || '13px'}>
				{props.country}
			</Typography>
			{
				(props.showControl && handleOpenEditAddress) &&
				<Stack direction={'row'} justifyContent={'space-between'} pt={.5}>
					<UnderlineButton size="small" onClick={handleDeleteAddress(props.id)}>
						Delete
					</UnderlineButton>
					<UnderlineButton size="small" onClick={() => handleOpenEditAddress(props.id)}>
						Edit
					</UnderlineButton>
				</Stack>
			}
		</Stack>
	);
};




export const ShippingAddressInfo = ({
	shippingError,
	otherShippingDetails,
	shippingCountry,
	setShippingError,
	setOtherShippingDetails,
	setShippingCountry
}: {
	shippingError: IShippingAddressState,
	otherShippingDetails: IOtherShippingInfo,
	shippingCountry: CountryType | null,
	setShippingError: (args: IShippingAddressState) => void,
	setOtherShippingDetails: (args: IOtherShippingInfo, key?: string) => void,
	setShippingCountry: (args: CountryType | null) => void
}) => {

	const handleChangeShippingCountry = (_e: SyntheticEvent, value: CountryType | null) => {
		const possibleError = {
			...initialOtherShippingState,
			country: value && !(value.code in initialSupportedCountries.countries) ? `Delivery not available to ${value.label}. We are working fast to bring KoboBasket to your location` : ''
		};
		setShippingCountry(value);
		setOtherShippingDetails(initialOtherShippingState);
		setShippingError(possibleError);
	};

	const handleShippingInfo = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		const shippingFieldError = { ...shippingError, [field]: '' };
		if (field === 'phone') {
			const phoneNumber = parsePhoneNumberFromString(e.target.value, shippingCountry!.code as CountryCode);
			value = phoneNumber?.formatInternational() || value;
			console.log(!isValidPhoneNumber(value, shippingCountry!.code as CountryCode));
			shippingFieldError[field] = !isValidPhoneNumber(value, shippingCountry!.code as CountryCode) ?
				`Enter a valid ${shippingCountry?.label} phone number` : '';
		}
		const updatedShippingDetails = {
			...otherShippingDetails,
			[field]: value
		};
		setOtherShippingDetails(updatedShippingDetails, field);
		setShippingError(shippingFieldError);
	};

	const handleProvinceChange = (_e: SyntheticEvent, value: string | null) => {

		const shippingFieldError = { ...shippingError, province: '' };

		const updatedShippingDetails = {
			...otherShippingDetails,
			province: value || ''
		};
		setOtherShippingDetails(updatedShippingDetails, 'province');
		setShippingError(shippingFieldError);
	};

	return (
		<Stack gap={2} maxWidth={'450px'}>
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

			<Autocomplete
				options={shippingCountry ? province[shippingCountry.code] || [] : []}
				value={startCase(otherShippingDetails.province)}
				onChange={handleProvinceChange}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props;
					return (
						<Box component='li' {...optionProps} key={key} sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
							{startCase(option)}
						</Box>
					);
				}}
				renderInput={(params) => <StyledTextField {...params}
					label="Province/State"
					error={Boolean(shippingError.province)}
				/>}
			/>

			<StyledTextField label='City' value={otherShippingDetails.city}
				onChange={handleShippingInfo('city')} disabled={!shippingCountry}
				error={Boolean(shippingError.city)} />

			<StyledTextField label='Postal code' value={otherShippingDetails.postalCode}
				onChange={handleShippingInfo('postalCode')} disabled={!shippingCountry}
				error={Boolean(shippingError.postalCode)} />

			<StyledTextField label='Address' value={otherShippingDetails.address}
				onChange={handleShippingInfo('address')} disabled={!shippingCountry}
				error={Boolean(shippingError.address)} />

			<FormControl variant="outlined" sx={{ bgcolor: 'white' }} disabled={!shippingCountry}
				error={Boolean(shippingError.phone)}>
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

		</Stack >
	);
};

const ModalStyledStack = styled(Stack)(({ theme }) => ({
	// height: '100vmin',
	// [theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
	// 	height: '60%'
	// }
}));
const StyledTextField = styled(TextField)({
	backgroundColor: 'white'
});

const DefaultChip = styled('span')(({ theme }) => ({
	background: '#F2F2F7',
	borderRadius: '4px',
	textAlign: 'center',
	color: 'rgba(27, 31, 38, 0.72)',
	fontFamily: 'Roboto',
	fontSize: '10px',
	display: 'inline-flex',
	alignItems: 'center',
	padding: theme.spacing(.2),
	paddingLeft: theme.spacing(.5),
	paddingRight: theme.spacing(.5)
}));