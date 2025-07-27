import { SMALL_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { styled, Stack, Button } from "@mui/material";
import { ContentStack, MiniPromotionGrid, ProductAvatar, ShopTypography, ShopTypographyLight } from "./CommonViews";
import MiniPromotion from "./MiniPromotion";
import ScrollableContainer from "./ScrollableContainer";
import ProductItem from "./ProductItem";
import { getAllCategories } from "#hooks/query/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { shuffle } from "lodash";
import fetcher from "#hooks/fetcher.ts";
import { TItem } from "./types";
import { RoutePath } from "#utils/route.ts";
import { useNavigate } from "@tanstack/react-router";

export default function InitialMarketPlace() {
	const { data: categories } = useQuery(getAllCategories());

	const { data: productsData } = useQuery({
		queryKey: ['all-product', 1],
		queryFn: async () => {
			return fetcher.get(`v1/products?page=1&limit=40`);
		},
		staleTime: 5400000,
		placeholderData: keepPreviousData
	});

	const { data: basketData } = useQuery({
		queryKey: ['promotion', 1],
		queryFn: () => fetcher.get('v1/products?page=1&limit=10&type=basket'),
		staleTime: 5400000,
		placeholderData: keepPreviousData
	});
	const products: TItem[] = productsData?.data.data || [];
	const basketProducts = shuffle(basketData?.data.data || []);
	const shuffledCategorySet = new Set(shuffle(categories?.data.data));
	const categoryIterator = shuffledCategorySet[Symbol.iterator]();

	return (
		<Stack width={1} gap={6} pt={4} pb={2}>
			<ContentStack>
				{
					shuffledCategorySet.size > 0 &&
					<MiniPromotionGrid>
						<MiniPromotion
							categoryInfo={categoryIterator.next().value}
							width={"inherit"} type={{
								name: 'scroll',
								spacing: 2,
								size: { height: '100px', width: '100px' },
								scollBy: 210,
							}} itemCount={20} bgColor={theme.palette.primaryGreen.lightshade!} showPrice height="200px" />

						<MiniPromotion
							categoryInfo={categoryIterator.next().value}
							width={"inherit"} type={{
								name: 'scroll',
								spacing: 2,
								size: { height: '100px', width: '100px' },
								scollBy: 210,
							}} itemCount={20} bgColor={theme.palette.menuBackground.main} showPrice height="200px" />
					</MiniPromotionGrid>
				}
			</ContentStack>
			<ContentStack>
				<Stack gap={2} >
					<Stack gap={1}>
						<ShopTypography>
							SHOP ALL THINGS WEST AFRICA
						</ShopTypography>
						<ShopTypographyLight>
							Recommended products
						</ShopTypographyLight>
					</Stack>
					<ProductItemGrid>
						{products.slice(0, 21).map((item, index) => (
							<ProductItem
								key={index}
								item={item}
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
			<ProductPromotionContainer>
				<ProductPromotionGrid>
					{
						shuffledCategorySet.size > 0 &&
						<StyledLeftStack gap={2}>
							<MiniPromotion
								categoryInfo={categoryIterator.next().value}
								itemCount={6} width={"inherit"} type={{
									name: 'grid',
									spacing: 2,
									column: 2
								}}
								bgColor={theme.palette.customGrey.main} isCircularImage dynamicClass />

							<MiniPromotion
								categoryInfo={categoryIterator.next().value}
								width={"inherit"} type={{
									name: 'grid',
									spacing: 2,
									column: 2
								}}
								itemCount={2} bgColor={theme.palette.menuBackground.main} />
						</StyledLeftStack>
					}
					<LargePromotionContainer basketProducts={basketProducts} />
					{
						shuffledCategorySet.size > 0 &&
						<StyledRightStack gap={2}>
							<MiniPromotion
								categoryInfo={categoryIterator.next().value}
								width={"inherit"} type={{
									name: 'grid',
									spacing: 2,
									column: 2
								}}
								itemCount={2} bgColor={theme.palette.menuBackground.main} />
							<MiniPromotion
								categoryInfo={categoryIterator.next().value}
								width={"inherit"} type={{
									name: 'grid',
									spacing: 2,
									column: 2
								}}
								itemCount={6} bgColor={theme.palette.customGrey.main} dynamicClass />
						</StyledRightStack>
					}
				</ProductPromotionGrid>
			</ProductPromotionContainer>
			<ContentStack>
				<Stack gap={2} >
					<ProductItemGrid>
						{products.slice(21).map((item, index) => (
							<ProductItem
								key={index}
								item={item}
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
		</Stack>
	);
}


const LargePromotionContainer = ({ basketProducts }: { basketProducts: TItem[] }) => {
	const navigate = useNavigate();
	const handleGotoProductDetails = (itemId: string) => () => {
		navigate({
			to: RoutePath.PRODUCT_DISPLAY,
			params: { details: itemId + "" }
		});
	};
	return (
		<StyledLargePromotionStack borderRadius={3} overflow={'hidden'}>
			{
				basketProducts.length > 0 &&
				<ScrollableContainer orientation="horizontal" float fullContent>
					{
						basketProducts.map(item => (
							<CustomPromotionStack key={item.id}>
								<ProductAvatar src={item.images[0]?.url || ''} variant="rounded" />
								<LargePromotionShopNow onClick={handleGotoProductDetails(item.id)}>
									Shop Now
								</LargePromotionShopNow>
							</CustomPromotionStack>
						))
					}
				</ScrollableContainer>
			}
		</StyledLargePromotionStack>
	);
};

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: '100%',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(4),
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

const ProductPromotionContainer = styled('div')(({ theme }) => ({

	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%'
	}
}));

const ProductPromotionGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	rowGap: theme.spacing(4),
	'& .dynamic-avatar': {
		height: '115px'
	},
	justifyContent: 'center',
	columnGap: theme.spacing(4),
	gridTemplateColumns: "repeat(3, 400px)",

	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(3, 320px)",
		columnGap: theme.spacing(2),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		'& .dynamic-avatar': {
			height: '110px'
		},
		gridTemplateColumns: "repeat(2, auto)",
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		'& .dynamic-avatar': {
			height: '120px'
		},
		gridTemplateColumns: "repeat(1, 452px)",
	},
	[theme.breakpoints.down(485)]: {

		justifyContent: 'center',
		gridTemplateColumns: "repeat(1, minmax(320px, auto))",
	}
}));

const StyledLeftStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'row',
		gridColumn: '1 / 3',
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		gridColumn: '1 / 1',
		flexDirection: 'column',
		' > div:first-of-type .grid-parent': {
			gridTemplateColumns: 'repeat(3, auto)',
		}
	},
	[theme.breakpoints.down(364)]: {
		' > div:first-of-type .grid-parent': {
			gridTemplateColumns: 'repeat(2, auto)',
			'& .dynamic-avatar': {
				height: '130px'
			},
		}
	},
}));

const StyledLargePromotionStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		height: '500px',
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		height: '500px',
	},
}));

const CustomPromotionStack = styled(Stack)(() => ({
	position: 'relative',
	width: '100%',
	height: '100%',
}));

const StyledRightStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'row',
		'& > div:first-of-type ': {
			width: 'unset'
		}
	},
	[theme.breakpoints.between(911, TABLET_SCREEN_MAX_WIDTH)]: {
		'& > div:nth-of-type(2) .grid-parent': {
			gridTemplateColumns: 'repeat(2, auto)'
		}
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column',
	},
}));

const LargePromotionShopNow = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primaryOrange.main,
	border: `${theme.spacing(.3)} solid white`,
	fontFamily: 'Roboto',
	fontWeight: '600',
	fontSize: '15px',
	lineHeight: '26px',
	letterSpacing: '0.46px',
	textTransform: 'uppercase',
	color: '#FFFFFF',
	position: 'absolute',
	bottom: '20px',
	right: '20px',
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2)
}));

