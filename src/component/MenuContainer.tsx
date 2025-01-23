import { Stack, styled, Button, Popper, ClickAwayListener, Paper, Box, Grid2 as Grid } from "@mui/material";
import ScrollableContainer from "./ScrollableContainer";
import { DESKTOP_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { AllMobileOnlyView, FilterItem } from "./CommonViews";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu, selectIsShowMenu, setActiveMenu } from "#state-management/slices/active-menu.slice.ts";
import { menus } from "#state-management/utils/index.ts";
import { useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import { useState, MouseEvent } from "react";

export default function MenuContainer({ contentViewArea = '45px' }: { contentViewArea?: string }) {
	const activeMenuIndex = useAppSelector(selectActiveMenu);
	const isShowMenu = useAppSelector(selectIsShowMenu);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const handleMenuSelect = (index: number) => () => {
		dispatch(setActiveMenu(index));
		if(index === 0) {
			navigate({
				to: RoutePath.HOME
			});
			return;
		}

		navigate({
			to: RoutePath.CATEGORY,
			params: { category: menus[index] }
		});
	};

	const handleMouseHover = () => (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const handleMouseLeave = () => () => {
		setAnchorEl(null);
		setOpen(false);
	};
	const handleClickAway = () => {
		setOpen(false);
	};
	const stopPropagation = () => (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation();
	};

	const canOpenCategory = open && Boolean(anchorEl);
	const id = canOpenCategory ? 'desktop-menu-hover' : undefined;
	return (
		<>
			{
				isShowMenu ?
					(
						<CustomDiv onMouseOver={handleMouseLeave()} 
							onMouseLeave={handleMouseLeave()}>
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
												else return <MenuButton aria-describedby={id} 
													onMouseOver={handleMouseHover()}
													onClick={handleMenuSelect(index)} 
													$isActive={index === activeMenuIndex} 
													$isDeals={menu === 'DEALS'} 
													key={index}
												>{menu}</MenuButton>;
											})
										}
									</StyledStack>
								</ScrollableContainer>
							</CustomStack>
							<StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom" 
								onMouseEnter={stopPropagation()}
								onMouseOver={stopPropagation()}
							>
								<ClickAwayListener onClickAway={handleClickAway}>
									<Paper elevation={2}>
										<Stack gap={1} pt={1} pb={1}>
											<Stack p={2} pt={1} 
												justifyContent={'center'}
												alignItems={'center'}
											>
												<Grid container spacing={4} maxWidth={'500px'}>
													<Grid >
														<FilterItem title={"Kilishi"} imageSrc={""} />
													</Grid>
													<Grid >
														<FilterItem title={"Cameroon Pepper"} imageSrc={""} />
													</Grid>
													<Grid >
														<FilterItem title={"Cray Fish"} />
													</Grid>
													<Grid >
														<FilterItem title={"Water Leaf"}  />
													</Grid>
													<Grid >
														<FilterItem title={"Local Spice"}  />
													</Grid>
													<Grid >
														<FilterItem title={"Palm Oil"} />
													</Grid>
													<Grid >
														<FilterItem title={"Beans Flour"} />
													</Grid>
													<Grid >
														<FilterItem title={"Cocoyam Flour"} />
													</Grid>
													<Grid >
														<FilterItem title={"Yellow Garri"} />
													</Grid>
													<Grid >
														<FilterItem title={"Ijebu White Garri"} />
													</Grid>
												</Grid>
											</Stack>
											<Box pl={1}>
												<SeeMoreButton variant="contained">
													See More
												</SeeMoreButton>
											</Box>
										</Stack>
									</Paper>
								</ClickAwayListener>
							</StyledPopper>
						</CustomDiv>
					) :
					(
						<div></div>
					)
			}
		</>
	);
}

const SeeMoreButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primaryYellow.main,
	color: theme.palette.primaryBlack.moreDeeper
}));
const StyledPopper = styled(Popper)(({ theme }) => ({
	zIndex: theme.zIndex.appBar,
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const CustomDiv = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	[theme.breakpoints.down(1074)]: {
		width: '720px'
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		marginTop: theme.spacing(),
	},
}));

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
	color: $isActive ? theme.palette.primaryBlack.moreDeeper : $isDeals ? theme.palette.primaryOrange.main : theme.palette.primaryBlack.main,
	...($isActive && { backgroundColor: theme.palette.primaryYellow.main }),
	':hover': {
		color: theme.palette.primaryBlack.moreDeeper,
		backgroundColor: theme.palette.action.hover
	},
	':focus': {
		color: theme.palette.primaryBlack.moreDeeper,
		backgroundColor: theme.palette.primaryYellow.main
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		backgroundColor: $isActive ? theme.palette.primaryYellow.main: 'white',
		borderRadius: '12px',
		padding: '4px 8px',
	},

}));