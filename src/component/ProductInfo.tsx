import { Stack } from "@mui/material";
import { TItem } from "./types";
import { ProductNameTypography, ProductWeightTypography, ProductLocationPriceTypography, ProductLocationPriceSpan, ProductPriceTypography, ProductSavingTypography } from "./CommonViews";
import { appCurrencySymbol } from "#utils/index.ts";

const getSavedPercent = (price: number, locationPrice: number) => {
	return Math.abs(price - locationPrice);
};


export default function ProductInfo({
	item,
	fullDetails,
	fontSize,
	fontWeight,
	showPrice,
}: {
	item: TItem,
	showPrice: boolean,
	fullDetails?: boolean,
	fontWeight?: string,
	fontSize?: string
}) {

	const code = item.variations[0].price.currency;
	const symbol = appCurrencySymbol[code];
	const minimumPrice = Math.min(...item.variations.map(variation => variation.price.converted));
	const hasPromotion = Boolean(item.promotion);
	const minimumMarktPrice = Math.min(...item.variations.map(variation => variation.marketPrice?.converted || 0));
	const shouldShowSaving = minimumMarktPrice > minimumPrice;
	return (
		<Stack gap={1}>
			{
				fullDetails &&
				<Stack gap={.2}>
					<ProductNameTypography>
						{item.name}
					</ProductNameTypography>
					<Stack direction={'row'} gap={.5} flexWrap={'wrap'}>
						{
							item.variations.map((variation, index) => (
								<ProductWeightTypography key={index}>
									{variation.size || `${variation.weight}kg`}{index < item.variations.length - 1 && ','}
								</ProductWeightTypography>
							))
						}
					</Stack>
					<Stack direction={'row'} alignItems={'center'} gap={1} pt={1}>
						<ProductLocationPriceTypography>
							Local price near you {' '}
							<ProductLocationPriceSpan>
								{code} {symbol}{minimumMarktPrice}
							</ProductLocationPriceSpan>
						</ProductLocationPriceTypography>
					</Stack>
				</Stack>
			}

			{
				showPrice &&
				<Stack direction={'row'} gap={1} alignItems={'baseline'} flexWrap={'wrap'}>
					<ProductPriceTypography $isPromotion={hasPromotion} $fontSize={fontSize} $fontWeight={fontWeight}>
						{code} {symbol}{minimumPrice}
					</ProductPriceTypography>
					{
						fullDetails && shouldShowSaving &&
						<ProductSavingTypography>
							save {code} {symbol}{getSavedPercent(minimumPrice, minimumMarktPrice)}
						</ProductSavingTypography>
					}
				</Stack>
			}
		</Stack>
	);
}