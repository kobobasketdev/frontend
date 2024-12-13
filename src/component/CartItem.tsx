import { Stack } from "@mui/material";
import { ProductAvatar, ProductPriceTypography, ProductWeightTypography } from "./CommonViews";
import { TItem } from ".";
import CartItemControl from "./CartItemControl";

export default function CartItem({ item }: { item: TItem }) {
	const price = item.promotion?.promoPrice || item.price;
	const currency = 'CAD';
	const currencySymbol = '$';
	return (
		<Stack width={1} gap={1}>
			<Stack overflow={'hidden'} borderRadius={3}>
				<ProductAvatar src={item.images[0]} variant="rounded"/>
			</Stack>
			<ProductWeightTypography>
				{item.weight}
			</ProductWeightTypography>
			<ProductPriceTypography>
				{currency} {currencySymbol}{price}
			</ProductPriceTypography>
			<CartItemControl/>
		</Stack>
	);
}