import { Remove, Add } from "@mui/icons-material";
import { Stack, IconButton, styled, Typography, Button, keyframes, SvgIcon } from "@mui/material";
import ProductAddToCartSvg from "./svg/ProductAddToCartSvg";
import { useState } from "react";
import { MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from '../customtheme';
import { addItemToCart, openCart } from "#state-management/slices/cart.slice.ts";
import { TItem } from "./types";
import { useAppDispatch } from "#state-management/hooks.ts";

const Effect = keyframes`
	0% {
		transform: scale(1,1);
		background-color: ${theme.palette.primaryOrange.main}
	}
	50% {
		transform: scale(1.08,1.08);
	}
	100% {
		transform: scale(1,1);
	}
`;

export default function ProductAddToCartControl({ item, fullWidth=false }: { item: TItem, fullWidth?: boolean }) {
	const [count, setCount] = useState(1);
	const dispatch = useAppDispatch();
	
    
	const handleQuantity = (value: number) => () => {
		const newCount = count + value;
		if(newCount < 1) {
			return;
		}
		setCount(newCount);
	};

	const handleAddToCart = () => () => {
		dispatch(addItemToCart({ item, quantity: count }));
		dispatch(openCart());
		setCount(1);
	};
	
	return (
		<StyledStack direction={'row'} alignItems={'center'}  gap={1} width={fullWidth ? 1 : 'fit-content'}>
			<Stack direction={'row'} alignItems={'center'}>
				<IconButton onClick={handleQuantity(-1)} disabled={count === 1} size="small">
					<Remove />
				</IconButton>
				<QuantityCountTypography>
					{count}
				</QuantityCountTypography>
				<IconButton onClick={handleQuantity(1)} size="small">
					<Add />
				</IconButton>
			</Stack>
			{
				fullWidth ? <FullWidthAddToCart fullWidth onClick={handleAddToCart()}>
					<SvgIcon viewBox="0 -2 14 14">
						<ProductAddToCartSvg />
					</SvgIcon>
					<span>
						Add to Cart
					</span>
				</FullWidthAddToCart> 
					: <AddToCartButton size="small" onClick={handleAddToCart()}>
						<SvgIcon viewBox="0 -2 14 14" id="mobile-svg">
							<ProductAddToCartSvg />
						</SvgIcon>
						<ProductAddToCartSvg />
						<span>
							Add to Cart
						</span>
					</AddToCartButton>
						
			}
		</StyledStack>
	);
};

const StyledStack = styled(Stack)(({ theme })=>({
	border: '1px solid rgba(109, 76, 65, 0.2)',
	borderRadius: '16px',
	padding: theme.spacing(0.4),
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(.5),
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)] : {
		paddingLeft: theme.spacing(0),
		paddingRight: theme.spacing(.5),
	},
}));

const QuantityCountTypography = styled(Typography)(({ theme }) => ({
	fontFamily: 'Roboto',
	color: theme.palette.primaryBlack.main,
	fontWeight: '500',
	fontSize: '16px',
	lineHeight: '100%',
	letterSpacing: '0.1px'
}));

const FullWidthAddToCart = styled(Button)(() => ({
	backgroundColor: theme.palette.customBrown.main,
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '16px',
	lineHeight: '13px',
	letterSpacing: '0.46px',
	padding: theme.spacing(1.2),
	paddingLeft: theme.spacing(1.5),
	paddingRight: theme.spacing(1.5),
	borderRadius: '20px',
	color: '#FFFFFF',
	'& > #mobile-svg': {
		display: 'none'
	},
	'& > span': {
		marginLeft: theme.spacing()
	},
	'.MuiTouchRipple-root': {
		transition: '.5s',
	},
	':hover': {
		backgroundColor: theme.palette.customBrown.deeper,
	},
	':focus': {
		animation: `${Effect} 500ms ${theme.transitions.easing.easeIn} `,
	},
}));
const AddToCartButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.customBrown.main,
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '12px',
	lineHeight: '13px',
	letterSpacing: '0.46px',
	textTransform: 'inherit',
	padding: theme.spacing(1.2),
	paddingLeft: theme.spacing(1.5),
	paddingRight: theme.spacing(1.5),
	borderRadius: '16px',
	color: '#FFFFFF',
	'& > #mobile-svg': {
		display: 'none'
	},
	'& > span': {
		marginLeft: theme.spacing()
	},
	'.MuiTouchRipple-root': {
		transition: '.5s',
	},
	':hover': {
		backgroundColor: theme.palette.customBrown.deeper,
	},
	':focus': {
		animation: `${Effect} 500ms ${theme.transitions.easing.easeIn} `,
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]:{
		borderRadius: '28px',
		'& > #mobile-svg': {
			display: 'inline'
		},
		'& > svg:not(#mobile-svg)': {
			display: 'none'
		},
		'& > span': {
			display: 'none'
		}
	}
}));
