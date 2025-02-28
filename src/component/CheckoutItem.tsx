import { removeItemFromCart, TCartItems } from "#state-management/slices/cart.slice.ts";
import { Avatar, Checkbox, Stack, styled, Typography } from "@mui/material";
import { ProductPriceTypography, WeightSpan } from "./CommonViews";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { IDeliveryState } from "#state-management/slices/delivery.slice.ts";
import CartItemControl from "./CartItemControl";
import { useAppDispatch } from "#state-management/hooks.ts";

export default function CheckoutItem({ cartItem, deliveryLocation }: { cartItem: TCartItems, deliveryLocation: IDeliveryState }) {
	const dispatch = useAppDispatch();
	const locationPrice = cartItem.item.variations[cartItem.variant].locationPrice || cartItem.item.locationPrice;
	const price = cartItem.item.variations[cartItem.variant].promotion?.promoPrice || cartItem.item.variations[cartItem.variant].price || cartItem.item.promotion?.promoPrice || cartItem.item.price;

	const { code, symbol, } = deliveryLocation;
	const handleChange = () => {
		console.log('herl');
		dispatch(removeItemFromCart({ productId_Variant: cartItem.item.productId + '-' + cartItem.variant }));
	};
	return (
		<StyledStack direction={'row'} alignItems={'center'} gap={1}>
			<StyledCheckbox checked onChange={handleChange} />
			<Stack width={'150px'} alignSelf={'start'} borderRadius={3} overflow={'hidden'}>
				<Avatar src={cartItem.item.images[0]} variant="rounded" sx={{ width: 1, height: '170px' }} />
			</Stack>
			<Stack gap={2} flexGrow={1}>
				<Stack gap={.5}>
					<Typography color="#3D3D3D" >{cartItem.item.name}</Typography>
					<Typography fontSize={'14px'} fontWeight={'500'} color={theme.palette.primaryOrange.main}>
						LOCAL MARKET PRICE <span style={{ textDecoration: 'line-through' }}>
							{code} {symbol} {locationPrice}</span>
					</Typography>
					<ProductPriceTypography $fontSize={'24px'} $fontWeight={'600'}>
						{code} {symbol}{price}
					</ProductPriceTypography>
					<Stack direction={'row'}>
						<WeightSpan>
							<Typography fontSize={'14px'}>
								{cartItem.item.variations[cartItem.variant].weight.value}{cartItem.item.variations[cartItem.variant].weight.measurement}
							</Typography>
						</WeightSpan>
					</Stack>
				</Stack>
				<Stack direction={'row'}>
					<CartItemControl variant={cartItem.variant} productId={cartItem.item.productId} quantity={cartItem.quantity} isCheckoutItem={!cartItem.item.isWishListItem} />
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
