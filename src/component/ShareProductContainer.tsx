import { Stack, styled, Typography } from "@mui/material";
import millify from 'millify';
import pluralize from 'pluralize';
import GrommetWishListSvg from "./svg/GrommetWishlistSvg";
import { theme } from "#customtheme.ts";
import { IosShare } from '@mui/icons-material';
import { CustomIconButton, CustomSpan } from "./CommonViews";

export default function ShareProductContainer({ 
	soldQuantity,
	likeCount,
	isWishListItem,
	handleLikeAction,
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
				<CustomIconButton onClick={() => handleLikeAction()}>
					<GrommetWishListSvg $isFilled={isWishListItem} $fillColor={theme.palette.primaryOrange.main}/>
					<CustomSpan>
						{millify(likeCount, {
							units: ['', 'k', 'm', 'b'],
							precision: 3,
						})}
						{' '}
						{pluralize('likes', likeCount)}
					</CustomSpan>
				</CustomIconButton>
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



