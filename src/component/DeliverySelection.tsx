import { Stack, styled, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, } from "react";
import { NavigationHeaderButton } from "./NavigationHeaderButton";
import LocationSvg from "./svg/LocationSvg";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { IDeliveryState, initialSupportedCountries, setDeliveryLocation, selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { upperFirst } from "lodash";
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import DeliveryCountryList from "./DeliveryCountryList";

const LOCATIONID = 'CA';

export default function DeliverySelection({ locationIcon }: { locationIcon?: boolean }) {
	const [open, setOpen] = useState(false);
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	const dispatch = useAppDispatch();

	const isLocationBased = LOCATIONID === deliveryLocation.code;


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
					Delivering to {upperFirst(deliveryLocation.country)}
					<ExpandMore sx={{ marginTop: '-4px' }} />
				</NavigationHeaderButton>
			</StyledStack>
			<DeliveryCountryList
				open={open}
				supportedCountries={initialSupportedCountries}
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