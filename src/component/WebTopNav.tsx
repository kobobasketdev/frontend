import { Box, Stack } from "@mui/material";
import AboutDropdown from "./AboutDropdown";
import DeliverySelection from "./DeliverySelection";
import { NavigationHeaderButton } from "./NavigationHeaderButton";
import { useNavigate } from "@tanstack/react-router";

export default function WebTopNav() {
	const navigate = useNavigate();
	return (
		<Stack direction={'row'} pt={.8} justifyContent={'right'}>
			<Box>
				<NavigationHeaderButton variant='text' $fontWeight='600' onClick={() => {
					navigate({
						to: '/track'
					});
				}}>
					Track Order
				</NavigationHeaderButton>
			</Box>
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
