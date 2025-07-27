import { IconButton, Modal, Paper, Stack, styled } from "@mui/material";
import ReviewImageModal from "./ReviewImageModal";
import RatingHeading from "./RatingHeading";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectIsWebReviewOpen, setIsOpenWebReview, setReviewImageToView } from "#state-management/slices/review.slice.ts";
import { HighlightOff } from "@mui/icons-material";
import { TItem, TReview } from "./types";
import ReviewContent from "./ReviewContent";
import ReviewBanner from "./ReviewBanner";
import { RadioFilters } from "./GeneralFilter";
import { getProductReviews } from "#hooks/query/product";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function WebReviewContainer({ item, initialReviews }: { item: TItem, initialReviews: TReview[] }) {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const [page, setPage] = useState(1);
	const [filterBy, setFilterBy] = useState<string | number>('all');
	const [sortBy, setSortBy] = useState<string>('');
	const [loadedReviews, setLoadedReviews] = useState<TReview[]>([]);
	const isWebReviewOpen = useAppSelector(selectIsWebReviewOpen);

	useEffect(() => {
		setLoadedReviews(initialReviews);
	}, [initialReviews]);

	const handleSortBy = async (value: string) => {
		console.log('sorting', value);
		const { data } = await queryClient.fetchQuery(getProductReviews({ productId: item.id, page: 1, filterBy, sortBy }));
		setLoadedReviews([
			...data
		]);
		setPage(1);
		setSortBy(value);
	};

	const handleFilterBy = async (value: string | number) => {
		console.log('filtering', value);
		const { data } = await queryClient.fetchQuery(getProductReviews({ productId: item.id, page: 1, filterBy, sortBy }));
		setLoadedReviews([
			...data
		]);
		setPage(1);
		setFilterBy(value);
	};

	// const handleInfinitScroll = async () => {
	// 	const newPage = page + 1;
	// 	const { data } = await queryClient.fetchQuery(getProductReviews({ productId: item.id, page: newPage, filterBy, sortBy }));
	// 	setLoadedReviews([
	// 		...loadedReviews,
	// 		...data
	// 	]);
	// 	setPage(newPage);
	// };

	const handleCloseWebReview = () => {
		dispatch(setIsOpenWebReview(false));
		dispatch(setReviewImageToView(null));
	};

	return (
		<Modal open={isWebReviewOpen}>
			<Stack height={1} justifyContent={'center'} alignItems={'center'}>
				<Stack component={Paper} width={'800px'} maxHeight={'90vh'} overflow={'hidden'}>
					<Stack pl={.5} pr={.5} pt={2} pb={1} position={'relative'} justifyContent={'centers'} alignItems={'center'}>
						<RatingHeading heading="RATINGS AND REVIEWS" />
						<FloatingSpan>
							<IconButton onClick={handleCloseWebReview}>
								<HighlightOff />
							</IconButton>
						</FloatingSpan>
					</Stack>
					<Stack direction={'row'} gap={1} overflow={'hidden'}>
						{
							loadedReviews.length > 0 &&
							<Stack gap={1.5} overflow={'auto'} pl={1} pr={2} pb={1} sx={{ scrollbarWidth: 'thin' }} >
								{
									loadedReviews.map((review, index) => (
										<ReviewContent key={index} reviewer={review} tag={index + 1} isWebView />
									))
								}
							</Stack>
						}
						<Stack width={'500px'} pr={2} overflow={'auto'} sx={{ scrollbarWidth: 'thin' }}>
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
						</Stack>
					</Stack>
				</Stack>
				<ReviewImageModal width={'500px'} />
			</Stack>
		</Modal>
	);
}

const FloatingSpan = styled('span')({
	position: 'absolute',
	right: '10px',
	top: '10px'
});