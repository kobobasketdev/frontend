import { TItem } from "#component/types/index.js";
import { CUSTOM_893_WIDTH, DESKTOP_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { RoutePath } from "#utils/route.ts";
import { Link } from "@tanstack/react-router";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Divider, Stack, styled, Typography } from "@mui/material";
import MiniNavigation from "#component/MiniNavigation.tsx";
import { Check, ChevronRight, ExpandMore, IosShare } from '@mui/icons-material';
import ScrollableContainer from "#component/ScrollableContainer.tsx";
import { CustomIconButton, CustomSpan, ProductAvatar, ShopTypography, StyledHeaderLink } from "#component/CommonViews.tsx";
import { theme } from "#customtheme.ts";
import ProductDisplayDetail from "#component/ProductDisplayDetail.tsx";
import { items as itemsStub, reviews as reviewsStub } from "#testData.ts";
import ProductItem from "#component/ProductItem.tsx";
import { useSnackbar } from "notistack";
import _ from "lodash";
import BoughtTogether from "#component/BoughtTogether.tsx";
import RatingHeading from "#component/RatingHeading.tsx";
import ReviewSection from "#component/ReviewSection.tsx";
import { useEffect, useRef } from "react";


export default function ProductDisplay({ item }: { item: TItem }) {
	const { enqueueSnackbar } = useSnackbar();
	const pictureProductRef = useRef<HTMLElement | null>(null);
	const productDetailRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!pictureProductRef.current || !productDetailRef.current) {
			return;
		}
		console.log(pictureProductRef.current!.clientWidth, productDetailRef.current!.offsetHeight);
		const handleScroll = () => {
			const clientHeight = productDetailRef.current!.scrollHeight;

			if ((clientHeight - scrollY) < 300) {
				pictureProductRef.current!.classList.add('absolute');
				pictureProductRef.current!.classList.remove('sticky');
			}
			else if (scrollY > 100 && scrollY < clientHeight) {
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
						<Link to={RoutePath.CATEGORY} params={{ category: _.upperCase(item.category!) }}>
							<StyledHeaderTypography textTransform={'uppercase'}>
								{item.category}
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
				<StyledProductDetailStack gap={1} >
					<StyledPictureContainer ref={productDetailRef}>
						<CustomProductBox ref={pictureProductRef}>
							<ScrollableContainer orientation="horizontal" float fullContent width="100%" indicator="thumbnail" thumbnails={item.images}>
								{
									item.images.map((image, index) => (
										<Stack key={index} width={1} height={1}>
											<ProductAvatar
												key={index}
												src={image || ''}
												alt={item.name}
												variant={'rounded'}
											/>
										</Stack>
									))
								}
							</ScrollableContainer>
							<MobileShareStyledSpan>
								<CustomIconButton onClick={() => handleCopyToClipBoard()}>
									<IosShare fontSize="small" />
									<CustomSpan >
										Share
									</CustomSpan>
								</CustomIconButton>
							</MobileShareStyledSpan>
						</CustomProductBox>
					</StyledPictureContainer>
					<DetailsStack gap={1} >
						<ProductDisplayDetail item={item} fontSize="24px" fontWeight="600" />
						<Box pt={1}>
							<CustomAccordion>
								<AccordionSummary
									expandIcon={<ExpandMore />}
								>
									<Typography variant="inherit" fontWeight={'bold'}>Product description</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										{item.productDescription}
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
						<BoughtTogether boughtTogether={itemsStub.slice(0, 4)} />
					</DetailsStack>
				</StyledProductDetailStack>
			</ContainerCollection>
			<ReviewContainer>
				<Stack alignItems={'center'} p={2} pt={1} gap={3}>
					<Divider orientation="horizontal" variant="fullWidth" sx={{ width: 1 }} />
					<RatingHeading heading="CUSTOMERS RATINGS AND REVIEWS" />
				</Stack>
				<ReviewSection reviews={reviewsStub} item={item} />
			</ReviewContainer>
			<ContentStack mt={2}>
				<Stack gap={2} >
					<Stack gap={1}>
						<ShopTypography>
							Recommended products
						</ShopTypography>
					</Stack>
					<ProductItemGrid>
						{Array(24).fill('Item').map((arrayItem, index) => (
							<ProductItem
								key={index}
								item={{
									...itemsStub[0], productId: index, name: arrayItem + " " + index, promotion: {
										promoName: "Valentine's Deals",
										promoPrice: 10
									}
								}}
								showPrice={true}
								isCircularImage={false}
								fullDetails
								fontSize="24px"
								fontWeight="600"
							/>
						))}
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

const ContentStack = styled(Stack)(() => ({
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
const StyledPictureContainer = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		position: "relative",
		width: '50%',
	}
}));

const CustomProductBox = styled(Box)(({ theme }) => ({
	position: 'relative',
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		'&.sticky': {
			position: 'fixed',
			top: '70px',
			width: '485px',
		},
		'&.absolute': {
			position: 'absolute',
			top: 'unset',
			width: '485px',
			bottom: 0,
		},

		height: '400px'
	}
}));

const DetailsStack = styled(Stack)(({ theme }) => ({
	width: '50%',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '100%'
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

const StyledProductDetailStack = styled(Stack)(({ theme }) => ({
	width: '100%',
	flexDirection: 'row',
	padding: theme.spacing(),
	alignSelf: 'center',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: theme.spacing(0),
		maxWidth: '450px',
		flexDirection: 'column',
	},
	[theme.breakpoints.down(320)]: {
		width: '100%'
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

const MobileShareStyledSpan = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	top: '10px',
	right: '10px',
	zIndex: theme.zIndex.fab,
	padding: theme.spacing(1),
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'right',
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		padding: theme.spacing(0.3)
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(17),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23.7)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(16.7)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23)
	},
}));

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: '100%',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(1.5),
	padding: `0px ${theme.spacing(.3)}`,
	gridAutoFlow: 'row dense',
	gridTemplateColumns: "repeat(6,220PX)",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(4,220PX)",
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