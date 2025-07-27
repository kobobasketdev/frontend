import { Link } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import MenuStack from "./MenuStack";
import BrandLogoSvg from "./svg/BrandLogoSvg";
// import HambugerMenu from "./HambugerMenu";
import FilterProduct from "./FilterProduct";
import DeliverySelection from "./DeliverySelection";
import WebTopNav from "./WebTopNav";
import NavigationUserActions from "./NavigationUserActions";
import { DESKTOP_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Stack, styled, Toolbar, Box } from "@mui/material";
import HeaderSearchWrapper from "./HeaderSearchWrapper";




export default function HeaderWithSearch() {
	return (
		<CustomHeaderToolbar>
			<OutterContainerStack width={1} alignItems={'center'}>
				<HeaderWrapperStack gap={0}>
					<BrandHeaderStack>
						<DesktopScreenFilterBox>
							<FilterProduct />
						</DesktopScreenFilterBox>
						<CustomerLogoStack mb={1} flexGrow={1}>
							<Link to={RoutePath.HOME}>
								<Stack>
									<MobileBrandSvgContainer>
										<BrandLogoSvg width="144" height="40" viewBox="32 4 200 80" />
									</MobileBrandSvgContainer>
								</Stack>
								<BrandSvgContainer>
									<BrandLogoSvg width="250" height="40" viewBox="20 15 300 55" />
								</BrandSvgContainer>
							</Link>
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
							<HeaderSearchWrapper />
							{/* <MediumScreenUpOnlyView>
								<FilterProduct />
							</MediumScreenUpOnlyView> */}
						</SearchFilterContainer>
						<MobileViewDeliveryContainer>
							<DeliverySelection locationIcon />
							{/* <DesktopScreenFilterBox>
								<FilterProduct />
							</DesktopScreenFilterBox> */}
						</MobileViewDeliveryContainer>
					</HeaderSearchStack>
				</HeaderWrapperStack>
				<MenuStack />
			</OutterContainerStack>
		</CustomHeaderToolbar>
	);
}


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
	// [theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
	// 	justifyContent: 'center'
	// },
	// [theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
	// 	justifyContent: 'left'
	// }
}));

const BrandSvgContainer = styled('span')(({ theme }) => ({

	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const MobileBrandSvgContainer = styled('span')(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		display: 'inline-flex',
		alignItems: 'baseline',
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
		display: 'none'
	},
}));

const MobileViewDeliveryContainer = styled(Stack)(({ theme }) => ({
	display: 'none',

	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'right',
		alignItems: 'center',
		flexGrow: 1
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexGrow: 1,
		paddingLeft: theme.spacing(.6),
		paddingRight: theme.spacing(.5)
	},
}));

const DesktopScreenFilterBox = styled(Box)(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		display: 'inline'
	}
}));