import { drawerWidth, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Drawer, IconButton, Modal, styled } from "@mui/material";
import CartDisplay from "./CartDisplay";
import { useEffect, useState } from "react";
import { getWindowWidth } from "#utils/index.ts";

export default function DrawerComponent({ isCartOpen, handleDrawerClose }: { isCartOpen: boolean, handleDrawerClose: () => void }) {
	const [isModalDrawer, setIsModalDrawer] = useState<boolean>(false);

	useEffect(() => {
		setIsModalDrawer(!(getWindowWidth() >= TABLET_SCREEN_MAX_WIDTH));
	}, [isCartOpen]);
    
	return (
		<>
			{
				isModalDrawer ? (
					<Modal open={isCartOpen} onClose={handleDrawerClose} key={'modal'}>
						<Drawer
							sx={{
								width: drawerWidth,
								bgcolor: 'yellow',
								flexShrink: 0,
								'& .MuiDrawer-paper': {
									width: drawerWidth,
								},
							}}
							variant="persistent"
							anchor="right"
							open={isCartOpen}
						>
							<DrawerHeader>
								<IconButton onClick={handleDrawerClose} sx={{ padding: '0px' }}>
									{theme.direction === 'rtl' ? <ChevronLeft fontSize='medium'/> : <ChevronRight fontSize='large'/>}
								</IconButton>
							</DrawerHeader>
							<CartDisplay />
						</Drawer>
					</Modal>
				) : (
					<div key={'non-modal'}>
						<Drawer
							key={'non-modal'}
							sx={{
								width: drawerWidth,
								bgcolor: 'yellow',
								flexShrink: 0,
								'& .MuiDrawer-paper': {
									width: drawerWidth,
								},
							}}
							variant="persistent"
							anchor="right"
							open={isCartOpen}
						>
							<DrawerHeader>
								<IconButton onClick={handleDrawerClose} sx={{ padding: '0px' }}>
									{theme.direction === 'rtl' ? <ChevronLeft fontSize='medium'/> : <ChevronRight fontSize='large'/>}
								</IconButton>
							</DrawerHeader>
							<CartDisplay />
						</Drawer>
					</div>
				)
			}
		</>
	);
}

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-start',
}));