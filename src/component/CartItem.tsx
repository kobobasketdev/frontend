import { Stack } from "@mui/material";
import { ProductAvatar, ProductPriceTypography, ProductWeightTypography } from "./CommonViews";
import { TItem } from "./types";
import CartItemControl from "./CartItemControl";
import { selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { useAppSelector } from "#state-management/hooks.ts";

export default function CartItem({ item, quantity }: { item: TItem, quantity: number }) {
	const price = item.promotion?.promoPrice || item.price;
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	
	return (
		<Stack width={1} gap={1}>
			<Stack overflow={'hidden'} borderRadius={3}>
				<ProductAvatar src={item.images[0]} variant="rounded"/>
			</Stack>
			<ProductWeightTypography>
				{item.weight.value}{item.weight.measurement}
			</ProductWeightTypography>
			<ProductPriceTypography>
				{deliveryLocation.code} {deliveryLocation.symbol}{price}
			</ProductPriceTypography>
			<CartItemControl quantity={quantity} productId={item.productId}/>
		</Stack>
	);
}