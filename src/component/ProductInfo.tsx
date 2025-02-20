import { Stack } from "@mui/material";
import { TItem } from "./types";
import { ProductNameTypography, ProductWeightTypography, ProductLocationPriceTypography, ProductLocationPriceSpan, ProductPriceTypography, ProductSavingTypography } from "./CommonViews";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";

const getSavedPercent = (price: number, locationPrice: number) => {
	return Math.abs(price - locationPrice);
};

// eslint-disable-next-line react-refresh/only-export-components
export const getProductPromotion = (item: TItem) => {
	const variantPromotion = item.variations.find(variant => Boolean(variant.promotion?.promoName));
	return variantPromotion?.promotion?.promoName || item.promotion?.promoName;
};

export default function ProductInfo({ 
	item,
	fullDetails,
	fontSize,
	fontWeight,
	showPrice, 
}: { item: TItem, 
	showPrice: boolean,
	fullDetails?: boolean,
	fontWeight?: string,
	fontSize?: string }) {
    
	const { code, symbol } = useAppSelector(selectDeliverLocation);
	const price = item.variations[0].promotion?.promoPrice || item.variations[0].price || item.promotion?.promoPrice || item.price;
	const itemPromotion = getProductPromotion(item);
	const locationPrice = item.variations[0].locationPrice || item.locationPrice;

	return (
		<Stack gap={1}>
			{
				fullDetails && 
				<Stack gap={.2}>
					<ProductNameTypography>
						{item.name}
					</ProductNameTypography>
					<Stack direction={'row'} gap={.5}>
						{
							item.variations.map((variation, index) => (
								<ProductWeightTypography key={index}>
									{variation.weight.value}{variation.weight.measurement}{index < item.variations.length - 1 && ','}
								</ProductWeightTypography>
							) )
						}
					</Stack>
					<Stack direction={'row'} alignItems={'center'} gap={1} pt={1}>
						<ProductLocationPriceTypography>
							Local market price near you {' '}
							<ProductLocationPriceSpan >
								{code} {symbol}{locationPrice}
							</ProductLocationPriceSpan>
						</ProductLocationPriceTypography>
					</Stack>
				</Stack>
			}
			
			{
				showPrice && 
				<Stack direction={'row'} gap={1} alignItems={'baseline'} flexWrap={'wrap'}>
					<ProductPriceTypography $isPromotion={Boolean(itemPromotion)} $fontSize={fontSize} $fontWeight={fontWeight}>
						{code} {symbol}{price}
					</ProductPriceTypography>
					{
						fullDetails && 
						<ProductSavingTypography>
							save {code} {symbol}{getSavedPercent(price, locationPrice)}
						</ProductSavingTypography>
					}
				</Stack>
			}
		</Stack>
	);
}