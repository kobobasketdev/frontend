import { Stack } from "@mui/material";
import { TItem } from "./types";
import { ProductNameTypography, ProductWeightTypography, ProductLocationPriceTypography, ProductLocationPriceSpan, ProductPriceTypography, ProductSavingTypography } from "./CommonViews";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";

const getSavedPercent = (price: number, locationPrice: number) => {
	return Math.abs(price - locationPrice);
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
	const price = item.promotion?.promoPrice || item.price;

	return (
		<Stack gap={2.5}>
			{
				fullDetails && 
				<Stack>
					<ProductNameTypography>
						{item.name}
					</ProductNameTypography>
					<ProductWeightTypography>
						{item.weight.value}{item.weight.measurement}
					</ProductWeightTypography>
					<Stack direction={'row'} alignItems={'center'} gap={1} pt={1}>
						<ProductLocationPriceTypography>
							African store near you {' '}
							<ProductLocationPriceSpan >
								{code} {symbol}{item.locationPrice}
							</ProductLocationPriceSpan>
						</ProductLocationPriceTypography>
					</Stack>
				</Stack>
			}
			
			{
				showPrice && 
				<Stack direction={'row'} gap={1} alignItems={'baseline'} flexWrap={'wrap'}>
					<ProductPriceTypography $isPromotion={Boolean(item.promotion)} $fontSize={fontSize} $fontWeight={fontWeight}>
						{code} {symbol}{price}
					</ProductPriceTypography>
					{
						fullDetails && 
						<ProductSavingTypography>
							save {code} {symbol}{getSavedPercent(price, item.locationPrice)}
						</ProductSavingTypography>
					}
				</Stack>
			}
		</Stack>
	);
}