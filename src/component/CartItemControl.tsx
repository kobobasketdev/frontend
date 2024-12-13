import { Remove, Add } from "@mui/icons-material";
import { Button, IconButton, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import RemoveItemSvg from "./svg/RemoveItemSvg";

export default function CartItemControl() {
	const [count, setCount] = useState(1);
    
	const handleQuantity = (value: number) => () => {
		const newCount = count + value;
		if(newCount < 1) {
			return;
		}
		setCount(newCount);
	};

	const handleRemoveFromCart = () => () => {
		setCount(1);
	};
	
	return (
		<Stack direction={'row'} alignItems={'center'}  gap={1} width={'fit-content'}>
			<ControlStack direction={'row'} alignItems={'center'} gap={.5}>
				<IconButton onClick={handleQuantity(-1)} disabled={count === 1} size="small">
					<Remove />
				</IconButton>
				<QuantityCountTypography>
					{count}
				</QuantityCountTypography>
				<IconButton onClick={handleQuantity(1)} size="small">
					<Add />
				</IconButton>
			</ControlStack>
			<RemoveFromCartButton onClick={handleRemoveFromCart()} variant="outlined" color="inherit" size="small">
				<RemoveItemSvg />
			</RemoveFromCartButton>
		</Stack>
	);
};

const ControlStack = styled(Stack)(()=>({
	border: '1px solid rgba(109, 76, 65, 0.2)',
	borderRadius: '16px',
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
	borderRadius: '16px',
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '12px',
	lineHeight: '13px',
	letterSpacing: '0.46px',
	textTransform: 'inherit',
	padding: theme.spacing(1.2),
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(1),
}));
