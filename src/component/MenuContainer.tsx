import { Stack, styled, Button } from "@mui/material";
import ScrollableContainer from "./ScrollableContainer";
import { TABLET_BREAKPOINT } from "#constants.tsx";

export default function MenuContainer({ contentViewArea = '45px' }: { contentViewArea?: string }) {
	const menus = ['STAPLES', 'FLOUR', 'OILS', 'BEAUTY', 'SPICES', 'SNACKS', 'DEALS'];
	return (
		<Stack flexGrow={1} height={contentViewArea}>
			<ScrollableContainer orientation="horizontal">
				<StyledStack direction={'row'} gap={2} flexGrow={1} justifyContent={'space-around'}>
					{
						menus.map((menu, index) => <MenuButton key={index}>{menu}</MenuButton>)
					}
				</StyledStack>
			</ScrollableContainer>
		</Stack>
	);
}

const StyledStack = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	[theme.breakpoints.between('xs', TABLET_BREAKPOINT)] : {
		justifyContent: 'space-between',
	}
}));

const MenuButton = styled(Button)(({ theme })=> ({
	minWidth: '90px',
	fontFamily: 'Alata',
	fontSize: '24px',
	lineHeight: '133.4%',
	color: theme.palette.primaryBlack.main
}));