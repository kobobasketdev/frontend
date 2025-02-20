import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { Stack, styled, Typography } from "@mui/material";

export default function RatingHeading({ heading }: { heading: string }) {
	return (
		<Stack gap={1} maxWidth={'600px'}>
			<StyledTypography fontWeight={'500'} fontSize={'16px'} textAlign={'center'}>
				{heading}
			</StyledTypography>
			<Typography color={theme.palette.primaryGreen.moreDeeper} textAlign={'center'}>
				Kobobasket displays reviews only from customers who’ve purchased the item. After delivery, customers can leave feedback directly from the order details page.
			</Typography>
		</Stack>
	);
}

const StyledTypography = styled(Typography)(({ theme }) => ({
	fontSize: '30px',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		fontSize: '16px'
	}
}));