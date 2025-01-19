import { AppBar, AppBarProps, Box, Slide, Stack, styled, Toolbar, useScrollTrigger  } from "@mui/material";
import HeaderSearch from "./HeaderSearch";
import WebTopNav from "./WebTopNav";
import NavigationUserActions from "./NavigationUserActions";
import { drawerWidth,  SMALL_SCREEN_MAX_WIDTH,  MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, DESKTOP_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH } from "#constants.tsx";
import FilterProduct from "./FilterProduct";
import { WebOnlyView } from "./CommonViews";
import DeliverySelection from "./DeliverySelection";
import MenuContainer from "./MenuContainer";
import { getWindowWidth } from "#utils/index.ts";
import BrandLogoSvg from "./svg/BrandLogoSvg";
import HambugerMenu from "./HambugerMenu";
import { useAppDispatch } from "#state-management/hooks.ts";
import { setShowHeader } from "#state-management/slices/active-menu.slice.ts";
import { useEffect } from "react";

interface Props {
	children: React.ReactElement<unknown>
}
function HideOnScroll({ children }: Props) {
	const dispatch = useAppDispatch();
	const trigger = useScrollTrigger ({
		target: window
	});
	
	useEffect(() => {
		console.log(trigger);
		dispatch(setShowHeader(!trigger));

	}, [trigger, dispatch]);
	
	return(
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function Header({ open }: { open?: boolean }) {
	return (
		<>
			<HideOnScroll>
				<StyledAppBar elevation={0} open={open}>
					<CustomHeaderToolbar>
						<OutterContainerStack width={1} alignItems={'center'}>
							<HeaderWrapperStack gap={0}>
								<BrandHeaderStack>
									<HambugerMenu />
									<CustomerLogoStack mb={1} flexGrow={1}>
										<MobileBrandSvgContainer>
											<BrandLogoSvg width="140" height="40" viewBox="40 4 200 80" />
										</MobileBrandSvgContainer>
										<BrandSvgContainer>
											<BrandLogoSvg width="250" height="40" viewBox="20 15 300 55" />
										</BrandSvgContainer>
									</CustomerLogoStack>
									<BrandWebTopButtonContainer>
										<WebTopNav />
									</BrandWebTopButtonContainer>
									<BrandHeaderActionContainer>
										<NavigationUserActions />
									</BrandHeaderActionContainer>
								</BrandHeaderStack>
								<HeaderSearchStack>
									<SearchFilterContainer>
										<HeaderSearch /> 
										<DesktopNormalOnlyView>
											<FilterProduct />
										</DesktopNormalOnlyView>
									</SearchFilterContainer>
									<MobileViewDeliveryContainer>
										<DeliverySelection locationIcon disableCurrency />
									</MobileViewDeliveryContainer>
								</HeaderSearchStack>
							</HeaderWrapperStack>
							<MenuStack width={1}>
								<ReverseDesktopNormalOnlyView>
									<FilterProduct />
								</ReverseDesktopNormalOnlyView>
								<MenuContainer />
								<WebOnlyView>
									<NavigationUserActions />
								</WebOnlyView>
							</MenuStack>
						</OutterContainerStack>
					</CustomHeaderToolbar>
				</StyledAppBar>
			</HideOnScroll>
		</>
	);
}

interface TAppBarProps extends AppBarProps {
	open?: boolean;
}

const StyledAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<TAppBarProps>(({ theme }) => ({
	backgroundColor: theme.palette.menuBackground.main,
	color: 'black',
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${getWindowWidth() > MEDIUM_SCREEN_MAX_WIDTH ? drawerWidth : 0}px)`,
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen * 5,
				}),
				marginRight: getWindowWidth() > MEDIUM_SCREEN_MAX_WIDTH ? drawerWidth : '0px',
			},
		},
	],
}));

const CustomHeaderToolbar = styled(Toolbar)(({ theme }) => ({
	padding: `${theme.spacing(0)} 0px ${theme.spacing(1.5)}`,
}));

const OutterContainerStack = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(1),
	gap: theme.spacing(.1),
}));

const HeaderWrapperStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row-reverse',
	alignItems: 'center',
	width: '100%',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column',
		alignItems: 'unset',
		width: '100%',
		padding: `0px ${theme.spacing(.5)}`
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		padding: `0px ${theme.spacing(.5)}`
	},
}));

const BrandHeaderStack = styled(Stack)(({ theme }) => ({
	flexGrow: 1,
	flexDirection: 'row',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		width: '100%',
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '100%',
	},
}));

const CustomerLogoStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	justifyContent: 'center',
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		alignItems: 'flex-end',
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		justifyContent: 'left',
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		justifyContent: 'center'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		justifyContent: 'left'
	}
}));

const BrandSvgContainer = styled('span')(({ theme }) => ({
	
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const MobileBrandSvgContainer = styled('span')(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		display: 'inline-flex'
	}
}));

const BrandHeaderActionContainer = styled(Box)(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		flexGrow: 0,
		display: 'flex',
		justifyContent: 'right',
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'right'
	},
}));

const DesktopNormalOnlyView = styled(Box)(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		display: 'inline-flex',
	},
}));

const ReverseDesktopNormalOnlyView = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(.5),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: 'unset',
		display: 'none'
	},
}));

const BrandWebTopButtonContainer = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(.5),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: 'unset',
		display: 'none'
	},
}));

const HeaderSearchStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		flexDirection: 'row',
		// padding: `0px ${theme.spacing(1)}`,
		gap: theme.spacing(.5),
		marginTop: '-4px'
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		flexDirection: 'column',
		// padding: `0px ${theme.spacing(1)}`,
		gap: theme.spacing(.5),
		marginTop: '-4px'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		flexDirection: 'column',
		// padding: `0px ${theme.spacing(1)}`,
		gap: theme.spacing(.5),
		marginTop: '-4px'
	}
}));

const SearchFilterContainer = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		// width: '100%',
		flexDirection: 'row',
		gap: theme.spacing(1.8),
		alignItems: 'center'
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		// width: '100%',
		flexDirection: 'row',
		gap: theme.spacing(1.8),
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		flexDirection: 'row',
		gap: theme.spacing(1.8),
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		flexDirection: 'row',
		gap: theme.spacing(1.8),
		alignItems: 'center'
	}
}));

const MobileViewDeliveryContainer = styled(Stack)(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'right',
		flexGrow: 1
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
		flexGrow: 1
	},
}));

const MenuStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	marginTop: theme.spacing(.5),
	width: '100%',
	padding: `0px ${theme.spacing(.5)}`,
	alignItems: 'center',
	justifyContent: 'space-between',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		marginTop: theme.spacing(.8),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		justifyContent: 'center',
		marginTop: '4px',
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		justifyContent: 'space-between',
		marginTop: '-18px',
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		marginTop: '-10px',
	}
}));



