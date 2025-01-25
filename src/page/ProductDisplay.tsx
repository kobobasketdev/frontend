import { TItem } from "#component/types/index.js";
import { CUSTOM_893_WIDTH, DESKTOP_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { RoutePath } from "#utils/route.ts";
import { Link } from "@tanstack/react-router";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Stack, styled, Typography } from "@mui/material";
import MiniNavigation from "#component/MiniNavigation.tsx";
import { Check, ChevronRight, ExpandMore } from '@mui/icons-material';
import ScrollableContainer from "#component/ScrollableContainer.tsx";
import { MiniPromotionGrid, ProductAvatar, ShopTypography, WishLishIconButton } from "#component/CommonViews.tsx";
import GrommetWishListSvg from "#component/svg/GrommetWishlistSvg.tsx";
import { theme } from "#customtheme.ts";
import { removeFromWishlist, addToWishlist } from "#state-management/slices/wishlist.slice.ts";
import { useAppDispatch } from "#state-management/hooks.ts";
import { useEffect, useState } from "react";
import ProductDisplayDetail from "#component/ProductDisplayDetail.tsx";
import ShareProductContainer from "#component/ShareProductContainer.tsx";
import ProductAddToCartControl from "#component/ProductAddToCartControl.tsx";
import MiniPromotion from "#component/MiniPromotion.tsx";
import { items as itemsStub } from "#testData.ts";
import ProductItem from "#component/ProductItem.tsx";
import { useSnackbar } from "notistack";
import _ from "lodash";

export default function ProductDisplay({ item }: { item: TItem }) {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [isWishListItem, setIsWishListItem] = useState<boolean>(false);
	
	useEffect(() => {
		setIsWishListItem(item.isWishListItem);
	},[]);
		
	const handleAddToWishlist = (item: TItem) => () => {
		if(isWishListItem) {
			dispatch(removeFromWishlist(""+item.productId));
		}
		else {
			dispatch(addToWishlist(item));
		}
		const newWishListStatus = !isWishListItem;
		setIsWishListItem(newWishListStatus);
	};

	const handleCopyToClipBoard = (itemId: number) => () => {
		navigator.clipboard.writeText(location.origin+"/products/"+itemId);

		enqueueSnackbar(<Alert icon={<Check fontSize="inherit" />} severity="success">
			Product link copied to clipboard
		</Alert>, {
			anchorOrigin: { horizontal: 'right', vertical: 'top' },
			style: { backgroundColor: 'rgb(237, 247, 237)', padding: '0px 0px',  }
		});
	};
		
	return (
		<StyledStackContent gap={2}>
			<ContainerCollection gap={1}>
				<MiniNavigation>
					<StyledHeaderLink to={RoutePath.HOME}>
						<Stack direction={'row'} alignItems={'center'}>
							KOBOBASKET
							<ChevronRight />
						</Stack>
					</StyledHeaderLink>
					<Link to={RoutePath.CATEGORY} params={{ category: _.upperCase(item.category!) }}>
						<StyledHeaderTypography textTransform={'uppercase'}>
							{item.category}
						</StyledHeaderTypography>
					</Link>
				</MiniNavigation>
				<StyledProductDetailStack gap={1}>
					<CustomProductBox position={'relative'} >
						<ScrollableContainer orientation="horizontal" float fullContent width="100%">
							{
								item.images.map((image, index) => (
									<Stack key={index} width={1} height={1}>
										<ProductAvatar 
											key={index}
											src={image || ''} 
											alt={item.name}
											variant={ 'rounded'} 
										/>
									</Stack>
								))
							}
						</ScrollableContainer>
						<StyledSpan>
							<WishLishIconButton onClick={handleAddToWishlist(item)}>
								<GrommetWishListSvg $isFilled={isWishListItem} />
							</WishLishIconButton>
						</StyledSpan>
					</CustomProductBox>
					<DetailsStack gap={1} >
						<ProductDisplayDetail item={item} fontSize="24px" fontWeight="600" />
						<StyledReversableStack gap={1}>
							<ShareProductContainer 
								soldQuantity={600} 
								likeCount={3000} 
								isWishListItem={isWishListItem} 
								handleLikeAction={() => handleAddToWishlist(item)()}
								handleCopyToClipBoard={() => handleCopyToClipBoard(item.productId)()}
							/>
							<Box p={1}>
								<ProductAddToCartControl item={item} fullWidth/>
							</Box>
						</StyledReversableStack>
					</DetailsStack>
				</StyledProductDetailStack>
				<Box>
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
			</ContainerCollection>
			<ContentStack mt={4}>
				<MiniPromotionGrid>
					<MiniPromotion title={"Frequently bought together"} width={"inherit"} type={{
						name: 'scroll',
						spacing: 2,
						size: { height: '100px', width: '100px' },
						scollBy: 210,
					}} items={itemsStub} bgColor={theme.palette.customGrey.main} showPrice height="200px"/>
			
					<MiniPromotion title={"Similar products"} width={"inherit"} type={{
						name: 'scroll',
						spacing: 2,
						size: { height: '100px', width: '100px' },
						scollBy: 210,
					}} items={itemsStub} bgColor={theme.palette.menuBackground.main} showPrice  height="200px"/>
				</MiniPromotionGrid>
			</ContentStack>
			<ContentStack mt={8}>
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
								item={{ ...itemsStub[0], productId: index, name: arrayItem+" "+index , promotion: { 
									promoName: "Valentine's Deals", 
									promoPrice: 10 
								} }} 
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

const ContentStack = styled(Stack)(() => ({
	alignItems: 'center',
	width: '100%',
	marginLeft: 'auto',
	marginRight: 'auto',
	[theme.breakpoints.down(447)] : {
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

const CustomProductBox = styled(Box)(({ theme }) => ({
	[theme.breakpoints.up(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '50%',
		backgroundColor: 'pink',
		borderRadius: theme.shape.borderRadius * 3,
		overflow: 'hidden'
	}
}));

const DetailsStack = styled(Stack)(({ theme }) => ({
	width: '50%',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '100%'
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

const StyledReversableStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(MEDIUM_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column-reverse',
	},
}));

const StyledProductDetailStack = styled(Stack)(({ theme }) => ({
	width: '100%',
	[theme.breakpoints.up(MEDIUM_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'row',
		padding: theme.spacing(),
		alignSelf: 'center',
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column',
		maxWidth: '450px',
		alignSelf: 'center',
	},
	[theme.breakpoints.down(320)]: {
		width: '100%'
	}
}));

const StyledHeaderLink = styled(Link)(({ theme }) => ({
	fontFamily: 'Roboto',
	fontWeight: '500',
	lineHeight: '166%',
	/* or 17px */
	letterSpacing: '0.4px',
	color: theme.palette.primaryBlack.disabled
}));

const StyledHeaderTypography = styled(Typography)(() => ({
	fontFamily: 'Roboto',
	fontWeight: '500',
	lineHeight: '133.4%',

	color: '#090909'
}));

const StyledSpan = styled(Stack)(({ theme })=>({
	position: 'absolute',
	bottom: '0px',
	right: '10px',
	zIndex: theme.zIndex.fab,
	padding: theme.spacing(1),
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'right',
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)] : {
		padding: theme.spacing(0.3)
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(17),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(23.7)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(16.7)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)] : {
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
	[theme.breakpoints.down(447)] : {
		columnGap: theme.spacing(1),
		justifyContent: 'space-around',
		gridTemplateColumns: "repeat(2, minmax(150px, auto))",
	}
}));