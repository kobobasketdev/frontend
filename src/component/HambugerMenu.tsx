import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Stack, styled, Typography } from "@mui/material";
import { HighlightOff, Menu } from "@mui/icons-material";
import { AllMobileOnlyView } from "./CommonViews";
import { useState } from "react";

export default function HambugerMenu() {
	const [open, setOpen] = useState(false);
	const hambugerMenu = ['Create Account', 'Shipping and Delivery', 'Chat with us', 'Support and safety', 'About Kobobasket'];
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	return (
		<AllMobileOnlyView>
			<HambugerContainer>
				<IconButton onClick={toggleDrawer(true)}>
					<Menu />
				</IconButton>
			</HambugerContainer>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<Stack direction={'row'}  pt={1} height={1}>
					<Stack>
						<List disablePadding>
							{
								hambugerMenu.map((menu, index) => <ListItem key={index} disablePadding>
									<ListItemButton >
										<Typography fontFamily={'Roboto'} fontSize={'16px'}>{menu}</Typography>
									</ListItemButton>
								</ListItem>)
							}
						</List>
					</Stack>
					<Box>
						<IconButton onClick={toggleDrawer(false)}>
							<HighlightOff />
						</IconButton>
					</Box>
				</Stack>
			</Drawer>
		</AllMobileOnlyView>
	);
}

const HambugerContainer = styled('span')({
	display: 'inline-flex',
	alignItems: 'center',
});