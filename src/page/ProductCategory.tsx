import { ProductAvatar  } from "#component/CommonViews.tsx";
import MiniPromotion from "#component/MiniPromotion.tsx";
import ProductItem from "#component/ProductItem.tsx";
import ProductSpecificFilter from "#component/ProductSpecificFilter.tsx";
import ScrollableContainer from "#component/ScrollableContainer.tsx";
import { SMALL_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, DESKTOP_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { theme } from "#customtheme.ts";
import { items } from "#testData.ts";
import { Button, Stack, styled } from "@mui/material";

export default function ProductCategory() {
	
	return (
		<StyledStackContent>
			<StyledStack>
				<ProductSpecificFilter />
				<ProductCategoryStack width={1} gap={6} pt={4} pb={4}>
					<ContentStack>
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
					<StyledViewMoreStack alignItems={'center'} >
						<StyledButton variant="outlined" color="inherit" size="small" >VIEW MORE PRODUCTS</StyledButton>
					</StyledViewMoreStack>
				</ProductCategoryStack>
			</StyledStack>
		</StyledStackContent>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(15),
	[theme.breakpoints.down(1346)] : {
		paddingTop: theme.spacing(16.4),
	},
	[theme.breakpoints.down(1300)] : {
		paddingTop: theme.spacing(19.4),
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(23.5)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(22)
	},
	[theme.breakpoints.down(955)] : {
		paddingTop: theme.spacing(24)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)] : {
		paddingTop: theme.spacing(26)
	},
}));

const StyledStack = styled('div')(({ theme }) => ({
	flexDirection: 'row',
	display: 'flex',
	marginTop: theme.spacing(),
	[theme.breakpoints.down(955)]: {
		flexDirection: 'column',
	}
}));

const StyledViewMoreStack = styled(Stack)(({ theme }) => ({
	width: 'calc(100% - 220px)',
	alignSelf: 'end',
	[theme.breakpoints.down(955)]: {
		width: '100%',
		alignSelf: 'unset'
	}
}));


const ProductCategoryStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(955)]: {
		width: '100%'
	}
}));



const ContentStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(955)]: {
		width: 'fit-content',
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	[theme.breakpoints.down(447)]: {
		width: '100%',
	}
}));

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(1.5),  
	padding: `0px ${theme.spacing(.3)}`,
	gridAutoFlow: 'row dense',
	width: 'calc(100% - 220px)',
	gridTemplateColumns: "repeat(6, minmax(190px, 220px))",
	justifyContent: 'center',
	alignSelf: 'end',
	[theme.breakpoints.down(1540)]: {
		gridTemplateColumns: "repeat(5, 210px)",
	},
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		columnGap: theme.spacing(),
		gridTemplateColumns: "repeat(5, minmax(190px, auto))",
	},
	[theme.breakpoints.down(1300)]: {
		gridTemplateColumns: "repeat(4, minmax(180px, 220px))",
	},
	[theme.breakpoints.down(1114)]: {
		columnGap: theme.spacing(1.5),
		padding: `0px ${theme.spacing()}`,
		gridTemplateColumns: "repeat(3, minmax(180px, 220px))",
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: `0px ${theme.spacing()}`,
		gridTemplateColumns: "repeat(3, minmax(180px, 220px))",
	},
	[theme.breakpoints.down(955)]: {
		alignSelf: 'unset',
		width: '100%',
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

const ProductPromotionContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
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
	alignSelf: 'end',
	gridTemplateColumns: "repeat(3, auto)",
	width: 'calc(100% - 220px)',
	columnGap: theme.spacing(2),

    
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)] : {
		gridTemplateColumns: "repeat(2, auto)",
		columnGap: theme.spacing(2),
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)] : {
		'& .dynamic-avatar': {
			height: '140px',
			width: '130px'
		},
		padding: `0px`,
		gridTemplateColumns: "repeat(2, auto)",
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)] : {
		'& .dynamic-avatar': {
			height: '140px',
			width: '130px'
		},
		padding: `0px`,
		gridTemplateColumns: "repeat(2, auto)",
	},
	[theme.breakpoints.down(955)] : {
		width: '100%',
		'& .dynamic-avatar': {
			height: '110px'
		},
		gridTemplateColumns: "repeat(2, auto)",
		alignSelf: 'unset'
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
	'& > div:nth-of-type(1) .grid-parent' : {
		gridTemplateColumns: 'repeat(3, auto)',
		'& .dynamic-avatar': {
			height: '100px',
			width: '100px'
		},
	},
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'row',
		gridColumn: '1 / 3',
		width: 'fit-content',
		'& > div:nth-of-type(1) .grid-parent' : {
			gridTemplateColumns: 'repeat(3, 120px)',
			justifyContent: 'space-between'
		},
		'& > div:nth-of-type(2) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, 165px)',
		}
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		width: 'fit-content',
		gridColumn: '1 / 2',
		flexDirection: 'column',
		'& > div:nth-of-type(1) .grid-parent' : {
			gridTemplateColumns: 'repeat(3, auto)',
			'& .dynamic-avatar': {
				height: '100px',
				width: '100px'
			},
		},
		'& > div:nth-of-type(2) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, 130px)',
			justifyContent: 'center'
		}
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		gridColumn: '1 / 2',
		flexDirection: 'column',
		'& > div:nth-of-type(1) .grid-parent' : {
			gridTemplateColumns: 'repeat(3, auto)',
			'& .dynamic-avatar': {
				height: '100px',
				width: '100px'
			},
		},
		'& > div:nth-of-type(2) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, 130px)',
			justifyContent: 'center'
		}
	},
	[theme.breakpoints.down(955)]: {
		gridColumn: '1 / 3',
		flexDirection: 'row',
		'& > div:nth-of-type(1) .grid-parent' : {
			gridTemplateColumns: 'repeat(3, auto)',
			'& .dynamic-avatar': {
				height: '120px',
				width: '120px'
			},
		},
		'& > div:nth-of-type(2) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, auto)'
		}
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		gridColumn: '1 / 1',
		flexDirection: 'column',
		' > div:first-of-type .grid-parent': {
			justifyContent: 'space-around',
			gridTemplateColumns: 'repeat(2, auto)',
            
			'& .dynamic-avatar': {
				height: '130px',
				width: '130px'
			},
		}
	},
}));

const StyledLargePromotionStack = styled(Stack)(({ theme }) => ({
	// width: '350px',
	width: '380px',
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		height: '100%',
		width: '424px'
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		height: '100%',
		width: '340px'
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		height: '100%',
		width: '340px'
	},
	[theme.breakpoints.down(955)]: {
		height: '100%',
		width: 'unset'
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
	'& > div:nth-of-type(2) .grid-parent' : {
		gridTemplateColumns: 'repeat(3, auto)',
		justifyContent: 'space-around',
		'& .dynamic-avatar': {
			height: '100px',
			width: '100px'
		},
	},
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		width: '380px',
		'& > div:nth-of-type(2) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, 140px)',
			justifyContent: 'space-around',
			'& .dynamic-avatar': {
				height: 'unset',
				width: 'unset'
			},
		},
		'& > div:nth-of-type(1) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, 140px)',
			justifyContent: 'center'
		}
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		width: 'unset',
		gridColumn: '1 / 3',
		flexDirection: 'row',
		'& > div:nth-of-type(2) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, 140px)',
			'& .dynamic-avatar': {
				height: '130px',
				width: '140px'
			},
		},
		'& > div:nth-of-type(1) .grid-parent' : {
			gridTemplateColumns: 'repeat(1, 220px)',
			justifyContent: 'center'
		}
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: 'unset',
		gridColumn: '1 / 3',
		flexDirection: 'row',
		'& > div:nth-of-type(2) .grid-parent' : {
			gridTemplateColumns: 'repeat(2, 140px)',
			'& .dynamic-avatar': {
				height: '130px',
				width: '140px'
			},
		},
		'& > div:nth-of-type(1) .grid-parent' : {
			gridTemplateColumns: 'repeat(1, 220px)',
			justifyContent: 'center'
		}
	},
	[theme.breakpoints.down(955)]: {
		flexDirection: 'column',
		gridColumn: '2 / 3',
		'& > div:nth-of-type(1)' : {
			width: '100%',
			'& .grid-parent': {
				justifyContent: 'center',
				gridTemplateColumns: 'repeat(2, 180px)',
			}
		},

		'& > div:nth-of-type(2)' : {
			width: 'fit-content',
			'& .grid-parent': {
				gridTemplateColumns: 'repeat(3, 120px)',
				'& .dynamic-avatar': {
					height: '130px',
					width: '130px'
				},
			}
		}
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		gridColumn: '1 / 1',
		flexDirection: 'column',
		'& > div:nth-of-type(1)' : {
			'& .grid-parent': {
				gridTemplateColumns: 'repeat(2, auto)',
			}
		},
		'& > div:nth-of-type(2)' : {
			width: 'unset',
			'& .grid-parent' : {
				gridTemplateColumns: 'repeat(2, auto)',
				'& .dynamic-avatar': {
					height: 'unset',
					width: 'unset'
				},
			}
		}
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