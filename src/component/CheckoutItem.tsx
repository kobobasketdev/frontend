import { removeItemFromCart, TCartItems } from "#state-management/slices/cart.slice.ts";
import { Avatar, Checkbox, Stack, styled, Typography } from "@mui/material";
import { ProductPriceTypography, WeightSpan } from "./CommonViews";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import CartItemControl from "./CartItemControl";
import { useAppDispatch } from "#state-management/hooks.ts";
import { appCurrencySymbol } from "#utils/index.ts";
import { useCartMutation } from "#hooks/mutations/cart";
import { useContext } from "react";
import { WishlistIdContext } from "#utils/context.ts";

export default function CheckoutItem({ cartItem }: { cartItem: TCartItems }) {
	const dispatch = useAppDispatch();
	const productVariation = cartItem.item.variations[cartItem.variant];
	const marketPrice = productVariation.marketPrice?.converted || 0;
	const price = productVariation.price.converted;
	const code = productVariation.price.currency;
	const symbol = appCurrencySymbol[code];
	const wishlistIdsSet = useContext(WishlistIdContext);
	const { removeCartItem } = useCartMutation();

	const handleChange = () => {
		console.log('herl');
		dispatch(removeItemFromCart({ productId_Variant: cartItem.item.id + '-' + cartItem.variant }));
		if (localStorage.getItem('access_token')?.trim()) {
			removeCartItem.mutateAsync(cartItem.item.id);
		}
	};
	return (
		<StyledStack direction={'row'} alignItems={'center'} gap={1}>
			<StyledCheckbox checked onChange={handleChange} />
			<Stack width={'150px'} alignSelf={'start'} borderRadius={3} overflow={'hidden'}>
				<Avatar src={cartItem.item.images[0]?.url || ''} variant="rounded" sx={{ width: 1, height: '170px' }} />
			</Stack>
			<Stack gap={2} flexGrow={1}>
				<Stack gap={.5}>
					<Typography color="#3D3D3D" >{cartItem.item.name}</Typography>
					<Typography fontSize={'14px'} fontWeight={'500'} color={theme.palette.primaryOrange.main}>
						LOCAL MARKET PRICE <span style={{ textDecoration: 'line-through' }}>
							{code} {symbol} {marketPrice}</span>
					</Typography>
					<ProductPriceTypography $fontSize={'24px'} $fontWeight={'600'}>
						{code} {symbol}{price}
					</ProductPriceTypography>
					<Stack direction={'row'}>
						<WeightSpan>
							<Typography fontSize={'14px'}>
								{`${cartItem.item.variations[cartItem.variant].size || `${cartItem.item.variations[cartItem.variant].weight}kg`}`}
							</Typography>
						</WeightSpan>
					</Stack>
				</Stack>
				<Stack direction={'row'}>
					<CartItemControl variant={cartItem.variant} productId={cartItem.item.id} quantity={cartItem.quantity} isWishlistItem={wishlistIdsSet.has(cartItem.item.id + '')} />
				</Stack>
			</Stack>
		</StyledStack>
	);
}

const StyledStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		boxShadow: '2px 0px 15px rgba(0, 0, 0, 0.07)',
		padding: theme.spacing(2),
		paddingLeft: 'unset'
	}
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
	'&.Mui-checked': {
		color: theme.palette.primaryGreen.main
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));
