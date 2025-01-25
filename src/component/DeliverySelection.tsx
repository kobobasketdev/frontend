import { Stack, styled, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState,  } from "react";
import CurrencyList from "./CurrencyList";
import { NavigationHeaderButton } from "./NavigationHeaderButton";
import LocationSvg from "./svg/LocationSvg";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { IDeliveryState, selectDeliverLocation, setDeliveryLocation } from "#state-management/slices/delivery.slice.ts";
import { selectAllSupportedCurrency, TCountryCurrency, ICurrency } from "#state-management/slices/currency.slice.ts";
import _ from "lodash";
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";

const LOCATIONID = 'canada';

export default function DeliverySelection({ locationIcon, disableCurrency }: { locationIcon?: boolean, disableCurrency?: boolean }) {
	const [open, setOpen] = useState(false);
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	const dispatch = useAppDispatch();
	const supportedDeliveryLocation = useAppSelector(selectAllSupportedCurrency);

	const isClientInAfrica = false;
	const nairaCurrency: ICurrency = { name: 'Naira', symbol: 'NGN ₦', code: 'NGN' };

	let countriesCurrency: TCountryCurrency;

	const isLocationBased = LOCATIONID === deliveryLocation.country;

	if(isClientInAfrica) {
		countriesCurrency = { nigeria: nairaCurrency };
	}
	else {
		countriesCurrency = supportedDeliveryLocation;
	}

	const handleChangeCurrency = () => {
		setOpen((previousOpen) => !previousOpen);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChooseSelection = (userSelection: IDeliveryState) => {
		dispatch(setDeliveryLocation(userSelection));
		handleClose();
	};
      
	return (
		<>
			<StyledStack width={'fit-content'}>
				<NavigationHeaderButton 
					$fontWeight="600"
					aria-label="change product category"  
					onClick={handleChangeCurrency}
					variant="text"
					startIcon={locationIcon && <span><LocationSvg width={18} height={18} /></span>}
				>
					Delivering to {_.upperFirst(deliveryLocation.country)} 
					<ExpandMore sx={{ marginTop: '-4px' }}/>
				</NavigationHeaderButton>
				{ 
					!disableCurrency && <StyledTypography pl={1} mt={'-10px'}>
						Currency: {deliveryLocation.code} {deliveryLocation.symbol}
					</StyledTypography>
				}
			</StyledStack>
			<CurrencyList 
				open={open} 
				countriesCurrency={countriesCurrency}
				selection={deliveryLocation}
				isLocationBased={isLocationBased}
				handleClose={handleClose} 
				handleChooseSelection={handleChooseSelection}
			/>
		</>
	);
}

const StyledStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(1)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(0)
	}
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.lightshade,
	textAlign: 'left',
	fontFamily: 'Roboto',
	letterSpacing: '0.17px',
	fontSize: '14px',
	[theme.breakpoints.between('xs', 'sm')]: {
		fontSize: '12px',
	}
}));