import { Stack, Typography } from "@mui/material";
import { ProductAvatar, ProductPriceTypography, WeightSpan } from "./CommonViews";
import { TItem } from "./types";
import CartItemControl from "./CartItemControl";
import { appCurrencySymbol } from "#utils/index.ts";

export default function CartItem({ variant, item, quantity }: { variant: number, item: TItem, quantity: number }) {
	const price = item.variations[variant].price.converted;
	const code = item.variations[variant].price.currency;
	const symbol = appCurrencySymbol[code];

	return (
		<Stack width={1} gap={1}>
			<Stack overflow={'hidden'} borderRadius={3}>
				<ProductAvatar src={item.images[0]?.url || ''} variant="rounded" />
			</Stack>
			<Stack direction={'row'}>
				<WeightSpan>
					<Typography fontSize={'14px'}>
						{`${item.variations[variant].size || `${item.variations[variant].weight}kg`}`}
					</Typography>
				</WeightSpan>
			</Stack>
			<ProductPriceTypography>
				{code} {symbol}{price}
			</ProductPriceTypography>
			<CartItemControl variant={variant} productId={item.id} quantity={quantity} />
		</Stack>
	);
}

