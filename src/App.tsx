import { CssBaseline, Stack, styled } from '@mui/material';
import Header from '#component/Header.tsx';
import Footer from '#page/Footer.tsx';
import { drawerWidth, TABLET_SCREEN_MAX_WIDTH } from '#constants.tsx';
import { useAppDispatch, useAppSelector } from '#state-management/hooks.ts';
import { closeCart, selectCartVisibile } from '#state-management/slices/cart.slice.ts';
import { getWindowWidth } from './utils';
import { Outlet } from '@tanstack/react-router';
import DrawerComponent from '#component/DrawerComponent.tsx';
import { useCallback, useEffect } from 'react';


function App() {
	const isCartOpen = useAppSelector(selectCartVisibile);
	const dispatch = useAppDispatch();

	const handleDrawerClose = useCallback(() => {
		dispatch(closeCart());
	}, [dispatch]);

	useEffect(() => {
		addEventListener('resize', handleDrawerClose);
		return () => {
			removeEventListener('resize', handleDrawerClose);
		};
	}, [handleDrawerClose]);
	
	return (
		<>
			<CssBaseline />
			<Header open={isCartOpen} />
			<Main open={isCartOpen} >
				<Outlet />
				<Stack>
					<Footer />
				</Stack>
			</Main>
			<DrawerComponent isCartOpen={isCartOpen} handleDrawerClose={handleDrawerClose}/>
		</>
	);
}



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
				marginRight: getWindowWidth() > TABLET_SCREEN_MAX_WIDTH ? drawerWidth : '0px',
			},
		},
	],
}));
  

export default App;
