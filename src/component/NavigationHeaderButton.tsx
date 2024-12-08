import { Button, styled } from "@mui/material";

export const NavigationHeaderButton = styled(Button, {
	shouldForwardProp: prop => prop !== '$fontWeight'
})<{ $fontWeight?: string }>(({ theme, $fontWeight }) => ({
	color: theme.palette.primaryBlack.main,
	fontSize: '14px',
	fontWeight: $fontWeight || '400',
	textTransform: 'inherit',
	':hover': {
		backgroundColor: 'transparent'
	}
}));