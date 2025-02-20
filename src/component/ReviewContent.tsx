import { Avatar, Box, Button, Rating, Stack, styled, Typography } from "@mui/material";
import { TReview } from "./types";
import daysjs from 'dayjs';
import { theme } from "#customtheme.ts";
import HelpfulSvg from "./svg/HelpfulSvg";
import { Link, useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import { useAppDispatch } from "#state-management/hooks.ts";
import { setIsOpenWebReview, setReviewImageToView } from "#state-management/slices/review.slice.ts";

const getShowImageContainer = ({ isWebView, hasImage, hasProductId }: { isWebView: boolean, hasImage: boolean, hasProductId: boolean }) => {
	if(isWebView && !hasImage) {
		return false;
	}

	if(!hasProductId) {
		return false;
	}

	return true;
};

export default function ReviewContent({ reviewer, productId, isWebView = false, tag = 0 }: { 
	reviewer: TReview, productId?: string, isWebView?: boolean, tag?: number 
}) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const hasProductId = Boolean(productId);
	const imageCount = hasProductId ? 3 : reviewer.images?.length;

	const showImageContainer = getShowImageContainer({
		isWebView, hasImage: Boolean(reviewer.images), hasProductId: Boolean(productId)
	});
	const handleWebReview = () => {
		dispatch(setIsOpenWebReview(true));
	};

	const handleViewReviewImages = () => {
		dispatch(setReviewImageToView({ id: reviewer.id, images: reviewer.images }));
		if(isWebView) {
			handleWebReview();
			return;
		}

		if(productId && !isWebView) {
			
			navigate({
				to: RoutePath.MOBILEREVIEW+`${tag > 0 ? '/#tag'+(tag-1) : ''}`,
				params: { details: productId }
			});
			return;
		}
	};
	return (
		<Stack bgcolor={'white'} borderRadius={2} p={1.2} gap={1} minWidth={'300px'}>
			<Stack direction={'row'} gap={.8}>
				<Avatar src={reviewer.userAvatar}/>
				<Stack color="rgba(27, 31, 38, 0.72)">
					<Typography>
						{reviewer.name}
					</Typography>
					<Typography fontSize={'12px'}>
						{
							daysjs(reviewer.date).format('MMMM DD, YYYY')
						}
					</Typography>
				</Stack>
			</Stack>
			<Stack direction={'row'} gap={1} alignItems={'center'}>
				<Rating readOnly value={reviewer.rating} size="small"/>
				<Typography color={theme.palette.primaryBlack.moreDeeper} fontSize={'16px'} fontWeight={'500'}>
					. {reviewer.heading}
				</Typography>
			</Stack>
			<ReviewTextContent $hideText={Boolean(productId)}>
				{reviewer.content}
			</ReviewTextContent>
			{
				productId && 
					<Box>
						{
							isWebView ? 
								<Button sx={{ color: theme.palette.primaryBlack.moreDeeper, textTransform: 'inherit', textDecoration: 'underline', padding: 0 }} onClick={handleWebReview}>
									Show more
								</Button>
								:
								<Link to={RoutePath.MOBILEREVIEW+`${tag > 0 ? '/#tag'+(tag-1) : ''}`} params={{ details: productId }} style={{ color: theme.palette.primaryBlack.moreDeeper, textTransform: 'inherit', textDecoration: 'underline' }}>
									Show more
								</Link>

						}
					</Box>
			}
			{
				tag > 0 && <span id={'tag'+tag} />
			}
			<ReviewImageStack  $showImageContainer={showImageContainer} direction={'row'} gap={1} mb={1} flexWrap={'wrap'}>
				{
					reviewer.images?.slice(0,imageCount).map((image, index) => (
						<StyledReviewAvatarButton key={index} onClick={handleViewReviewImages}>
							<Avatar  sx={{ height: '70px', width: '80px' }} src={image} variant="square"/>
						</StyledReviewAvatarButton>
					))
				}
			</ReviewImageStack>
			<Box>
				<Typography color="rgba(27, 31, 38, 0.72)" fontSize={'13px'}>Did you find this review helpful?</Typography>
			</Box>
			<Box>
				<StyledHelpfulButton startIcon={<HelpfulSvg />} sx={{ textTransform: 'inherit' }} variant="outlined">
					Helpful {reviewer.helpfulCount && `(${reviewer.helpfulCount})`}
				</StyledHelpfulButton>
			</Box>
		</Stack>
	);
}

const StyledReviewAvatarButton = styled(Button)({
	border: 'none',
	padding: '0',
	backgroundColor: 'unset'
});
const ReviewImageStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$showImageContainer'
})<{ $showImageContainer: boolean }>(({ $showImageContainer }) => ({
	...($showImageContainer && {
		height: '80px'
	})
}));

const ReviewTextContent = styled('p', {
	shouldForwardProp: prop => prop !== '$hideText'
})<{ $hideText?: boolean }>(({ $hideText }) => ({
	...($hideText && {
		overflow: 'hidden',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
		display: '-webkit-box',
		marginBottom: '0px',
	})
}));

const StyledHelpfulButton = styled(Button)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius * 6,
	borderColor: theme.palette.divider,
	fontFamily: 'Alata',
	color: "black"
}));
