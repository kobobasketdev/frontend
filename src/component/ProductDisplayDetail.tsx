import { Stack, styled, Typography } from "@mui/material";
import { TItem } from "./types";
import { ProductNameTypography, ProductLocationPriceTypography, ProductLocationPriceSpan, ProductPriceTypography, ProductSavingTypography } from "./CommonViews";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";

const getSavedPercent = (price: number, locationPrice: number) => {
	return Math.abs(price - locationPrice);
};

export default function ProductDisplayDetail({ 
	item,
	fontSize,
	fontWeight,
}: { item: TItem, 
	fontWeight?: string,
	fontSize?: string }) {
    
	const { code, symbol } = useAppSelector(selectDeliverLocation);
	const price = item.promotion?.promoPrice || item.price;

	return (
		<StyledStack gap={2} p={1}>
			<Stack direction={'row'} gap={1} alignItems={'baseline'} flexWrap={'wrap'}>
				<ProductPriceTypography $isPromotion={Boolean(item.promotion)} $fontSize={fontSize} $fontWeight={fontWeight}>
					{code} {symbol}{price}
				</ProductPriceTypography> 
				<ProductSavingTypography>
					save {code} {symbol}{getSavedPercent(price, item.locationPrice)}
				</ProductSavingTypography>
				<ProductLocationPriceTypography>
					African store near you {' '}
					<ProductLocationPriceSpan >
						{code} {symbol}{item.locationPrice}
					</ProductLocationPriceSpan>
				</ProductLocationPriceTypography>
			</Stack>
			<Stack>
				<ProductNameTypography $fontSize="22px">
					{item.name}
				</ProductNameTypography>
				<Stack direction={'row'} gap={1} pt={1}>
					<StyledTypography>
						{item.productDetails}
					</StyledTypography>
				</Stack>
			</Stack>
		</StyledStack>
	);
}

const StyledStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(MEDIUM_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column-reverse',
	},
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.deeper,
	lineHeight: '127%',
	letterSpacing: '0.17px'
}));