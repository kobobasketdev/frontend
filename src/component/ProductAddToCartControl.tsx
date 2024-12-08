import { Remove, Add } from "@mui/icons-material";
import { Stack, IconButton, styled, Typography, Button } from "@mui/material";
import ProductAddToCartSvg from "./svg/ProductAddToCartSvg";
import { useState } from "react";
import { NORMAL_PHONE_BREAKPOINT } from "#constants.tsx";

export default function ProductAddToCartControl() {
	const [count, setCount] = useState(1);
    
	const handleQuantity = (value: number) => () => {
		const newCount = count + value;
		if(newCount < 1) {
			return;
		}
		setCount(newCount);
	};

	return (
		<StyledStack direction={'row'} alignItems={'center'}  gap={1} width={'fit-content'}>
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
			<AddToCartButton startIcon={<ProductAddToCartSvg />} size="small">
				Add to Cart
			</AddToCartButton>
		</StyledStack>
	);
};

const StyledStack = styled(Stack)(({ theme })=>({
	border: '1px solid rgba(109, 76, 65, 0.2)',
	borderRadius: '16px',
	padding: theme.spacing(0.4),
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(.5),
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)] : {
		paddingLeft: theme.spacing(0),
		paddingRight: theme.spacing(.5),
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
	':hover': {
		backgroundColor: theme.palette.customBrown.deeper
	},
}));
