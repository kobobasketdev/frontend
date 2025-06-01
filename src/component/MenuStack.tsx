import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";

import { styled, Box, Stack } from "@mui/material";
import { WebOnlyView } from "./CommonViews";
import FilterProduct from "./FilterProduct";
import MenuContainer from "./MenuContainer";
import NavigationUserActions from "./NavigationUserActions";

export default function MenuStack() {

	return (
		<>
			<MenuStackContainer width={1}>
				<ReverseDesktopNormalOnlyView>
					<FilterProduct />
				</ReverseDesktopNormalOnlyView>
				<MenuContainer />
				<WebOnlyView>
					<NavigationUserActions />
				</WebOnlyView>
			</MenuStackContainer>
		</>
	);
}

const ReverseDesktopNormalOnlyView = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(.5),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: 'unset',
		display: 'none'
	},
}));

const MenuStackContainer = styled(Stack)(({ theme }) => ({
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