import { Alert, Button, IconButton, Stack, styled } from "@mui/material";
import { ProductAvatar, ProductPromotionChip, WishLishIconButton } from "./CommonViews";
import { IProductItemProps, TItem } from "./types";
import ScrollableContainer from "./ScrollableContainer";
import GrommetWishListSvg from "./svg/GrommetWishlistSvg";
import { useContext } from "react";
import ProductAddToCartControl from "./ProductAddToCartControl";
import ProductInfo from "./ProductInfo";
import { MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useAppDispatch } from "#state-management/hooks.ts";
import { RoutePath } from "#utils/route.ts";
import { useNavigate } from "@tanstack/react-router";
import { setShowMenu } from "#state-management/slices/active-menu.slice.ts";
import { Check, IosShare } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { setAddToCartPopup } from "#state-management/slices/cart.slice.ts";
import { WishlistIdContext } from "#utils/context.ts";
import { useWishlistMutation } from "#hooks/mutations/wishlist";


export default function ProductItem({
	item,
	showPrice,
	isCircularImage,
	fullDetails,
	fontSize,
	fontWeight,
	showShareProduct = false,
	disableProductSlider = false,
	disableWishlisting = false
}: IProductItemProps) {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const isLoggedIn = Boolean(localStorage.getItem('access_token'));
	const { addToWishlist, removeFromWishlist } = useWishlistMutation();
	const wishlistIdsSet = useContext(WishlistIdContext);
	const isWishlistItem = wishlistIdsSet.has(item.id + '');

	const handleAddToCartPopup = (item: TItem) => {
		dispatch(setAddToCartPopup(item));
	};

	const handleAddToWishlist = (item: TItem) => () => {
		if (isWishlistItem) {
			removeFromWishlist.mutateAsync(item.id);
		}
		else {
			addToWishlist.mutateAsync(item.id);
		}
	};

	const handleGotoProductDetails = (itemId: string) => () => {
		dispatch(setShowMenu(false));
		navigate({
			to: RoutePath.PRODUCT_DISPLAY,
			params: { details: itemId + "" }
		});
	};

	const handleCopyToClipBoard = (itemId: string) => () => {
		navigator.clipboard.writeText(location.origin + "/products/" + itemId);

		enqueueSnackbar(<Alert icon={<Check fontSize="inherit" />} severity="success">
			Product link copied to clipboard
		</Alert>, {
			anchorOrigin: { horizontal: 'right', vertical: 'top' },
			style: { backgroundColor: 'rgb(237, 247, 237)', padding: '0px 0px', }
		});
	};

	return (
		<Stack gap={1} position={'relative'}>
			{
				fullDetails && item.promotion_id !== 1 && (
					<ProductPromotionWishlistStack $hasPromotion={Boolean(item.promotion)} $disableWishlisting={disableWishlisting}>
						{
							item.promotion && <ProductPromotionChip label={item.promotion.title} size="small" />
						}
						{
							!disableWishlisting && isLoggedIn &&
							<WishLishIconButton onClick={handleAddToWishlist(item)}>
								<GrommetWishListSvg $isFilled={isWishlistItem} />
							</WishLishIconButton>

						}
					</ProductPromotionWishlistStack>
				)
			}
			<Stack gap={1}>
				<Stack borderRadius={3} overflow={'hidden'} position={'relative'} onClick={handleGotoProductDetails(item.id)}>
					{
						disableProductSlider ? (
							<Stack>
								<ProductAvatar
									src={item.images[0]?.url || ''}
									alt={item.name}
									variant={isCircularImage ? 'circular' : 'rounded'}
								/>
							</Stack>
						) : (
							<ScrollableContainer orientation="horizontal" float fullContent>
								{
									item.images.map((image, index) => (
										<Stack key={index}>
											<ProductAvatar
												key={index}
												src={image.url}
												alt={item.name}
												variant={isCircularImage ? 'circular' : 'rounded'}
											/>
										</Stack>
									))
								}
							</ScrollableContainer>
						)
					}

					{
						showShareProduct &&
						<CustomFloatingSpan>
							<ProductShareCustomIconButton onClick={handleCopyToClipBoard(item.id)}>
								<IosShare />
								<ProductShareCustomSpan >
									Share
								</ProductShareCustomSpan>
							</ProductShareCustomIconButton>
						</CustomFloatingSpan>
					}
					{/* <Link to={RoutePath.PRODUCT_DISPLAY} params={ { details: item.productId+"" } }>
					</Link> */}
				</Stack>
				<StyledProductButton disableRipple onClick={handleGotoProductDetails(item.id)}>
					<ProductInfo item={item} showPrice={showPrice} fullDetails={fullDetails} fontSize={fontSize} fontWeight={fontWeight} />
				</StyledProductButton>
			</Stack>
			{
				fullDetails && <ProductAddToCartControl item={item} choosenVariant={0} handleOnAddToCart={handleAddToCartPopup} />
			}

		</Stack>
	);
}

const CustomFloatingSpan = styled('span')({
	position: 'absolute',
	bottom: '6px',
	right: '6px'
});

const ProductShareCustomIconButton = styled(IconButton)(({ theme }) => ({
	boxSizing: 'border-box',
	backgroundColor: 'rgba(255, 255, 255, 0.82)',
	boxShadow: '0px 2px 11.4px rgba(0, 0, 0, 0.1)',
	fontWeight: 'normal',
	borderRadius: '30px',
	fontFamily: 'Roboto',
	color: 'black',
	paddingLeft: '15px',
	paddingRight: '15px',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		'& svg': {
			height: '20px',
		}
	}
}));

const ProductShareCustomSpan = styled('span')(({ theme }) => ({
	display: 'inline-flex',
	marginLeft: theme.spacing(.5),
	fontSize: '1rem',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		fontSize: '14px'
	}
}));

const StyledProductButton = styled(Button)({
	textAlign: 'left',
	textTransform: 'unset',
	':hover': {
		backgroundColor: 'transparent'
	}
});
const ProductPromotionWishlistStack = styled(Stack, {
	shouldForwardProp: prop => !['$hasPromotion', '$disableWishlisting'].includes(prop as string)
})<{ $hasPromotion: boolean, $disableWishlisting: boolean }>(({ theme, $hasPromotion, $disableWishlisting }) => ({
	position: 'absolute',
	width: '100%',
	top: '0px',
	zIndex: 1,
	padding: theme.spacing(1),
	flexDirection: 'row',
	justifyContent: $hasPromotion ? 'space-between' : 'right',
	alignItems: 'center',
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		padding: theme.spacing(0.3),
		top: $disableWishlisting ? '5px' : '0px',

	}
}));

