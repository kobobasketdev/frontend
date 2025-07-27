import { Stack, styled, Button, Popper, ClickAwayListener, Paper, Box, Grid } from "@mui/material";
import ScrollableContainer from "./ScrollableContainer";
import { DESKTOP_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { AllMobileOnlyView, FilterItem } from "./CommonViews";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu, selectIsShowMenu, selectProductCategories, setActiveMenu } from "#state-management/slices/active-menu.slice.ts";
import { useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import { useState, MouseEvent, SyntheticEvent } from "react";
import { TItem, TProductCategory } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getCategoryItems } from "./filters";

export default function MenuContainer({ contentViewArea = '45px' }: { contentViewArea?: string }) {
	const activeMenuIndex = useAppSelector(selectActiveMenu);
	const isShowMenu = useAppSelector(selectIsShowMenu);
	const productCategories = useAppSelector(selectProductCategories);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);
	const [hoverMenu, setHoverMenu] = useState<{ id?: number, name?: string }>({});
	const { data } = useQuery(getCategoryItems(hoverMenu.id));
	const previewItems: TItem[] = data?.data.data || [];
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleMenuSelect = (menu: TProductCategory) => (e: SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const activeMenuPosition = productCategories.findIndex(category => category.name === menu.name);
		dispatch(setActiveMenu(activeMenuPosition));
		if (menu.name === 'all') {
			navigate({
				to: RoutePath.HOME
			});
			return;
		}

		navigate({
			to: RoutePath.CATEGORY,
			params: { category: menu.name }
		});
	};

	const handleMouseHover = (menu: TProductCategory) => (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
		setHoverMenu({ id: menu.id, name: menu.name });
		setOpen(true);
	};

	const handleSeeMore = () => {
		navigate({
			to: RoutePath.CATEGORY,
			params: { category: hoverMenu.name! }
		});
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
									<StyledStack direction={'row'} gap={1} flexGrow={1} >
										{
											productCategories.map((menu, index) => {
												if (index === 0) {
													return <AllMobileOnlyView key={menu.id}>
														<MenuButton $isActive={menu.id === activeMenuIndex} onClick={handleMenuSelect(menu)}>ALL</MenuButton>
													</AllMobileOnlyView>;
												}
												else return <MenuButton aria-describedby={id}
													onMouseOver={handleMouseHover(menu)}
													onClick={handleMenuSelect(menu)}
													$isActive={index === activeMenuIndex}
													$isDeals={menu.name === 'deals'}
													key={menu.id}
												>{menu.name.toUpperCase()}</MenuButton>;
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
													{
														previewItems.length > 0 && previewItems.slice(0, 20).map(item => <Grid key={item.id}>
															<FilterItem title={item.name} imageSrc={item.images[0]?.url} href={`/products/${item.id}`} />
														</Grid>)
													}
												</Grid>
											</Stack>
											<Box pl={1}>
												<SeeMoreButton variant="contained" onClick={handleSeeMore}>
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
})<{ $isDeals?: boolean, $isActive: boolean }>(({ theme, $isDeals, $isActive }) => ({
	minWidth: '90px',
	fontFamily: 'Alata',
	fontSize: '24px',
	lineHeight: '133.4%',
	color: $isActive ? theme.palette.primaryBlack.moreDeeper : $isDeals ? theme.palette.primaryOrange.main : theme.palette.primaryBlack.main,
	...($isActive && { backgroundColor: 'rgba(120, 120, 128, 0.2)' }),
	':hover': {
		color: theme.palette.primaryBlack.moreDeeper,
		backgroundColor: 'rgba(120, 120, 128, 0.2)'
	},
	':focus': {
		color: theme.palette.primaryBlack.moreDeeper,
		backgroundColor: 'rgba(120, 120, 128, 0.2)'
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		backgroundColor: $isActive ? 'rgba(120, 120, 128, 0.2)' : 'inherit',
		borderRadius: '12px',
		fontSize: '1rem',
		padding: '4px 8px',
	},

}));