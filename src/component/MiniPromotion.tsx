import { Grid2, Stack, styled, Typography } from "@mui/material";
import { TAvatarSizing, TItem, TMiniGrid, TMiniPromotionProps, TMiniScroll } from ".";
import ScrollableContainer from "./ScrollableContainer";
import { NORMAL_PHONE_BREAKPOINT } from "#constants.tsx";
import { ProductAvatar as MiniPromotionAvatar, ProductPriceTypography as MiniPromotionPriceTypography } from "./CommonViews";

export default function MiniPromotion({ 
	title, 
	type, 
	items, 
	bgColor,
	showPrice = false, 
	isCircularImage = false,  
}: TMiniPromotionProps) {
	let promoContent;
	if(type.name === 'grid') {
		const column = (type as TMiniGrid).column;
		promoContent = <GridPromotion 
			items={items} 
			showPrice={showPrice} 
			isCircularImage={isCircularImage} 
			column={column} 
			spacing={type.spacing} 
			size={type.size} 
		/>;
	}
	else {
		const contentViewAreaValue = (type as TMiniScroll).contentViewArea;
		promoContent = <ScrollablePromotion 
			items={items} 
			showPrice={showPrice} 
			isCircularImage={isCircularImage} 
			spacing={type.spacing} 
			size={type.size}
			scrollBy={type.scollBy}
			contentViewArea={contentViewAreaValue}
		/>;
	}
	return (
		<Stack width={'inherit'} height={'auto'} bgcolor={bgColor} borderRadius={2} pt={2} gap={1}>
			<MiniPromotionTypography pl={2}>
				{title}
			</MiniPromotionTypography>
			{promoContent}
		</Stack>
	);
}

const GridPromotion = ({ 
	items, 
	showPrice, 
	isCircularImage, 
	size,
	column, 
	spacing 
}: { 
	items: TItem[], 
	showPrice: boolean, 
	isCircularImage: boolean,
	size?: TAvatarSizing,
	column: number
	spacing?: number 
}) => {
	return (
		<Grid2 container spacing={spacing} columns={column}>
			{
				items.map(item => (
					<Grid2 
						key={item.productId}
					>
						<PromotionContent 
							item={item} 
							showPrice={showPrice} 
							isCircularImage={isCircularImage} 
							size={size} 
						/>
					</Grid2>
				))
			}
		</Grid2>
	);
};

const PromotionContent = ({ 
	item, 
	showPrice, 
	isCircularImage, 
	size,  
}: { 
	item: TItem, 
	showPrice: boolean, 
	isCircularImage: boolean,
	size?: TAvatarSizing,
}) => {
	const currency = 'CAD $';
	return (
		<Stack gap={1.5}>
			<MiniPromotionAvatar 
				src={item.images[0] || ''} 
				alt={item.name}
				variant={isCircularImage ? 'circular' : 'rounded'} 
				$size={size}
			/>
			{
				showPrice && 
				<MiniPromotionPriceTypography $fontSize="18px" $isPromotion $fontWeight="700">{currency}{item.promotion?.promoPrice || item.price}</MiniPromotionPriceTypography>
			}
		</Stack>
	);
};

const ScrollablePromotion = ({ 
	items, 
	showPrice, 
	isCircularImage, 
	size, 
	spacing,
	scrollBy,
	contentViewArea 
}: { 
	items: TItem[], 
	showPrice: boolean, 
	isCircularImage: boolean,
	spacing: number 
	size?: TAvatarSizing,
	scrollBy?: number,
	contentViewArea?: string
}) => {
	return (
		<ScrollableContainer orientation="horizontal" scrollableArea="100%" contentViewArea={contentViewArea} float scrollBy={scrollBy}>
			<Stack direction={'row'} gap={spacing} pl={2} pr={2} justifyContent={'center'}>
				{items.map(item => (
					<PromotionContent 
						key={item.productId}
						item={item} 
						showPrice={showPrice} 
						isCircularImage={isCircularImage} 
						size={size} 
					/>
				))}
			</Stack>
		</ScrollableContainer>
	);
};

const MiniPromotionTypography = styled(Typography)(({ theme })=>({
	fontFamily: 'Inter',
	fontWeight: '600',
	fontSize: '22px',
	lineHeight: '133.4%',
	color: '#000000',
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)]: {
		fontSize: '20px',
	}
}));

