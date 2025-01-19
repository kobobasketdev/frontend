import MiniPromotion from "#component/MiniPromotion.tsx";
import { Button, Stack, styled, Typography } from "@mui/material";
//TODO Get Item data as items
import { items } from "#testData.ts";
import { theme } from "#customtheme.ts"; 
import { CUSTOM_893_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import ProductItem from "#component/ProductItem.tsx";
import { ProductAvatar } from "#component/CommonViews.tsx";
import ScrollableContainer from "#component/ScrollableContainer.tsx";

export default function MarketPlace() {
	
	return (
		<Stack width={1}>
			<Banner>
			</Banner>
			<Stack width={1} gap={6} pt={4} pb={4}>
				<ContentStack>
					<MiniPromotionGrid>
						<MiniPromotion title={"Best sellers in Food"} width={"inherit"} type={{
							name: 'scroll',
							spacing: 2,
							size: { height: '100px', width: '100px' },
							scollBy: 210,
						}} items={items} bgColor={theme.palette.customGrey.main} showPrice height="200px"/>

						<MiniPromotion title={"Frequently bought snacks"} width={"inherit"} type={{
							name: 'scroll',
							spacing: 2,
							size: { height: '100px', width: '100px' },
							scollBy: 210,
						}} items={items} bgColor={theme.palette.menuBackground.main} showPrice  height="200px"/>
					</MiniPromotionGrid>
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
							{Array(24).fill('Item').map((arrayItem, index) => (
								<ProductItem 
									key={index}
									item={{ ...items[0], productId: index, name: arrayItem+" "+index , promotion: { 
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
				<ProductPromotionContainer>
					<ProductPromotionGrid>
						<StyledLeftStack gap={2}>
							<MiniPromotion title={"Shop new products this week"} width={"inherit"} type={{
								name: 'grid',
								spacing: 2,
								column: 2
							}} items={items.slice(0,6)} bgColor={theme.palette.customGrey.main} isCircularImage dynamicClass/>

							<MiniPromotion title={"Amazing Deals on Staples"} width={"inherit"} type={{
								name: 'grid',
								spacing: 2,
								column: 2
							}} items={items.slice(0,2)} bgColor={theme.palette.menuBackground.main} />
						</StyledLeftStack>
						<StyledLargePromotionStack borderRadius={3} overflow={'hidden'}>
							<ScrollableContainer orientation="horizontal" float fullContent>
								{
									["","",""].map((image, index) => (
										<CustomPromotionStack key={index}>
											<ProductAvatar src={image} variant="rounded"/>
											<LargePromotionShopNow>
												Shop Now
											</LargePromotionShopNow> 
										</CustomPromotionStack>
									))
								}
							</ScrollableContainer>
						</StyledLargePromotionStack>
						<StyledRightStack gap={2}>
							<MiniPromotion title={"Shop quality Farmed oils"} width={"inherit"} type={{
								name: 'grid',
								spacing: 2,
								column: 2
							}} items={items.slice(0,2)} bgColor={theme.palette.menuBackground.main}/>
							<MiniPromotion title={"Get Free gift on this products"} width={"inherit"} type={{
								name: 'grid',
								spacing: 2,
								column: 2
							}} items={items.slice(0,6)} bgColor={theme.palette.customGrey.main} dynamicClass />
						</StyledRightStack>
					</ProductPromotionGrid>
				</ProductPromotionContainer>
				<ContentStack>
					<Stack gap={2} >
						<ProductItemGrid>
							{Array(24).fill('Item').map((arrayItem, index) => (
								<ProductItem 
									key={index}
									item={{ ...items[0], name: arrayItem+" "+index }} 
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
				<Stack alignItems={'center'}>
					<StyledButton variant="outlined" color="inherit" size="small" >VIEW MORE PRODUCTS</StyledButton>
				</Stack>
			</Stack>
		</Stack>
	);
}

const Banner = styled('div')(({ theme }) =>({
	width: '100%',
	backgroundColor: theme.palette.divider,
	height: '279px'
}));

const ContentStack = styled(Stack)(() => ({
	alignItems: 'center',
	width: 'fit-content',
	marginLeft: 'auto',
	marginRight: 'auto',
}));


const ShopTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Alata',
	fontWeight: '400',
	fontSize: '30px',
	lineHeight: '133.4%',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingLeft: theme.spacing()
	},
}));

const ShopTypographyLight = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: '18px',
	lineHeight: '175%',
	letterSpacing: '0.15px',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingLeft: theme.spacing()
	},
	
}));

const MiniPromotionGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: 'fit-content',
	columnGap: theme.spacing(3),
	rowGap: theme.spacing(4),
	gridTemplateColumns: "repeat(2, 680px)",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(2, 450px)",
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(2, minmax(400px,auto))",
		padding: `0px ${theme.spacing(1)}`,
	},
	[theme.breakpoints.down(893)]: {
		gridTemplateColumns: "repeat(1, 690px)",
		padding: `0px`,
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(1, minmax(318px, auto))",
		padding: `0px ${theme.spacing(2)}`,
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(1, minmax(318px, auto))",
		padding: `0px`,
	}
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
		columnGap: theme.spacing(0),
		justifyContent: 'space-around',
		gridTemplateColumns: "repeat(2, 150px)",
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
	
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)] : {
		gridTemplateColumns: "repeat(3, 320px)",
		columnGap: theme.spacing(2),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)] : {
		'& .dynamic-avatar': {
			height: '110px'
		},
		gridTemplateColumns: "repeat(2, auto)",
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)] : {
		'& .dynamic-avatar': {
			height: '120px'
		},
		gridTemplateColumns: "repeat(1, 452px)",
	},
	[theme.breakpoints.down(485)] : {
		
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
		'& > div:first-of-type ' : {
			width: 'unset'
		}
	},
	[theme.breakpoints.between(911, TABLET_SCREEN_MAX_WIDTH)]: {
		'& > div:nth-of-type(2) .grid-parent' : {
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

const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover
}));

