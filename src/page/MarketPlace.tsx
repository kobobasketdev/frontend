import MiniPromotion from "#component/MiniPromotion.tsx";
import { Grid2, Stack, styled, Typography } from "@mui/material";
//TODO Get Item data as items
import { items } from "#testData.ts";
import { theme } from "#customtheme.ts"; 
import { NORMAL_PHONE_BREAKPOINT, SMALLDESKTOP_BREAKPOINT } from "#constants.tsx";
import ProductItem from "#component/ProductItem.tsx";

export default function MarketPlace() {
	
	return (
		<Stack width={1} >
			<Banner>
			</Banner>
			<Stack width={1} alignItems={'center'}>
				<ContentStack width={1} gap={8}>
					<Grid2 container spacing={2} columnSpacing={6}>
						<Grid2 size={{ xs: 12, sm: 12, md: 'grow' }}>
							<MiniPromotion title={"Best sellers in Food"} width={"inherit"} type={{
								name: 'scroll',
								spacing: 2,
								size: { height: 100, width: 100 },
								scollBy: 210,
								contentViewArea: '145px'
							}} items={items} bgColor={theme.palette.customGrey.main} showPrice />
						</Grid2>
						<Grid2 size={{ xs: 12, sm: 12, md: 'grow' }}>
							<MiniPromotion title={"Frequently bought snacks"} width={"inherit"} type={{
								name: 'scroll',
								spacing: 2,
								size: { height: 100, width: 100 },
								scollBy: 210,
								contentViewArea: '145px'
							}} items={items} bgColor={theme.palette.menuBackground.main} showPrice />
						</Grid2>
					</Grid2>
					<Stack gap={2} >
						<Stack gap={1}>
							<ShopTypography>
								SHOP ALL THINGS WEST AFRICA
							</ShopTypography>
							<ShopTypographyLight>
								Recommended products
							</ShopTypographyLight>
						</Stack>
						<Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} rowGap={6}>
							{items.map(item => (
								<ProductItem 
									key={item.productId}
									item={item} 
									showPrice={true} 
									isCircularImage={false}
									fullDetails
									fontSize="24px"
									fontWeight="600"
									size={{ xs: 2, sm: 4, md: 3, xl:2 }}
								/>
							))}
						</Grid2>
						{/* <CustomGrid>
							{items.map(item => (
								<ProductItem 
									key={item.productId}
									item={item} 
									showPrice={true} 
									isCircularImage={false}
									fullDetails
									fontSize="24px"
									fontWeight="600"
								/>
							))}
						</CustomGrid> */}
					</Stack>
				</ContentStack>
			</Stack>
		</Stack>
	);
}

const Banner = styled('div')(({ theme }) =>({
	width: '100%',
	backgroundColor: theme.palette.divider,
	height: '279px'
}));

const ContentStack = styled(Stack)(({ theme }) => ({
	padding: theme.spacing(3),
	paddingLeft: theme.spacing(8),
	paddingRight: theme.spacing(8),
	width: '95%',
	[theme.breakpoints.between('xs', 1335)]: {
		padding: theme.spacing(2),
		width: '90%'
	},
	[theme.breakpoints.between('xs', SMALLDESKTOP_BREAKPOINT)]: {
		width: '100%'
	},
	// [theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)]: {
	// 	padding: theme.spacing(2),
	// 	paddingLeft: theme.spacing(1),
	// 	paddingRight: theme.spacing(1),
	// 	width: '100%'
	// },
	// [theme.breakpoints.between('xs', 500)]: {
	// 	padding: theme.spacing(2),
	// 	paddingLeft: theme.spacing(1),
	// 	paddingRight: theme.spacing(1),
	// 	width: '300px'
	// }
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

const CustomGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	// justifyContent: 'space-between',
	columnGap: theme.spacing(2),
	rowGap: theme.spacing(8),
	flexWrap: 'wrap',
	gridAutoFlow: 'row dense',
	gridTemplateColumns: 'repeat(auto-fill, 224px)',
	[theme.breakpoints.between('xs', SMALLDESKTOP_BREAKPOINT)]: {
		columnGap: theme.spacing(2),
	},
	[theme.breakpoints.between('xs', 500)]: {
		justifyContent: 'center',
	}
}));