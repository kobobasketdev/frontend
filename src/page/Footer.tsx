import { useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu } from "#state-management/slices/active-menu.slice.ts";
import { Stack, styled } from "@mui/material";

export default function Footer() {
	const activeMenu = useAppSelector(selectActiveMenu);
	return (
		<StyledFooterStack width={1} alignSelf={'center'} $activeMenu={activeMenu}>
			holl
		</StyledFooterStack>
	);
}

const StyledFooterStack = styled(Stack, {
	shouldForwardProp: prop => prop != '$activeMenu'
})<{ $activeMenu: number }>(({ theme, $activeMenu }) => ({
	backgroundColor: theme.palette.customBrown.lightshade,
	height: '400px',
	marginTop: theme.spacing(6),
	...($activeMenu > 0 && {
		width: 'calc(100% - 220px)',
		alignSelf: 'end'
	}),
	[theme.breakpoints.down(955)]: {
		width: '100%',
		alignSelf: 'unset'
	}
}));