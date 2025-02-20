import RatingHeading from "#component/RatingHeading.tsx";
import ReviewBanner from "#component/ReviewBanner.tsx";
import ReviewContent from "#component/ReviewContent.tsx";
import ReviewImageModal from "#component/ReviewImageModal.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { RoutePath } from "#utils/route.ts";
import { ChevronLeft, ExpandMore } from "@mui/icons-material";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, styled } from "@mui/material";
import { Link, useLoaderData } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export default function MobileReview() {
	const { item, reviews } = useLoaderData({ from: RoutePath.INTERNAL_MOBILEREVIEW });
	const [filters, setFilters] = useState({
		sortBy: 'Sort By',
		filterBy: 'Filter By'
	});

	const headerRef = useRef<HTMLDivElement | null>(null);
	const reviewFilterRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		scrollTo({
			top: 0
		});
		if(!headerRef.current || !reviewFilterRef.current) {
			return;
		}
		const reviewFilterOffsetTop = reviewFilterRef.current!.offsetTop;
		const handleOnScroll = () => {
			if(scrollY > headerRef.current!.clientHeight) {
				headerRef.current!.classList.add('add-shadow');
			}
			else {
				headerRef.current!.classList.remove('add-shadow');
			}

			if(scrollY >= reviewFilterOffsetTop) {
				reviewFilterRef.current!.classList.add('fix-filter');
			}
			else {
				reviewFilterRef.current!.classList.remove('fix-filter');
			}
		};
		addEventListener('scroll', handleOnScroll);
		return () => {
			removeEventListener('scroll', handleOnScroll);
		};
	}, []);

	const handleFilterBy = (e: SelectChangeEvent<unknown>) => {
		console.log(e.target.value);
		setFilters({
			...filters,
			filterBy: e.target.value+''
		});
	};

	const handleSortBy = (e: SelectChangeEvent<unknown>) => {
		setFilters({
			...filters,
			sortBy: e.target.value+''
		});
	};
	return (
		<>
			<StyledStackContent position={'relative'}>
				<StyledReviewHeader ref={headerRef} direction={'row'}>
					<Link to="/products/$details" params={{ details: item.productId+'' }} style={{ color: theme.palette.primaryBlack.moreDeeper }}>
						<ChevronLeft fontSize="large"/>
					</Link>
				</StyledReviewHeader>
				<Stack mt={8} gap={3} alignSelf={'center'} maxWidth={'600px'}>
					<Box pl={.5} pr={.5}>
						<RatingHeading heading="CUSTOMERS RATINGS AND REVIEWS"/>
					</Box>
					<Stack bgcolor={'#EDEDED'}>
						<ReviewBanner item={item}/>
					</Stack>
					<CustomFilter ref={reviewFilterRef}>
						<FormControl fullWidth>
							<StyledSelect variant="outlined" value={filters.sortBy} IconComponent={ExpandMore}
								labelId="sort-by-label"
								onChange={handleSortBy} slotProps={{
									input: {
										sx: {
											p: 1.2
										}
									}
								}}>
								<MenuItem value="Sort By">
									Sort By
								</MenuItem>
								<MenuItem value="date">
									Most Recent
								</MenuItem>
								<MenuItem value="high-rate">
									Highest rated
								</MenuItem>
								<MenuItem value="low-rate">
									Lowest rated
								</MenuItem>
								<MenuItem value="helpful">
									Most helpful
								</MenuItem>
								<MenuItem value='picture'>
									Pictures
								</MenuItem>
							</StyledSelect>
						</FormControl>
						<FormControl fullWidth>
							<StyledSelect variant="outlined" value={filters.filterBy} IconComponent={ExpandMore}
								labelId="filter-by-label"
								onChange={handleFilterBy} slotProps={{
									input: {
										sx: {
											p: 1.2
										}
									}
								}}>
								<MenuItem value='Filter By'>
									Filter By
								</MenuItem>
								<MenuItem value={5}>
									5 Star
								</MenuItem>
								<MenuItem value={4}>
									4 Star
								</MenuItem>
								<MenuItem value={3}>
									3 Star
								</MenuItem>
								<MenuItem value={2}>
									2 Star
								</MenuItem>
								<MenuItem value={1}>
									1 Star
								</MenuItem>
							</StyledSelect>
						</FormControl>
					</CustomFilter>
					{
						reviews.length > 0 && 
						<Stack gap={1.5}>
							{
								reviews.map((review, index) => (
									<ReviewContent key={index} reviewer={review} tag={index + 1}/>    
								))
							}
						</Stack>
					}
				</Stack>
			</StyledStackContent>
			<ReviewImageModal />
		</>
	);
}

const StyledReviewHeader = styled(Stack)(({ theme }) => ({
	position: 'fixed',
	backgroundColor: 'white',
	width: '100%',
	paddingTop: theme.spacing(1.5),
	paddingBottom: theme.spacing(1.2),
	zIndex: theme.zIndex.fab,
	'&.add-shadow': {
		boxShadow: theme.shadows[2]
	}
}));

const CustomFilter = styled('div')(({ theme }) => ({
	display: 'flex',
	gap: theme.spacing(),
	padding: theme.spacing(.5),
	'&.fix-filter': {
		position: 'fixed',
		top: '5px',
		right: '30%',
		width: '350px',
		zIndex: theme.zIndex.fab,
		[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]:{
			width: '80%',
			maxWidth: '350px',
			right: 0,
		}
	},
}));

const StyledSelect = styled(Select)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius * 50,
	textAlign: 'center',
}));

const StyledStackContent = styled(Stack)(() => ({
}));