import { Stack, styled, Button } from "@mui/material";
import ScrollableContainer from "./ScrollableContainer";
import { DESKTOP_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { AllMobileOnlyView } from "./CommonViews";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu, setActiveMenu } from "#state-management/slices/active-menu.slice.ts";
import { menus } from "#state-management/utils/index.ts";

export default function MenuContainer({ contentViewArea = '45px' }: { contentViewArea?: string }) {
	const activeMenuIndex = useAppSelector(selectActiveMenu);
	const dispatch = useAppDispatch();
	const handleMenuSelect = (index: number) => () => {
		dispatch(setActiveMenu(index));
	};
	return (
		<CustomStack height={contentViewArea}>
			<ScrollableContainer orientation="horizontal">
				<StyledStack direction={'row'} gap={2} flexGrow={1} >
					{
						menus.map((menu, index) => {
							if(index === 0 ){
								return  <AllMobileOnlyView key={index}>
									<MenuButton  $isActive={index === activeMenuIndex} onClick={handleMenuSelect(index)}>ALL</MenuButton>
								</AllMobileOnlyView>;
							}
							else return <MenuButton onClick={handleMenuSelect(index)} $isActive={index === activeMenuIndex} $isDeals={menu === 'DEALS'} key={index}>{menu}</MenuButton>;
						})
					}
				</StyledStack>
			</ScrollableContainer>
		</CustomStack>
	);
}

const CustomStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(1074)]: {
		width: '720px'
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		marginTop: theme.spacing(),
	},
}));

const StyledStack = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	paddingBottom: theme.spacing(0),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingBottom: theme.spacing(0),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingBottom: '0px',
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		paddingBottom: theme.spacing(1)
	}
}));

const MenuButton = styled(Button, {
	shouldForwardProp: prop => !['$isDeals', '$isActive'].includes(prop as string)
})<{ $isDeals?: boolean, $isActive: boolean }>(({ theme, $isDeals, $isActive })=> ({
	minWidth: '90px',
	fontFamily: 'Alata',
	fontSize: '24px',
	lineHeight: '133.4%',
	color: $isActive ? 'white' : $isDeals ? theme.palette.primaryOrange.main : theme.palette.primaryBlack.main,
	...($isActive && { backgroundColor: theme.palette.primaryOrange.main }),
	':hover': {
		color: 'white',
		backgroundColor: theme.palette.primaryOrange.main
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		backgroundColor: $isActive ? theme.palette.primaryOrange.main: 'white',
		borderRadius: '12px',
		padding: '4px 8px'
	},

}));