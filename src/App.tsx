import { CssBaseline, Drawer, IconButton, Stack, styled } from '@mui/material';
import Header from '#component/Header.tsx';
import MarketPlace from '#page/MarketPlace.tsx';
import Footer from '#page/Footer.tsx';
import { drawerWidth, NORMAL_PHONE_BREAKPOINT, SMALLDESKTOP_BREAKPOINT } from '#constants.tsx';
import { theme } from '#customtheme.ts';
import { ChevronLeft, ChevronRight, } from '@mui/icons-material';
import { useState } from 'react';
import CartDisplay from '#component/CartDisplay.tsx';

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
			<Header open={open} />
			<Main open={open}>
				<StyledStackContent >
					<MarketPlace />
				</StyledStackContent>
				<Footer />
			</Main>
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
				<CartDisplay />
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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme }) => ({
	overflow: 'auto',
	flexGrow: 1,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	// marginRight: -drawerWidth,
	/**
	 * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
	 * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
	 * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
	 * proper interaction with the underlying content.
	 */
	position: 'relative',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginRight: drawerWidth,
			},
		},
	],
}));
  
const ContentBodyStack= styled('main')({
	position: 'relative',
	width: 'auto',
	backgroundColor: 'red'
});
export default App;
