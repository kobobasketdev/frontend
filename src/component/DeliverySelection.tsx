import { Stack, styled, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState,  } from "react";
import { CurrencySelection } from ".";
import CurrencyList from "./CurrencyList";
import { NavigationHeaderButton } from "./NavigationHeaderButton";
import LocationSvg from "./svg/LocationSvg";

const LOCATIONID = 1;

export default function DeliverySelection({ locationIcon, disableCurrency }: { locationIcon?: boolean, disableCurrency?: boolean }) {
	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState<CurrencySelection>({
		id: 1,
		name: 'Canadian Dollar',
		currency: 'CAD $',
		country: 'Canada'
	});

	const isClientInAfrica = false;
	const nairaCurrency = { id: 5, name: 'Naira', currency: 'NGN ₦', country: 'Nigeria' };

	let currencyList: CurrencySelection[];
	//TODO: Get currency and location list from query
	const foreignCurrencyList: CurrencySelection[] = [
		{ id: 1, name: 'Canadian Dollar', currency: 'CAD $', country: 'Canada' }, 
		{ id: 2, name: 'United States Dollar', currency: 'USD $', country: 'United States' }, 
		{ id: 3, name: 'Pounds Sterling', currency: 'GBP £', country: 'United Kingdom' }, 
		{ id: 4, name: 'Euro', currency: 'EUR €', country: 'Germany' }
	];

	const isLocationBased = LOCATIONID === selection.id;

	if(isClientInAfrica) {
		currencyList = [nairaCurrency];
	}
	else {
		currencyList = [...foreignCurrencyList];
	}

	const handleChangeCurrency = () => {
		setOpen((previousOpen) => !previousOpen);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChooseSelection = (userSelection: CurrencySelection) => {
		setSelection({ ... userSelection });
		handleClose();
	};
      
	return (
		<>
			<Stack width={'fit-content'}>
				<NavigationHeaderButton 
					$fontWeight="600"
					aria-label="change product category"  
					onClick={handleChangeCurrency}
					variant="text"
					startIcon={locationIcon && <span><LocationSvg width={18} height={18} /></span>}
					endIcon={
						<ExpandMore />
					}
				>
					Delivering to {selection.country}
				</NavigationHeaderButton>
				{ 
					!disableCurrency && <StyledTypography pl={1} mt={'-10px'}>
						Currency: {selection.currency}
					</StyledTypography>
				}
			</Stack>
			<CurrencyList 
				open={open} 
				currencyList={currencyList}
				selection={selection}
				isLocationBased={isLocationBased}
				handleClose={handleClose} 
				handleChooseSelection={handleChooseSelection}
			/>
		</>
	);
}



const StyledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.lightshade,
	textAlign: 'left',
	fontFamily: 'Roboto',
	letterSpacing: '0.17px',
	fontSize: '14px',
	[theme.breakpoints.between('xs', 'sm')]: {
		fontSize: '12px'
	}
}));