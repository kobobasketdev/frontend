import { Remove, Add } from "@mui/icons-material";
import { Button, IconButton, Stack, styled, SvgIcon, Typography } from "@mui/material";
import RemoveItemSvg from "./svg/RemoveItemSvg";
import { removeItemFromCart, updateCartItem } from "#state-management/slices/cart.slice.ts";
import { useAppDispatch } from "#state-management/hooks.ts";
import { CartWishlistSvg } from "./svg/WishlistSvg";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useCartMutation } from "#hooks/mutations/cart";
import { useWishlistMutation } from "#hooks/mutations/wishlist";
import { useState } from "react";

export default function CartItemControl({ productId, quantity, variant, isWishlistItem }: {
	variant: number,
	productId: string,
	quantity: number,
	isWishlistItem?: boolean
}) {
	const displayQuantity = quantity;
	const dispatch = useAppDispatch();
	const { removeCartItem, updateCartItem: axiosupdateCartItem } = useCartMutation();
	const { addToWishlist } = useWishlistMutation();
	const [internalIsWishlist, setInternalIsWishList] = useState(false);

	const finalIsWishlist = isWishlistItem || internalIsWishlist;
	const handleQuantity = (value: number) => () => {
		const newCount = displayQuantity + value;
		if (newCount < 1) {
			return;
		}

		dispatch(updateCartItem({ productId_Variant: productId + '-' + variant, quantity: newCount }));
		if (localStorage.getItem('access_token')) {
			axiosupdateCartItem.mutateAsync({ cartItemId: productId, quantity: newCount });
		}
	};

	const handleRemoveFromCart = () => () => {
		dispatch(removeItemFromCart({ productId_Variant: productId + '-' + variant }));
		if (localStorage.getItem('access_token')?.trim()) {
			removeCartItem.mutateAsync(productId);
		}
	};

	const handleAddToWishlist = (itemId: string) => () => {
		addToWishlist.mutateAsync(itemId);
		setInternalIsWishList(true);
	};
	return (
		<Stack direction={'row'} alignItems={'center'} gap={1} justifyContent={'space-between'} width={1}>
			<Stack direction={'row'} gap={1}>
				<ControlStack direction={'row'} alignItems={'center'} gap={1}>
					<IconButton onClick={handleQuantity(-1)} disabled={displayQuantity === 1} size="small">
						<Remove fontSize="inherit" />
					</IconButton>
					<QuantityCountTypography>
						{displayQuantity}
					</QuantityCountTypography>
					<IconButton onClick={handleQuantity(1)} size="small">
						<Add fontSize="inherit" />
					</IconButton>
				</ControlStack>
				{
					!finalIsWishlist && localStorage.getItem('access_token') &&
					<WishListControl variant="outlined" size="small" color="inherit" onClick={handleAddToWishlist(productId)}>
						<Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
							<Typography pl={.5} fontSize={'12px'}>Add to wishlist</Typography>
							<SvgIcon viewBox="-2 -4 16 16">
								<CartWishlistSvg />
							</SvgIcon>
						</Stack>
					</WishListControl>
				}
			</Stack>

			<RemoveFromCartButton onClick={handleRemoveFromCart()} variant="outlined" color="inherit" size="small">
				<Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
					<Typography fontSize={'12px'}>
						Delete
					</Typography>
					<RemoveItemSvg />
				</Stack>
			</RemoveFromCartButton>
		</Stack>
	);
};

const WishListControl = styled(Button)(({ theme }) => ({
	border: '1px solid rgba(109, 76, 65, 0.2)',
	borderRadius: theme.shape.borderRadius * 5,
	textTransform: 'inherit',
	minWidth: 'unset',
	padding: theme.spacing(.5),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		'p': {
			display: 'none'
		},
	}
}));
const ControlStack = styled(Stack)(({ theme }) => ({
	border: '1px solid rgba(109, 76, 65, 0.2)',
	borderRadius: theme.shape.borderRadius * 5,
	paddingTop: theme.spacing(.5),
	paddingBottom: theme.spacing(.4),
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(1),
}));

const QuantityCountTypography = styled(Typography)(({ theme }) => ({
	fontFamily: 'Roboto',
	color: theme.palette.primaryBlack.main,
	fontWeight: '500',
	fontSize: '16px',
	lineHeight: '100%',
	letterSpacing: '0.1px'
}));

const RemoveFromCartButton = styled(Button)(({ theme }) => ({
	border: '1px solid rgba(109, 76, 65, 0.2)',
	borderRadius: theme.shape.borderRadius * 4,
	minWidth: 'unset',
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '12px',
	lineHeight: '13px',
	letterSpacing: '0.46px',
	textTransform: 'inherit',
	padding: theme.spacing(1),
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(1),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		'p': {
			display: 'none'
		},
	}
}));
