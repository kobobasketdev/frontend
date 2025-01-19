import { CssBaseline, Drawer, IconButton, Stack, styled } from '@mui/material';
import Header from '#component/Header.tsx';
import MarketPlace from '#page/MarketPlace.tsx';
import Footer from '#page/Footer.tsx';
import { DESKTOP_SCREEN_MAX_WIDTH, drawerWidth, MEDIUM_SCREEN_MAX_WIDTH } from '#constants.tsx';
import { theme } from '#customtheme.ts';
import { ChevronLeft, ChevronRight, } from '@mui/icons-material';
import CartDisplay from '#component/CartDisplay.tsx';
import { useAppDispatch, useAppSelector } from '#state-management/hooks.ts';
import { closeCart, selectCartVisibile } from '#state-management/slices/cart.slice.ts';
import { getWindowWidth } from './utils';
import GenericProduct from '#page/GenericProduct.tsx';


function App() {
	const isCartOpen = useAppSelector(selectCartVisibile);
	const dispatch = useAppDispatch();

	const handleDrawerClose = () => {
		dispatch(closeCart());
	};

	return (
		<>
			<CssBaseline />
			<Header open={isCartOpen} />
			<Main open={isCartOpen}>
				<StyledStackContent >
					{/* <MarketPlace /> */}
					<GenericProduct />
				</StyledStackContent>
				<Stack>
					<Footer />
				</Stack>
			</Main>
			<Drawer
				sx={{
					width: drawerWidth,
					bgcolor: 'yellow',
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						// border: '1px solid red',
					},
				}}
				variant="persistent"
				anchor="right"
				open={isCartOpen}
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
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(16),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(23)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(26)
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
				marginRight: getWindowWidth() > MEDIUM_SCREEN_MAX_WIDTH ? drawerWidth : '0px',
			},
		},
	],
}));
  

export default App;
