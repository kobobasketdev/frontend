import { Box, Stack } from "@mui/material";
import AboutDropdown from "./AboutDropdown";
import DeliverySelection from "./DeliverySelection";
import { NavigationHeaderButton } from "./NavigationHeaderButton";

export default function WebTopNav() {
	return (
		<Stack direction={'row'} pt={.8} justifyContent={'right'}>
			<Box>
				<NavigationHeaderButton variant='text' $fontWeight='600'>
					Chat with us
				</NavigationHeaderButton>
			</Box>
			<AboutDropdown />
			<DeliverySelection />
		</Stack>
	);
}
