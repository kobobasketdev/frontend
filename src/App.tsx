import { CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled } from '@mui/material';
import Header from '#component/Header.tsx';
import MarketPlace from '#page/MarketPlace.tsx';
import Footer from '#page/Footer.tsx';
import { drawerWidth, NORMAL_PHONE_BREAKPOINT, SMALLDESKTOP_BREAKPOINT } from '#constants.tsx';
import { theme } from '#customtheme.ts';
import { ChevronLeft, ChevronRight, Inbox, Mail } from '@mui/icons-material';
import { useState } from 'react';

function App() {
	
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			<CssBaseline />
			<Header />
			<ContentBodyStack >
				<StyledStackContent >
					<MarketPlace />
				</StyledStackContent>
				<Footer />
			</ContentBodyStack>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
					},
				}}
				variant="persistent"
				anchor="right"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? <Inbox /> : <Mail />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			
		</>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(19.3),
	[theme.breakpoints.between('xs', SMALLDESKTOP_BREAKPOINT)] : {
		paddingTop: theme.spacing(26)
	},
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)] : {
		paddingTop: theme.spacing(32)
	},
}));
const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-start',
}));

const ContentBodyStack= styled('main')({
	position: 'relative',
	width: '900px',
	backgroundColor: 'red'
});
export default App;
