import MiniPromotion from "#component/MiniPromotion.tsx";
import { Button, Stack, styled, Typography } from "@mui/material";
//TODO Get Item data as items
import { items } from "#testData.ts";
import { theme } from "#customtheme.ts"; 
import { NORMAL_PHONE_BREAKPOINT, XTRA_SMALL_PHONE_BREAKPOINT } from "#constants.tsx";
import ProductItem from "#component/ProductItem.tsx";
import { ProductAvatar } from "#component/CommonViews.tsx";
import ScrollableContainer from "#component/ScrollableContainer.tsx";

export default function MarketPlace() {
	
	return (
		<Stack width={1} bgcolor={''}>
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
				<ProductPromotionContainer>
					<ProductPromotionGrid>
						<StyledLeftStack gap={4}>
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
						<StyledLargePromotionStack borderRadius={1}>
							<ScrollableContainer orientation="horizontal" float>
								{
									['', '', ''].map((image, index) => (
										<Stack key={index}>
											<ProductAvatar key={index} src={image} variant="rounded"/>
											<LargePromotionShopNow>
												Shop Now
											</LargePromotionShopNow> 
										</Stack>
									))
								}
							</ScrollableContainer>
						</StyledLargePromotionStack>
						<StyledRightStack gap={4}>
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
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)]: {
		fontSize: '24px'
	},
	[theme.breakpoints.between('xs', 500)]: {
		textAlign: 'center'
	}
}));

const ShopTypographyLight = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: '18px',
	lineHeight: '175%',
	letterSpacing: '0.15px',
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)]: {
		fontSize: '16px'
	},
	[theme.breakpoints.between('xs', 500)]: {
		textAlign: 'center'
	}
}));

const MiniPromotionGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: 'fit-content',
	columnGap: theme.spacing(8),
	gridTemplateColumns: "repeat(2,640px)",
	[theme.breakpoints.down(1370)]: {
		gridTemplateColumns: "repeat(2, 410px)",
	},
	[theme.breakpoints.down(916)]: {
		gridTemplateColumns: "repeat(2, 300px)",
	},
	[theme.breakpoints.down(681)]: {
		gridTemplateColumns: "repeat(1, 440px)",
		columGap: theme.spacing(0),
		rowGap: theme.spacing(8)
	},
	[theme.breakpoints.down(466)]: {
		gridTemplateColumns: "repeat(1, 365px)",
	},
	[theme.breakpoints.down(XTRA_SMALL_PHONE_BREAKPOINT)]: {
		gridTemplateColumns: "repeat(1, 310px)",
	}
}));

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: 'fit-content',
	columnGap: theme.spacing(2),
	rowGap: theme.spacing(8),
	gridTemplateColumns: "repeat(6, 210px)",
	[theme.breakpoints.down(1370)]: {
		gridTemplateColumns: "repeat(4, 210px)",
	},
	[theme.breakpoints.down(916)]: {
		gridTemplateColumns: "repeat(3, 210px)",
	},
	[theme.breakpoints.down(681)]: {
		gridTemplateColumns: "repeat(2, 210px)",
	},
	[theme.breakpoints.down(466)]: {
		gridTemplateColumns: "repeat(2, 180px)",
	},
	[theme.breakpoints.down(XTRA_SMALL_PHONE_BREAKPOINT)]: {
		gridTemplateColumns: "repeat(2, 150px)",
		marginLeft: 'auto',
		marginRight: 'auto'
	}
}));

const ProductPromotionContainer = styled('div')(() => ({
	alignItems: 'center',
	width: 'fit-content',
	marginLeft: 'auto',
	marginRight: 'auto',
}));

const ProductPromotionGrid = styled('div')(({ theme }) => ({
	columnGap: theme.spacing(2),
	display: 'grid',
	gridTemplateColumns: "repeat(3, 440px)",
	'& .dynamic-avatar': {
		height: '120px'
	},
	[theme.breakpoints.down(1370)]: {
		gridTemplateColumns: "repeat(3, 380px)",
		'& .dynamic-avatar': {
			height: '110px'
		},
	},
	[theme.breakpoints.down(1198)]: {
		gridTemplateColumns: "repeat(3, 280px)",
		'& .dynamic-avatar': {
			width: '110px',
		},
	},
	[theme.breakpoints.down(916)]: {
		gridTemplateColumns: "repeat(auto-fill, minmax(230px, auto))",
		width: '700px',
		gridAutoFlow: 'dense',
		rowGap: theme.spacing(4),
	},
	[theme.breakpoints.down(728)]: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '500px',
		gridAutoFlow: 'row',
		rowGap: theme.spacing(6),
	},
	[theme.breakpoints.down(530)]: {
		maxWidth: '420px',
	},
	[theme.breakpoints.down(445)]: {
		maxWidth: '350px',
	},
}));

const StyledLeftStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(916)]: {
		gap: theme.spacing(1.5),
		flexDirection: 'column-reverse',
		'& > div:nth-of-type(1) .grid-parent': {
			paddingLeft: theme.spacing(5.5),
			'& .dynamic-avatar': {
				width: '100px',
				height: '100px'
			},
		},
	},
	[theme.breakpoints.down(728)]: {
		rowGap: theme.spacing(4),
	},
	[theme.breakpoints.down(530)]: {
		'& > div:nth-of-type(1) .grid-parent': {
			paddingLeft: theme.spacing(4),
			'& .dynamic-avatar': {
				width: '100px',
				height: '100px'
			},
		},

		'& > div:nth-of-type(2) .grid-parent': {
			columnGap: theme.spacing(4),
			paddingLeft: theme.spacing(5.5),
			gridTemplateColumns: 'repeat(auto-fit, 150px)'
		},
	},
	[theme.breakpoints.down(445)]: {
		'& > div:nth-of-type(1) .grid-parent': {
			paddingLeft: theme.spacing(5),
			'& .dynamic-avatar': {
				width: '100px',
				height: '100px'
			},
		},

		'& > div:nth-of-type(2) .grid-parent': {
			columnGap: theme.spacing(4),
			paddingLeft: theme.spacing(4),
			gridTemplateColumns: 'repeat(auto-fit, 124px)'
		},
	},
}));

const StyledLargePromotionStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(728)]: {
		height: '450px'
	},
}));

const StyledRightStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(916)]: {
		gap: theme.spacing(2),
		flexDirection: 'row-reverse',
		alignItems: 'baseline',
		gridColumn: '1 / 3',
		'& .dynamic-avatar': {
			width: '140.5px'
		},
		'& > div:nth-of-type(2)': {
			width: '700px',
			'.grid-parent': {
				rowGap: theme.spacing(4),
			}
		},
		'& > div:nth-of-type(1) ': {
			height: '100%',
			'.grid-parent': {
				alignSelf: 'center',
				rowGap: theme.spacing(4),
				gridTemplateColumns: 'repeat(1, 200px)'
			}
		}
	},
	[theme.breakpoints.down(728)]: {
		flexDirection: 'column',
		gridColumn: 'none',
		rowGap: theme.spacing(4),
		'& .dynamic-avatar': {
			width: '120px',
			height: '120px'
		},
		'& > div:nth-of-type(2)': {
			width: '100%',
			'.grid-parent': {
				rowGap: theme.spacing(3),
				columnGap: theme.spacing(3),
				paddingLeft: theme.spacing(6),
				gridTemplateColumns: 'repeat(auto-fit, 120px)'
			}
		},
		'& > div:nth-of-type(1) ': {
			'.grid-parent': {
				alignSelf: 'unset',
				rowGap: 'unset',
				columnGap: theme.spacing(3),
				gridTemplateColumns: 'repeat(auto-fit, 220px)'
			}
		}
	},
	[theme.breakpoints.down(530)]: {
		'& > div:nth-of-type(1) .grid-parent': {
			paddingLeft: theme.spacing(5.5),
			gridTemplateColumns: 'repeat(auto-fit, 150px)'
		},
		'& > div:nth-of-type(2) .grid-parent': {
			paddingLeft: theme.spacing(8),
			columnGap: theme.spacing(5),
		},
	},
	[theme.breakpoints.down(445)]: {
		'& > div:nth-of-type(2) .grid-parent': {
			paddingLeft: theme.spacing(4.5),
			'& .dynamic-avatar': {
				width: '100px',
				height: '100px'
			},
		},

		'& > div:nth-of-type(1) .grid-parent': {
			columnGap: theme.spacing(4),
			paddingLeft: theme.spacing(4),
			gridTemplateColumns: 'repeat(auto-fit, 124px)'
		},
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
	bottom: '90px',
	right: '20px',
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2)
}));

const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover
}));

