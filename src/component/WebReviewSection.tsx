import { theme } from "#customtheme.ts";
import { Box, Button, Stack, styled } from "@mui/material";
import ReviewBanner from "./ReviewBanner";
import ReviewContent from "./ReviewContent";
import { TItem, TReview } from "./types";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import WebReviewContainer from "./WebReviewContainer";
import { useAppDispatch } from "#state-management/hooks.ts";
import { setIsOpenWebReview } from "#state-management/slices/review.slice.ts";
import { RadioFilters } from "./GeneralFilter";

export default function WebReviewSection({ item, reviews }: { item: TItem, reviews: TReview[] }) {
	const dispatch = useAppDispatch();
	const handleShowWebReview = () => {
		dispatch(setIsOpenWebReview(true));
	};

	const handleSortBy = (value: string) => {
		console.log('sorting', value);
	};

	const handleFilterBy = (value: string) => {
		console.log('filtering', value);
	};
	return (
		<>
			<WebReviewStack gap={2}>
				<Stack direction={'row'} gap={2} justifyContent={'space-between'}>
					<Box minWidth={'300px'} pl={.5}>
						<ReviewBanner item={item} align="left" />
						<RadioFilters
							title="Filter by"
							handleUpdateFilter={handleFilterBy}
							filterOptions={[
								{ label: 'All', value: 'all' },
								{ label: '5 Star', value: 5 },
								{ label: '4 Star', value: 4 },
								{ label: '3 Star', value: 3 },
								{ label: '2 Star', value: 2 },
								{ label: '1 Star', value: 1 }
							]} />
						<RadioFilters
							title="Sort by"
							handleUpdateFilter={handleSortBy}
							filterOptions={[
								{ label: 'All', value: 'all' },
								{ label: 'Most Recent', value: 'date' },
								{ label: 'Highest rated', value: 'high-rate' },
								{ label: 'Lowest rated', value: 'low-rate' },
								{ label: 'Most helpful', value: 'helpful' },
								{ label: 'Pictures', value: 'pictures' }
							]} />
					</Box>
					<Stack p={1} width={'780px'} gap={2} flexWrap={'wrap'} direction={'row'} justifyContent={'space-between'} mr={'auto'} ml={'auto'}>
						{
							reviews.slice(0, Math.min(4, reviews.length)).map((review, index) => (
								<Box key={index} width={'312px'}>
									<ReviewContent reviewer={review} productId={item.id + ''} isWebView />
								</Box>
							))
						}
					</Stack>
				</Stack>
				<Stack direction={'row'} justifyContent={'center'} p={1} pt={1.5}>
					{
						reviews.length > 0 &&
						<Button sx={{
							color: theme.palette.primaryBlack.moreDeeper,
							border: `1px solid ${theme.palette.primaryBlack.moreDeeper}`,
							padding: '6px 12px',
							textAlign: 'center'
						}} onClick={handleShowWebReview}>
							SHOW ALL {reviews.length} REVIEWS
						</Button>
					}
				</Stack>
			</WebReviewStack>
			<WebReviewContainer initialReviews={reviews} item={item} />
		</>
	);
}

const WebReviewStack = styled(Stack)(({ theme }) => ({
	minWidth: '992px',
	width: '90%',
	maxWidth: '1400px',
	alignSelf: 'center',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));