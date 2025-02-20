import { theme } from "#customtheme.ts";
import { Stack, styled } from "@mui/material";
import ReviewContent from "./ReviewContent";
import ScrollableContainer from "./ScrollableContainer";
import { TItem, TReview } from "./types";
import { Link } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import ReviewBanner from "./ReviewBanner";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";

export default function MobileReviewSection({ item, reviews }: { item: TItem, reviews: TReview[] }) {
	return (
		<StyleReviewStack>
			<Stack p={.5}>
				<ReviewBanner item={item}/>
			</Stack>
			<Stack p={1}>
				<ScrollableContainer orientation="horizontal" float>
					<Stack direction={'row'} gap={1}>
						{
							reviews.slice(0, Math.min(4, reviews.length)).map((review, index) => (
								<ReviewContent reviewer={review} key={index} productId={item.productId+''} tag={index + 1}/>
							))
						}
					</Stack>
				</ScrollableContainer>
			</Stack>
			<Stack direction={'row'} justifyContent={'center'} p={1} pt={1.5}>
				{
					reviews.length > 0 && 
					<Link to={RoutePath.MOBILEREVIEW} params={{ details: item.productId+'' }} style={{
						color: theme.palette.primaryBlack.moreDeeper,
						border: `1px solid ${theme.palette.primaryBlack.moreDeeper}`,
						padding: '6px 12px',
						borderRadius: theme.shape.borderRadius,
						width: '100%',
						textAlign: 'center'
					}}>
						SHOW ALL {reviews.length} REVIEWS
					</Link>
				}
			</Stack>
		</StyleReviewStack>
	);
}

const StyleReviewStack = styled(Stack)(({ theme }) => ({
	backgroundColor: '#EDEDED',
	paddingBottom: theme.spacing(2),
	display: 'none',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'inherit'
	}
}));