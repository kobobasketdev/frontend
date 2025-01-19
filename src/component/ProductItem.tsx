import { IconButton, Stack, styled } from "@mui/material";
import { ProductAvatar, ProductPromotionChip } from "./CommonViews";
import { IProductItemProps, TItem } from "./types";
import ScrollableContainer from "./ScrollableContainer";
import GrommetWishListSvg from "./svg/GrommetWishlistSvg";
import { theme } from "#customtheme.ts";
import { useEffect, useState } from "react";
import ProductAddToCartControl from "./ProductAddToCartControl";
import ProductInfo from "./ProductInfo";
import { SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useAppDispatch } from "#state-management/hooks.ts";
import { addToWishlist, removeFromWishlist } from "#state-management/slices/wishlist.slice.ts";


export default function ProductItem({ 
	item, 
	showPrice, 
	isCircularImage, 
	fullDetails,
	fontSize,
	fontWeight,
}: IProductItemProps) {
	const dispatch = useAppDispatch();
	const [isWishListItem, setIsWishListItem] = useState<boolean>(false);

	useEffect(() => {
		setIsWishListItem(item.isWishListItem);
	},[item.isWishListItem]);

	const handleAddToWishlist = (item: TItem) => () => {
		if(isWishListItem) {
			dispatch(removeFromWishlist(""+item.productId));
		}
		else {
			dispatch(addToWishlist(item));
		}
		const newWishListStatus = !isWishListItem;
		setIsWishListItem(newWishListStatus);
	};

	return (
		<Stack gap={2.5} position={'relative'}>
			{
				fullDetails && (
					<ProductPromotionWishlistStack $hasPromotion={Boolean(item.promotion)}>
						{
							item.promotion && <ProductPromotionChip label={item.promotion.promoName} size="small"/>
						}
						<WishLishIconButton onClick={handleAddToWishlist(item)}>
							<GrommetWishListSvg $isFilled={isWishListItem} $fillColor={theme.palette.primaryOrange.main}/>
						</WishLishIconButton>
					</ProductPromotionWishlistStack>
				)
			}
			<Stack gap={1}>
				<Stack borderRadius={3} overflow={'hidden'}>
					<ScrollableContainer orientation="horizontal" float  fullContent>
						{
							item.images.map((image, index) => (
								<Stack key={index}>
									<ProductAvatar 
										key={index}
										src={image || ''} 
										alt={item.name}
										variant={isCircularImage ? 'circular' : 'rounded'} 
									/>
								</Stack>
							))
						}
					</ScrollableContainer>
				</Stack>
			
				<ProductInfo item={item} showPrice={showPrice} fullDetails={fullDetails} fontSize={fontSize} fontWeight={fontWeight} />
			</Stack>
			{
				fullDetails && <ProductAddToCartControl item={item}/>
			}

		</Stack>
	);
}

const ProductPromotionWishlistStack = styled(Stack,{
	shouldForwardProp: prop => prop !== '$hasPromotion'
})<{ $hasPromotion: boolean }>(({ theme, $hasPromotion })=>({
	position: 'absolute',
	width: '100%',
	top: '0px',
	zIndex: theme.zIndex.fab,
	padding: theme.spacing(1),
	flexDirection: 'row',
	justifyContent: $hasPromotion ? 'space-between' : 'right',
	alignItems: 'center',
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)] : {
		padding: theme.spacing(0.3)
	}
}));

const WishLishIconButton = styled(IconButton)(({ theme }) => ({
	paddingRight: theme.spacing(1.5)
}));