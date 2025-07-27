import { Stack, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, } from "react";
import { NavigationHeaderButton } from "./NavigationHeaderButton";
import LocationSvg from "./svg/LocationSvg";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { setDeliveryLocation, selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { upperFirst } from "lodash";
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import DeliveryCountryList from "./DeliveryCountryList";
import { selectSupportedCountries } from "#state-management/slices/supported-countries.ts";
import { useQuery } from "@tanstack/react-query";
import { getUserLocation } from "#hooks/query/country";
import { IDeliveryState } from "#utils/index.ts";

export default function DeliverySelection({ locationIcon }: { locationIcon?: boolean }) {
	const [open, setOpen] = useState(false);
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	const supportedDeliveryCountries = useAppSelector(selectSupportedCountries);
	const { data: userLocationData } = useQuery(getUserLocation());
	const userLocation = userLocationData?.data as { country: string, region: string };
	const dispatch = useAppDispatch();

	const isLocationBased = userLocation && userLocation.country === deliveryLocation.code;


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
				supportedCountries={supportedDeliveryCountries}
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
