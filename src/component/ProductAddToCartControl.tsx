import { Remove, Add } from "@mui/icons-material";
import { Stack, IconButton, styled, Typography, Button, SvgIcon } from "@mui/material";
import ProductAddToCartSvg from "./svg/ProductAddToCartSvg";
import { useState } from "react";
import { MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from '../customtheme';
import { addItemToCart, openCart } from "#state-management/slices/cart.slice.ts";
import { TItem } from "./types";
import { useAppDispatch } from "#state-management/hooks.ts";
import { useCartMutation } from "#hooks/mutations/cart";


export default function ProductAddToCartControl({
	item, fullWidth = false, choosenVariant, showControl, handleOnAddToCart
}: {
	showControl?: boolean, item: TItem, fullWidth?: boolean, choosenVariant: number,
	handleOnAddToCart?: (itemToShow: TItem) => void
}) {
	const [count, setCount] = useState(1);
	const dispatch = useAppDispatch();
	const { addToCart } = useCartMutation();

	const handleQuantity = (value: number) => () => {
		const newCount = count + value;
		if (newCount < 1) {
			return;
		}
		setCount(newCount);
	};

	const handleAddToCart = () => () => {
		if (handleOnAddToCart) {
			handleOnAddToCart(item);
			return;
		}
		const variant = choosenVariant;
		dispatch(addItemToCart({ item, variant, quantity: count }));
		dispatch(openCart());
		setCount(1);
		if (localStorage.getItem('access_token')?.trim()) {
			//Call server add to cart without waiting
			addToCart.mutateAsync({ productId: item.id, quantity: count, variationId: variant });
		}
	};

	return (
		<StyledStack $showControl={showControl} direction={'row'} alignItems={'center'} gap={0} width={fullWidth ? 1 : 'fit-content'}>
			{
				showControl &&
				<CustomStack direction={'row'} alignItems={'center'} gap={2} flexGrow={1} justifyContent={'space-around'}>
					<CustomIconButton onClick={handleQuantity(-1)} disabled={count === 1} size="small" >
						<Remove fontSize="small" />
					</CustomIconButton>
					<QuantityCountTypography>
						{count}
					</QuantityCountTypography>
					<CustomIconButton onClick={handleQuantity(1)} size="small">
						<Add fontSize="small" />
					</CustomIconButton>
				</CustomStack>
			}
			<FullWidthAddToCart $showControl={showControl} fullWidth onClick={handleAddToCart()}>
				<SvgIcon viewBox="0 -2 14 14">
					<ProductAddToCartSvg />
				</SvgIcon>
				<span>
					Add to Cart
				</span>
			</FullWidthAddToCart>
			{
				// fullWidth ? 
				// 	: <AddToCartButton size="small" fullWidth onClick={handleAddToCart()}>
				// 		<SvgIcon viewBox="0 -2 14 14" id="mobile-svg">
				// 			<ProductAddToCartSvg />
				// 		</SvgIcon>
				// 		<ProductAddToCartSvg />
				// 		<span>
				// 			Add to Cart
				// 		</span>
				// 	</AddToCartButton>
			}
		</StyledStack>
	);
};

const StyledStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$showControl'
})<{ $showControl?: boolean }>(({ theme }) => ({
	borderRadius: '24px',
	width: '100%',

	// padding: theme.spacing(0.4),
	// paddingRight: theme.spacing(.5),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		// paddingLeft: theme.spacing(0),
		// paddingRight: theme.spacing(.5),
		justifyContent: 'space-between',
	},
}));

const CustomStack = styled(Stack)(() => ({
	border: `1px solid ${theme.palette.primaryGreen.disabled}`,
	padding: theme.spacing(.84),
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(1),
	borderRadius: '24px',
	borderBottomRightRadius: '0px',
	borderTopRightRadius: '0px',
	borderRight: 'none',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(.9),
	}
}));

const CustomIconButton = styled(IconButton)(() => ({
	background: '#EFEBE9',
	width: '20px',
	height: '20px',
	':disabled': {
		background: '#f4efed'
	}
}));
const QuantityCountTypography = styled(Typography)(({ theme }) => ({
	fontFamily: 'Roboto',
	color: theme.palette.primaryBlack.main,
	fontWeight: '500',
	fontSize: '16px',
	lineHeight: '100%',
	letterSpacing: '0.1px'
}));

const FullWidthAddToCart = styled(Button, {
	shouldForwardProp: prop => prop !== '$showControl'
})<{ $showControl?: boolean }>(({ $showControl }) => ({
	backgroundColor: theme.palette.primaryYellow.main,
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '.8rem',
	lineHeight: '13px',
	letterSpacing: '0.46px',
	// padding: theme.spacing(1.2),
	paddingLeft: theme.spacing(2.5),
	paddingRight: theme.spacing(2.5),
	borderRadius: $showControl ? '0 20px 20px 0' : '20px',
	color: theme.palette.primaryBlack.moreDeeper,
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		fontSize: '.7rem'
	},

	'& > #mobile-svg': {
		display: 'none'
	},
	'& > span': {
		marginLeft: theme.spacing()
	},
	'.MuiTouchRipple-root': {
		transition: '.5s',
	}
}));

// const AddToCartButton = styled(Button)(({ theme }) => ({
// 	backgroundColor: theme.palette.primaryYellow.main,
// 	fontFamily: 'Roboto',
// 	fontWeight: '500',
// 	fontSize: '16px',
// 	lineHeight: '13px',
// 	letterSpacing: '0.46px',
// 	textTransform: 'inherit',
// 	padding: theme.spacing(1.2),
// 	paddingLeft: theme.spacing(1.5),
// 	paddingRight: theme.spacing(1.5),
// 	borderRadius: '16px',
// 	color: theme.palette.primaryBlack.moreDeeper,
// 	'& > #mobile-svg': {
// 		display: 'none'
// 	},
// 	'& > span': {
// 		marginLeft: theme.spacing()
// 	},
// 	'.MuiTouchRipple-root': {
// 		transition: '.5s',
// 	},
// 	':focus': {
// 		animation: `${Effect} 500ms ${theme.transitions.easing.easeIn} `,
// 	},
// 	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
// 		borderRadius: '28px',
// 		'& > #mobile-svg': {
// 			display: 'inline'
// 		},
// 		'& > svg:not(#mobile-svg)': {
// 			display: 'none'
// 		},
// 		// '& > span': {
// 		// 	display: 'none'
// 		// }
// 	}
// }));
