import { Stack, styled, Typography } from "@mui/material";
import millify from 'millify';
import { IosShare } from '@mui/icons-material';
import { CustomIconButton, CustomSpan } from "./CommonViews";

export default function ShareProductContainer({ 
	soldQuantity,
	handleCopyToClipBoard
}: { 
	soldQuantity: number,
	likeCount: number,
	isWishListItem: boolean,
	handleLikeAction: () => void,
	handleCopyToClipBoard: () => void
}) {

	return (
		<Stack p={1} gap={1}>
			<StyledSoldText>
				{millify(soldQuantity, {
					units: ['', 'k', 'm', 'b'],
					precision: 3,
				})}
				{' '}
				Sold
			</StyledSoldText>
			<Stack direction={'row'} gap={3}>
				
				<CustomIconButton onClick={() => handleCopyToClipBoard()}>
					<IosShare />
					<CustomSpan >
						Share
					</CustomSpan>
				</CustomIconButton>
			</Stack>
		</Stack>
	);
}

const StyledSoldText = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryOrange.main
}));



