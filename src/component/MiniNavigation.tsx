import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectIsShowHeader } from "#state-management/slices/active-menu.slice.ts";
import { Stack, styled } from "@mui/material";

export default function MiniNavigation({ children, shouldHide = false }: { children: React.ReactNode, shouldHide?: boolean }) {
	const isShowHeader = useAppSelector(selectIsShowHeader);
	return (
		<ProductHeadingStack $shouldHide={shouldHide} $isShowHeader={isShowHeader} direction={'row'} alignItems={'center'}>
			{children}
		</ProductHeadingStack>
	);
}

const ProductHeadingStack = styled(Stack, {
	shouldForwardProp: prop => !['$isShowHeader', '$shouldHide'].includes(prop as string)
})<{ $isShowHeader: boolean, $shouldHide: boolean }>(({ $isShowHeader, theme, $shouldHide }) => ({
	paddingLeft: theme.spacing(),
	paddingTop: theme.spacing(.5),
	width: '100%',
	...($isShowHeader ? { position: 'relative', visibility: $shouldHide ? 'hidden' : 'visible' } :
		{
			position: 'fixed',
			paddingLeft: theme.spacing(5),
			zIndex: theme.zIndex.appBar,
			top: '0px',
			backgroundColor: 'white',
			paddingBottom: theme.spacing(),
			boxShadow: theme.shadows[4],
		}),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingLeft: theme.spacing(2),
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingLeft: $isShowHeader ? theme.spacing(4.5) : theme.spacing(2),
	},
	[theme.breakpoints.down(600)]: {
		paddingLeft: theme.spacing(1.5),
	}
}));