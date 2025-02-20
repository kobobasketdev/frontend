import { Stack, styled, Typography } from "@mui/material";
import { ProductAvatar, ProductPriceTypography } from "./CommonViews";
import { TItem } from "./types";
import CartItemControl from "./CartItemControl";
import { selectDeliverLocation } from "#state-management/slices/delivery.slice.ts";
import { useAppSelector } from "#state-management/hooks.ts";

export default function CartItem({ variant, item, quantity }: { variant: number, item: TItem, quantity: number }) {
	const price = item.variations[variant].promotion?.promoPrice || item.variations[variant].price;
	const deliveryLocation = useAppSelector(selectDeliverLocation);
	
	return (
		<Stack width={1} gap={1}>
			<Stack overflow={'hidden'} borderRadius={3}>
				<ProductAvatar src={item.images[0]} variant="rounded"/>
			</Stack>
			<Stack direction={'row'}>
				<CustomSpan>
					<Typography fontSize={'14px'}>
						{item.variations[variant].weight.value}{item.variations[variant].weight.measurement}
					</Typography>
				</CustomSpan>
			</Stack>
			<ProductPriceTypography>
				{deliveryLocation.code} {deliveryLocation.symbol}{price}
			</ProductPriceTypography>
			<CartItemControl variant={variant} productId={item.productId} quantity={quantity}/>
		</Stack>
	);
}

const CustomSpan = styled('span')(({ theme }) => ({
	backgroundColor: theme.palette.primaryGreen.light,
	padding: theme.spacing(),
	borderRadius: theme.shape.borderRadius
}));