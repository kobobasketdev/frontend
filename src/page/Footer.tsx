import BasketLogoSvg from "#component/svg/BasketLogoSvg.tsx";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu } from "#state-management/slices/active-menu.slice.ts";
import { Stack, styled, SvgIcon } from "@mui/material";

export default function Footer() {
	const activeMenu = useAppSelector(selectActiveMenu);
	return (
		<StyledFooterStack width={1} alignSelf={'center'} $activeMenu={activeMenu}>
			<SvgIcon viewBox="0 0 228 260" sx={{ height: '150px', width: '150px', mt: 2, pl: 2 }}>
				<BasketLogoSvg />
			</SvgIcon>
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