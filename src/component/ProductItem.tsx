import { Grid2, IconButton, Stack, styled } from "@mui/material";
import { ProductAvatar, ProductLocationPriceTypography, ProductNameTypography, ProductPriceTypography, ProductPromotionChip, ProductSavingTypography, ProductWeightTypography } from "./CommonViews";
import { IProductItemProps } from ".";
import ScrollableContainer from "./ScrollableContainer";
import GrommetWishListSvg from "./svg/GrommetWishlistSvg";
import { theme } from "#customtheme.ts";
import { useEffect, useState } from "react";
import ProductAddToCartControl from "./ProductAddToCartControl";

const getSavedPercent = (price: number, locationPrice: number) => {
	// return (Math.round((Math.abs(price - locationPrice)/locationPrice)*100));
	return Math.abs(price - locationPrice);
};
export default function ProductItem({ 
	item, 
	showPrice, 
	isCircularImage, 
	imageSize = { width: 224 }, 
	fullDetails,
	fontSize,
	fontWeight,
	contentArea = '200px',
	...otherProps
}: IProductItemProps) {
	const currency = 'CAD $';
	const [isWishListItem, setIsWishListItem] = useState<boolean>(false);

	useEffect(() => {
		setIsWishListItem(item.isWishListItem);
	},[item.isWishListItem]);

	const handleAddToWishlist = () => () => {
		const newWishListStatus = !isWishListItem;
		setIsWishListItem(newWishListStatus);
		//TODO send wishlist update to server
	};

	const price = item.promotion?.promoPrice || item.price;
	return (
		<Grid2 gap={2.5} position={'relative'} {...otherProps}>
			<Stack gap={2.5} position={'relative'}>
				{
					fullDetails && (
						<ProductPromotionWishlistStack $hasPromotion={Boolean(item.promotion)}>
							{
								item.promotion && <ProductPromotionChip label={item.promotion.promoName}/>
							}
							<WishLishIconButton onClick={handleAddToWishlist()}>
								<GrommetWishListSvg $isFilled={isWishListItem} $fillColor={theme.palette.primaryOrange.main}/>
							</WishLishIconButton>
						</ProductPromotionWishlistStack>
					)
				}
				<Stack gap={1}>
					<Stack borderRadius={1.5}  overflow={'hidden'}>
						<ScrollableContainer scrollableArea="100%" contentViewArea={contentArea} orientation="horizontal" float scrollBy={imageSize.width}>
							<Stack direction={'row'}>
								{
									item.images.map((image, index) => (
										<ProductAvatar 
											key={index}
											src={image || ''} 
											alt={item.name}
											variant={isCircularImage ? 'circular' : 'rounded'} 
											$size={imageSize}
										/>
									))
								}
							</Stack>
						</ScrollableContainer>
					</Stack>
			
					{
						fullDetails && (
							<Stack>
								<ProductNameTypography>
									{item.name}
								</ProductNameTypography>
								<ProductWeightTypography>
									{item.weight}
								</ProductWeightTypography>
								<Stack direction={'row'} alignItems={'center'} gap={1} pt={1}>
									<ProductLocationPriceTypography>
										African store near you
									</ProductLocationPriceTypography>
									<ProductLocationPriceTypography $strikeOut fontWeight={'bold'}>
										{currency}{item.locationPrice}
									</ProductLocationPriceTypography>
								</Stack>
							</Stack>
						)
					}
				</Stack>
				{
					showPrice && 
					<Stack direction={'row'} gap={1} alignItems={'baseline'}>
						<ProductPriceTypography $isPromotion={Boolean(item.promotion)} $fontSize={fontSize} $fontWeight={fontWeight}>
							{currency}{price}
						</ProductPriceTypography>
						{
							fullDetails && 
							<ProductSavingTypography>
								save CAD ${getSavedPercent(price, item.locationPrice)}
							</ProductSavingTypography>
						}
					</Stack>
				}
				{
					fullDetails && <ProductAddToCartControl />
				}

			</Stack>
		</Grid2>
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
	alignItems: 'center'
}));

const WishLishIconButton = styled(IconButton)({});