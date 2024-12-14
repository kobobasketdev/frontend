import { NORMAL_PHONE_BREAKPOINT } from "#constants.tsx";
import { Stack, styled } from "@mui/material";

export default function Footer() {
	return (

		<StyledFooterStack width={1} alignSelf={'center'}>
			holl
		</StyledFooterStack>
	);
}

const StyledFooterStack = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.customBrown.lightshade,
	height: '400px',
	marginTop: theme.spacing(6),
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)]: {
		width: '98%'
	}
}));