import { ShopTypography, WishLishIconButton } from "#component/CommonViews.tsx";
import MiniNavigation from "#component/MiniNavigation.tsx";
import MiniPromotion from "#component/MiniPromotion.tsx";
import ProductItem from "#component/ProductItem.tsx";
import GrommetWishListSvg from "#component/svg/GrommetWishlistSvg.tsx";
import LargeWishlistSvg from "#component/svg/LargeWishlistSvg.tsx";
import WishlistRecommendation from "#component/WishlistRecommendation.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { removeFromWishlist, selectWishlistItems } from "#state-management/slices/wishlist.slice.ts";
import { items } from "#testData.ts";
import { RoutePath } from "#utils/route.ts";
import { ChevronRight } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, Stack, styled, SvgIcon, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function WishlistDisplay() {
	const wishlistItem = useAppSelector(selectWishlistItems);
	const wishlistArray = Object.keys(wishlistItem);
	const [firstRemoveId, setFirstRemoveId] = useState<string>('');
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const handleRemoveFromWishlist = (itemId: number) => () => {
		if(!firstRemoveId) {
			setFirstRemoveId(itemId+"");
			setOpenDialog(true);
			return;
		}
		dispatch(removeFromWishlist(itemId+""));
	};

	const handleOk = () => {
		dispatch(removeFromWishlist(firstRemoveId));
		setOpenDialog(false);
	};
    
	const handleCancel = () => {
		setFirstRemoveId('');
		setOpenDialog(false);
	};

	return (
		<StyledStackContent gap={2}>
			<ContainerCollection gap={1}>
				<MiniNavigation shouldHide>
					<StyledHeaderLink to={RoutePath.HOME}>
						<Stack direction={'row'} alignItems={'center'}>
							KOBOBASKET
							<ChevronRight />
						</Stack>
					</StyledHeaderLink>
					<StyledHeaderTypography textTransform={'uppercase'}>
						Wishlist
					</StyledHeaderTypography>
				</MiniNavigation>
			</ContainerCollection>
			{
				wishlistArray.length === 0 ? 
					(
						<>
							<EmptyStateTextStack gap={1}>
								<ShopTypography>
									WISHLIST
								</ShopTypography>
							</EmptyStateTextStack>
							<Stack justifyContent={'center'} alignItems={'center'}>
								<CustomSvgIcon viewBox="0 0 548 548">
									<LargeWishlistSvg />
								</CustomSvgIcon>
							</Stack>
						</>
					) : (

						<ContentStack>
							<Stack gap={2} >
								<Stack gap={1}>
									<ShopTypography>
										WISHLIST
									</ShopTypography>
								</Stack>
								<ProductItemGrid>
									{
										wishlistArray.map((wishItem, index) => (
											<CustomWishlistContainer key={index}>
												<ProductItem 
													item={wishlistItem[wishItem]} 
													showPrice={true} 
													disableWishlisting
													disableProductSlider
													showShareProduct={true}
													isCircularImage={false}
													fullDetails
													fontSize="24px"
													fontWeight="600"
												/>
												<WishlistCustomFloatingSpan>
													<WishLishIconButton onClick={handleRemoveFromWishlist(wishlistItem[wishItem].productId)}>
														<GrommetWishListSvg $isFilled={true} $fillColor={theme.palette.primaryOrange.main}/>
													</WishLishIconButton>
												</WishlistCustomFloatingSpan>
											</CustomWishlistContainer>
										))
									}
								</ProductItemGrid>
							</Stack>
						</ContentStack>
					)
			}
			<Stack gap={2} p={1} pl={2} pr={2} mt={6}>
				<ShopTypography>
					Best-sellers in the last 24 hours
				</ShopTypography>
				<WishlistRecommendation /> 
				<Stack mt={6}>
					<MiniPromotion title={"Kobo Specials Promo"} width={"inherit"} type={{
						name: 'scroll',
						spacing: 2,
						size: { height: '100px', width: '100px' },
						scollBy: 210,
					}} items={items} bgColor={theme.palette.menuBackground.main} showPrice  height="200px"/>
				</Stack>
			</Stack>
			<Dialog open={openDialog}>
				<DialogContent sx={{ textAlign: 'justify' }}>
					This item will be removed from your wishlist.
				</DialogContent>
				<DialogActions sx={{ display: 'flex', marginLeft: '0', justifyContent: 'space-around', padding: theme.spacing(2) }}>
					<CustomCancelButton autoFocus onClick={handleCancel} variant="outlined" color="inherit">
						Cancel
					</CustomCancelButton>
					<CustomConfirmButton onClick={handleOk} variant="contained">Remove Item</CustomConfirmButton>
				</DialogActions>
			</Dialog>
		</StyledStackContent>
	);
}

const CustomConfirmButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primaryOrange.main,
	textTransform: 'inherit'
}));

const CustomCancelButton = styled(Button)(() => ({
	textTransform: 'inherit'
}));
const WishlistCustomFloatingSpan = styled('span')(({ theme }) => ({
	position: 'absolute',
	top: '2px',
	right: '6px',
	zIndex: theme.zIndex.fab,
}));

const CustomWishlistContainer = styled('div')({
	position: 'relative',
});

const ContentStack = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	width: '100%',
	marginLeft: 'auto',
	marginRight: 'auto',
	[theme.breakpoints.down(447)] : {
		alignItems: 'unset'
	}
}));

const EmptyStateTextStack = styled(Stack)(({ theme }) => ({
	paddingLeft: theme.spacing(4),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(),
	} ,
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: 'unset',
		paddingLeft: theme.spacing(2.5)
	}, 
	[theme.breakpoints.down(600)]: {
		paddingLeft: theme.spacing(.5)
	} 
}));
const CustomSvgIcon = styled(SvgIcon)(({ theme }) => ({
	width: '100%',
	height: '400px',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		height: '300px'
	}
}));

const StyledHeaderLink = styled(Link)(({ theme }) => ({
	fontFamily: 'Roboto',
	fontWeight: '500',
	lineHeight: '166%',
	/* or 17px */
	letterSpacing: '0.4px',
	color: theme.palette.primaryBlack.disabled
}));

const StyledHeaderTypography = styled(Typography)(() => ({
	fontFamily: 'Roboto',
	fontWeight: '500',
	lineHeight: '133.4%',

	color: '#090909'
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(11),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(17.7)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(12)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(16)
	},
}));

const ContainerCollection = styled(Stack)(({ theme }) => ({
	width: '100%',
	[theme.breakpoints.up(MEDIUM_SCREEN_MAX_WIDTH)]: {
		maxWidth: '1000px',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
}));

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: '100%',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(1.5),
	padding: `0px ${theme.spacing(.3)}`,
	gridAutoFlow: 'row dense',
	gridTemplateColumns: "repeat(6,220PX)",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(4,220PX)",
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: `0px ${theme.spacing()}`,
		gridTemplateColumns: "repeat(4,minmax(185px, 220px))",
	},
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(1.5),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(3,minmax(185px, 220px))",
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(1.5),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(3,minmax(155px, 220px))",
	},
	[theme.breakpoints.down(690)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(2),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(2,minmax(155px, 220px))",
	},
	[theme.breakpoints.down(447)] : {
		columnGap: theme.spacing(1),
		justifyContent: 'space-around',
		gridTemplateColumns: "repeat(2, minmax(150px, auto))",
	}
}));