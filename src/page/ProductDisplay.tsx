import { TItem, TReview } from "#component/types/index.js";
import { CUSTOM_893_WIDTH, DESKTOP_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { RoutePath } from "#utils/route.ts";
import { Link } from "@tanstack/react-router";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Divider, Skeleton, Stack, styled, Typography } from "@mui/material";
import MiniNavigation from "#component/MiniNavigation.tsx";
import { Check, ChevronRight, ExpandMore, IosShare } from '@mui/icons-material';
import { CustomSpan, ShopTypography, StyledHeaderLink } from "#component/CommonViews.tsx";
import ProductItem from "#component/ProductItem.tsx";
import { useSnackbar } from "notistack";
import BoughtTogether from "#component/BoughtTogether.tsx";
import RatingHeading from "#component/RatingHeading.tsx";
import ReviewSection from "#component/ReviewSection.tsx";
import { useEffect, useRef } from "react";
import ProductsDetail from "#component/ProductsDetail.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProductReviews } from "#hooks/query/product";
import fetcher from "#hooks/fetcher.ts";


export default function ProductDisplay({ item }: { item: TItem }) {
	const { enqueueSnackbar } = useSnackbar();
	const { data: reviewData, isFetching: isReviewFetching } = useQuery(getProductReviews({ productId: item.id, page: 1 }));
	const { data: recommendedProductsData, isFetching: isRecommendedFetching } = useQuery({
		queryKey: ['recommended-products', 1],
		queryFn: async () => {
			return fetcher.get(`v1/products?page=${1}&limit=40`);
		},
		staleTime: 5400000,
		placeholderData: keepPreviousData
	});

	const { data: frequentlyBoughtData, isFetching: isFrequentlyFetching } = useQuery({
		queryKey: ['frequently-bought', item.id],
		queryFn: async () => {
			return fetcher.get('v1/frequently-bought/' + item.id);
		},
		placeholderData: keepPreviousData
	});

	const recommendedProducts = recommendedProductsData?.data.data as TItem[];
	const frequentlyBought = frequentlyBoughtData?.data as TItem[];
	const reviewStubs: TReview[] = reviewData?.data.data || [];
	const pictureProductRef = useRef<HTMLElement | null>(null);
	const productDetailRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!pictureProductRef.current || !productDetailRef.current) {
			return;
		}

		const handleScroll = () => {
			const clientHeight = productDetailRef.current!.scrollHeight;

			if (scrollY > (clientHeight / 1.5) - 50) {
				pictureProductRef.current!.classList.add('absolute');
				pictureProductRef.current!.classList.remove('sticky');
			}
			else if (scrollY > 100 && scrollY < clientHeight / 1.5) {
				pictureProductRef.current!.classList.add('sticky');
				pictureProductRef.current!.classList.remove('absolute');
			}
			else {
				pictureProductRef.current!.classList.remove('sticky');
				pictureProductRef.current!.classList.remove('absolute');
			}
		};

		addEventListener('scroll', handleScroll);
		return () => {
			removeEventListener('scroll', handleScroll);
		};
	});
	const handleCopyToClipBoard = (itemId?: number) => () => {
		navigator.clipboard.writeText(location.origin + "/products/" + itemId);

		enqueueSnackbar(<Alert icon={<Check fontSize="inherit" />} severity="success">
			Product link copied to clipboard
		</Alert>, {
			anchorOrigin: { horizontal: 'right', vertical: 'top' },
			style: { backgroundColor: 'rgb(237, 247, 237)', padding: '0px 0px', }
		});
	};

	return (
		<StyledStackContent gap={2}>
			<MiniNavigation>
				<ProductDisplayNavHeader>
					<Stack direction={'row'} alignItems={'center'} width={1 / 2} minWidth={'300px'}>
						<StyledHeaderLink to={RoutePath.HOME}>
							<Stack direction={'row'} alignItems={'center'}>
								HOME
								<ChevronRight />
							</Stack>
						</StyledHeaderLink>
						<Link to={RoutePath.CATEGORY} params={{ category: item.category.name }}>
							<StyledHeaderTypography textTransform={'uppercase'}>
								{item.category.name}
							</StyledHeaderTypography>
						</Link>
						<ChevronRight color="action" />
						<Typography textTransform={'uppercase'} fontWeight={'500'} noWrap>
							{item.name}
						</Typography>
						<WebShareSpan>
							<WebShareButton onClick={() => handleCopyToClipBoard()}>
								<IosShare fontSize="small" />
								<CustomSpan >
									Share
								</CustomSpan>
							</WebShareButton>
						</WebShareSpan>
					</Stack>
				</ProductDisplayNavHeader>
			</MiniNavigation>

			<ContainerCollection gap={1}>
				<ProductsDetail
					item={item}
					handleCopyToClipBoard={handleCopyToClipBoard}
					pictureProductRef={pictureProductRef}
					productDetailRef={productDetailRef}
				>
					<Box pt={1}>
						<CustomAccordion>
							<AccordionSummary
								expandIcon={<ExpandMore />}
							>
								<Typography variant="inherit" fontWeight={'bold'}>Product description</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									{item.description}
								</Typography>
							</AccordionDetails>
						</CustomAccordion>
						<CustomAccordion>
							<AccordionSummary
								expandIcon={<ExpandMore />}
							>
								<Typography variant="inherit" fontWeight={'bold'}>Delivery and shipping</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet consectetur. Laoreet tristique nibh sit donec mattis arcu tellus tincidunt ultricies. Neque aliquam molestie habitasse elit a. Elementum id urna placerat cursus eu at odio.
								</Typography>
							</AccordionDetails>
						</CustomAccordion>
						<CustomAccordion>
							<AccordionSummary
								expandIcon={<ExpandMore />}
							>
								<Typography variant="inherit" fontWeight={'bold'}>Security and privacy</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Lorem ipsum dolor sit amet consectetur. Laoreet tristique nibh sit donec mattis arcu tellus tincidunt ultricies. Neque aliquam molestie habitasse elit a. Elementum id urna placerat cursus eu at odio.
								</Typography>
							</AccordionDetails>
						</CustomAccordion>
					</Box>
					{
						!isFrequentlyFetching &&
						<BoughtTogether boughtTogether={frequentlyBought || []} />
					}
				</ProductsDetail>
				<span id="reviews" />
			</ContainerCollection>
			{
				!isReviewFetching && Boolean(reviewStubs.length) &&
				<ReviewContainer>
					<Stack alignItems={'center'} p={2} pt={1} gap={3}>
						<Divider orientation="horizontal" variant="fullWidth" sx={{ width: 1 }} />
						<RatingHeading heading="CUSTOMERS RATINGS AND REVIEWS" />
					</Stack>
					<ReviewSection reviews={reviewStubs} item={item} />
				</ReviewContainer>
			}
			<ContentStack mt={2}>
				<Stack gap={2} >
					<Stack gap={1}>
						<ShopTypography>
							Recommended products
						</ShopTypography>
					</Stack>
					<ProductItemGrid>
						{
							!isRecommendedFetching ? recommendedProducts.map((item, index) => (
								<ProductItem
									key={index}
									item={item}
									showPrice={true}
									isCircularImage={false}
									fullDetails
									fontSize="24px"
									fontWeight="600"
								/>
							)) : [...Array(10)].map((_, index) => (
								<Skeleton key={index} height='320px' />
							))
						}
					</ProductItemGrid>
				</Stack>
			</ContentStack>
		</StyledStackContent>
	);
}


const WebShareSpan = styled('span')(({ theme }) => ({
	marginLeft: 'auto',
	marginRight: theme.spacing(2),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const WebShareButton = styled(Button)(({ theme }) => ({
	textTransform: 'inherit',
	color: theme.palette.primaryBlack.main,
	'& svg': {
		paddingBottom: theme.spacing(.2)
	},
	'& > span': {
		textDecoration: 'underline',
		fontWeight: '400',
	}
}));

const ContentStack = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	width: '100%',
	marginLeft: 'auto',
	marginRight: 'auto',
	[theme.breakpoints.down(447)]: {
		alignItems: 'unset'
	}
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
	boxShadow: 'none',
	border: 'none',
	borderBottom: `1px solid ${theme.palette.divider}`,
	'::before': {
		height: 'unset'
	}
}));

const ProductDisplayNavHeader = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '1160px',
	margin: '0 auto',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		maxWidth: '1000px',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
}));
const ContainerCollection = styled(Stack)(({ theme }) => ({
	width: '100%',
	[theme.breakpoints.up(MEDIUM_SCREEN_MAX_WIDTH)]: {
		maxWidth: '1000px',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
}));

const ReviewContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	padding: theme.spacing(),
	alignSelf: 'center',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: theme.spacing(0),
		maxWidth: '450px',
	},
	[theme.breakpoints.down(320)]: {
		width: '100%'
	}
}));

const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
	fontFamily: 'Roboto',
	fontWeight: '500',
	lineHeight: '166%',
	/* or 17px */
	letterSpacing: '0.4px',
	color: theme.palette.primaryBlack.disabled,
	textDecoration: 'underline'
}));


const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(16),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23.5)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(16.7)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(13)
	},
}));

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: '100%',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(3),
	padding: `0px ${theme.spacing(.3)}`,
	gridAutoFlow: 'row dense',
	gridTemplateColumns: "repeat(5,220PX)",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(4,220PX)",
		columnGap: theme.spacing(1.5),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: `0px ${theme.spacing()}`,
		gridTemplateColumns: "repeat(4,minmax(185px, 220px))",
	},
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(1.5),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(3,minmax(185px, 220px))",
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(1.5),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(3,minmax(155px, 220px))",
	},
	[theme.breakpoints.down(690)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(2),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(2,minmax(155px, 220px))",
	},
	[theme.breakpoints.down(447)]: {
		columnGap: theme.spacing(1),
		justifyContent: 'space-around',
		gridTemplateColumns: "repeat(2, minmax(150px, auto))",
	}
}));