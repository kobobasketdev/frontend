import { AppBar, AppBarProps, IconButton, Slide, Stack, styled, Toolbar, Typography, useScrollTrigger  } from "@mui/material";
import HeaderSearch from "./HeaderSearch";
import WebTopNav from "./WebTopNav";
import NavigationUserActions from "./NavigationUserActions";
import { Menu } from '@mui/icons-material';
import { drawerWidth, NORMAL_PHONE_BREAKPOINT, SMALLDESKTOP_BREAKPOINT, TABLET_BREAKPOINT, XTRA_SMALL_PHONE_BREAKPOINT } from "#constants.tsx";
import FilterProduct from "./FilterProduct";
import { LargeMobileOnlyView, AllMobileOnlyView, WebOnlyView, SmallDesktopOnlyView, LargeDesktopOnlyView } from "./CommonViews";
import DeliverySelection from "./DeliverySelection";
import MenuContainer from "./MenuContainer";

interface Props {
	children: React.ReactElement<unknown>
}
function HideOnScroll({ children }: Props) {
	const trigger = useScrollTrigger ({
		target: window
	});

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
					<Toolbar>
						<Stack width={1} alignItems={'center'} >
							<HeaderWrapperStack width={.95} gap={2}>
								<StyledStackBrand>
									<StyledStack direction={'row'} flexGrow={1}>
										<AllMobileOnlyView>
											<HambugerContainer>
												<IconButton>
													<Menu />
												</IconButton>
											</HambugerContainer>
										</AllMobileOnlyView>
										<StyledTypography flex={1}>
											KOBOBASKET
										</StyledTypography>
										<WebOnlyView>
											<WebTopNav />
										</WebOnlyView>
										<LargeMobileOnlyView>
											<NavigationUserActions />
										</LargeMobileOnlyView>
									</StyledStack>
									<StyledSearchStack>
										<SearchHolderStack  gap={2}>
											<HeaderSearch /> 
											<SmallDesktopOnlyView>
												<FilterProduct />
											</SmallDesktopOnlyView>
										</SearchHolderStack>
										<LargeMobileOnlyView>
											<DeliverySelection locationIcon disableCurrency />
										</LargeMobileOnlyView>
									</StyledSearchStack>
								</StyledStackBrand>
								<Stack direction={'row'} alignItems={'center'}>
									<LargeDesktopOnlyView>
										<FilterProduct />
									</LargeDesktopOnlyView>
									<MenuContainer />
									<WebOnlyView>
										<NavigationUserActions />
									</WebOnlyView>
								</Stack>
							</HeaderWrapperStack>
						</Stack>
					</Toolbar>
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
				width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginRight: drawerWidth,
			},
		},
	],
}));

const HeaderWrapperStack = styled(Stack)(({ theme }) => ({
	padding: theme.spacing(2),
	paddingBottom: theme.spacing(1.2),
	paddingLeft: theme.spacing(0),
	paddingRight: theme.spacing(0),
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)] : {
		padding: theme.spacing(2),
		paddingBottom: theme.spacing(1.2),
		
		width: '100%',
	},
	[theme.breakpoints.between('xs', XTRA_SMALL_PHONE_BREAKPOINT)] : {
		paddingBottom: theme.spacing(1.2),
		width: 'fit-content',
		minWidth: '320px',
	}
}));

const StyledStackBrand = styled(Stack)(({ theme }) => ({
	flexDirection: 'row-reverse',
	gap: theme.spacing(2),
	justifyContent: 'center',
	alignItems: 'center',
	[theme.breakpoints.between('xs', SMALLDESKTOP_BREAKPOINT)] : {
		flexDirection: 'column',
		justifyContent: 'unset',
		alignItems: 'unset',
		gap: theme.spacing(1),
	}
}));

const StyledSearchStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	width: 'fit-content', 
	flexWrap: 'wrap',
	alignItems: 'center',
	[theme.breakpoints.between(NORMAL_PHONE_BREAKPOINT, TABLET_BREAKPOINT)] : {
		alignSelf: 'center',
		width: '100%', 
		justifyContent: 'space-between',
		gap: theme.spacing(1.5),
	},
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)] : {
		width: '70%',
		minWidth: '360px',
		alignSelf: 'center',
		alignItems: 'space-evenly',
		gap: theme.spacing(.5),
	},
	[theme.breakpoints.between('xs', XTRA_SMALL_PHONE_BREAKPOINT)] : {
		width: '300px',
		minWidth: '300px',
	}
}));

const SearchHolderStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row', 
	alignItems: 'center',
	[theme.breakpoints.between('xs', XTRA_SMALL_PHONE_BREAKPOINT)] : {
		flexDirection: 'column', 
		alignItems: 'unset',
		gap: theme.spacing(1.5)
	}
}));

const StyledStack = styled(Stack)(({ theme }) => ({
	justifyContent: 'space-evenly',
	[theme.breakpoints.between('xs', TABLET_BREAKPOINT)] : {
		justifyContent: 'space-between',
	}
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryOrange.main,
	fontFamily: 'Alata',
	fontSize: '48px',
	letterSpacing: '-0.03em',
	lineHeight: '66px',
	textAlign: 'center',
	[theme.breakpoints.between(TABLET_BREAKPOINT, SMALLDESKTOP_BREAKPOINT)] : {
		textAlign: 'left',
	},
	[theme.breakpoints.between('xs', 'sm')] : {
		textAlign: 'center',
		fontSize: '28px',
	},
	[theme.breakpoints.between('xs', XTRA_SMALL_PHONE_BREAKPOINT)] : {
		textAlign: 'left',
		paddingLeft: theme.spacing(4),
		fontSize: '28px',
	}
}));

const HambugerContainer = styled('span')({
	display: 'inline-flex',
	alignItems: 'center',
});

