import { DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { RoutePath } from "#utils/route.ts";
import { Stack, styled, AppBar, Toolbar, Box } from "@mui/material";
import NavigationUserActions from "./NavigationUserActions";
import BrandLogoSvg from "./svg/BrandLogoSvg";
import { Link } from "@tanstack/react-router";

export default function HeaderWithouSearch({ hideNav = false }: { hideNav?: boolean }) {
	return (
		<StyledAppBar elevation={0}>
			<CustomHeaderToolbar>
				<OutterContainerStack width={1} alignItems={'center'}>
					<HeaderWrapperStack gap={0}>
						<BrandHeaderStack>
							<Stack mb={1} flexGrow={1}>
								<Link to={RoutePath.HOME}>
									<Stack>
										<MobileBrandSvgContainer>
											<BrandLogoSvg width="140" height="40" viewBox="40 4 200 80" />
										</MobileBrandSvgContainer>
									</Stack>
									<BrandSvgContainer>
										<BrandLogoSvg width="250" height="40" viewBox="20 15 300 55" />
									</BrandSvgContainer>
								</Link>
							</Stack>
							{
								!hideNav &&
								<BrandHeaderActionContainer>
									<NavigationUserActions />
								</BrandHeaderActionContainer>
							}
						</BrandHeaderStack>
					</HeaderWrapperStack>
				</OutterContainerStack>
			</CustomHeaderToolbar>
		</StyledAppBar>
	);
}

const StyledAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	backgroundColor: theme.palette.primaryGreen.lightshade,
	color: 'black',
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


const BrandSvgContainer = styled('span')(({ theme }) => ({

	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const MobileBrandSvgContainer = styled('span')(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		display: 'inline-flex',
		alignItems: 'baseline',
	}
}));

const BrandHeaderActionContainer = styled(Box)(({ theme }) => ({
	// display: 'none',
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