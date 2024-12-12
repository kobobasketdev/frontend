import { IconButton, Stack, styled } from "@mui/material";
import { ProductAvatar, ProductLocationPriceSpan, ProductLocationPriceTypography, ProductNameTypography, ProductPriceTypography, ProductPromotionChip, ProductSavingTypography, ProductWeightTypography } from "./CommonViews";
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
	fullDetails,
	fontSize,
	fontWeight,
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
		<Stack gap={2.5} position={'relative'}>
			{
				fullDetails && (
					<ProductPromotionWishlistStack $hasPromotion={Boolean(item.promotion)}>
						{
							item.promotion && <ProductPromotionChip label={item.promotion.promoName} size="small"/>
						}
						<WishLishIconButton onClick={handleAddToWishlist()}>
							<GrommetWishListSvg $isFilled={isWishListItem} $fillColor={theme.palette.primaryOrange.main}/>
						</WishLishIconButton>
					</ProductPromotionWishlistStack>
				)
			}
			<Stack gap={1}>
				<Stack>
					<ScrollableContainer orientation="horizontal" float height="200px">
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
									African store near you {' '}
									<ProductLocationPriceSpan >
										{currency}{item.locationPrice}
									</ProductLocationPriceSpan>
								</ProductLocationPriceTypography>
							</Stack>
						</Stack>
					)
				}
			</Stack>
			{
				showPrice && 
					<Stack direction={'row'} gap={1} alignItems={'baseline'} flexWrap={'wrap'}>
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

const WishLishIconButton = styled(IconButton)(({ theme }) => ({
	paddingRight: theme.spacing(1.5)
}));