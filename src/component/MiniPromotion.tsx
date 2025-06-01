import { Stack, styled, Typography } from "@mui/material";
import { TAvatarSizing, TItem, TMiniGrid, TMiniPromotionProps } from "./types";
import ScrollableContainer from "./ScrollableContainer";
import { NORMAL_PHONE_BREAKPOINT } from "#constants.tsx";
import { ProductAvatar as MiniPromotionAvatar, ProductPriceTypography as MiniPromotionPriceTypography } from "./CommonViews";
import { Link } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsByCategory } from "#hooks/query/product";
import { shuffle, upperFirst } from "lodash";

const BANNER = ['Best sellers in ', 'Frequently bought ', 'Amazing Deals on ', 'Shop new products in ', 'Continue shopping for '];

export default function MiniPromotion({
	itemCount,
	categoryInfo,
	type,
	bgColor,
	showPrice = false,
	isCircularImage = false,
	dynamicClass,
	height,
	title
}: TMiniPromotionProps) {
	const index = Math.floor((Math.random() * BANNER.length));
	const { data: itemsData } = useQuery(getAllProductsByCategory({ page: 1, productCategory: categoryInfo.id, isPromotion: categoryInfo.isPromotion }));
	const shuffledData = shuffle(itemsData?.data as TItem[]);
	const bannerTitle = title || BANNER[index] + upperFirst(categoryInfo.name);

	const finalItemCount = (!itemCount || itemCount > shuffledData.length) ? shuffledData.length : itemCount;
	let promoContent;
	if (type.name === 'grid') {
		const column = (type as TMiniGrid).column;
		promoContent = <GridPromotion
			items={shuffledData.slice(0, finalItemCount)}
			showPrice={showPrice}
			isCircularImage={isCircularImage}
			column={column}
			spacing={type.spacing}
			size={type.size}
			dynamicClass={dynamicClass}
		/>;
	}
	else {
		promoContent = <ScrollablePromotion
			items={shuffledData.slice(0, finalItemCount)}
			showPrice={showPrice}
			isCircularImage={isCircularImage}
			spacing={type.spacing}
			size={type.size}
			scrollBy={type.scollBy}
		/>;
	}
	return (
		<Stack width={1} height={height || 'inherit'} bgcolor={bgColor} borderRadius={2} pt={2} gap={1}>
			<MiniPromotionTypography pl={2} pr={2}>
				{bannerTitle}
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
	column = 2,
	spacing = 2,
	dynamicClass
}: {
	items: TItem[],
	showPrice: boolean,
	isCircularImage: boolean,
	size?: TAvatarSizing,
	column: number
	spacing?: number,
	dynamicClass?: boolean
}) => {
	return (
		<MiniPromotionalGrid $columnGap={column} $spacing={spacing} className="grid-parent">
			{
				items.map(item => (
					<PromotionContent
						dynamicClass={dynamicClass}
						key={item.id}
						item={item}
						showPrice={showPrice}
						isCircularImage={isCircularImage}
						size={size}
					/>
				))
			}
		</MiniPromotionalGrid>
	);
};

const PromotionContent = ({
	item,
	showPrice,
	dynamicClass,
	isCircularImage,
	size,
}: {
	item: TItem,
	dynamicClass?: boolean,
	showPrice: boolean,
	isCircularImage: boolean,
	size?: TAvatarSizing,
}) => {
	const code = item.variations[0].price.currency;
	// const symbol = appCurrencySymbol[code];
	const minimumPrice = Math.min(...item.variations.map(variation => variation.price.converted));

	return (
		<Link to={RoutePath.PRODUCT_DISPLAY} params={{ details: '' + item.id }}>
			<Stack gap={1.5}>
				<Stack borderRadius={3} overflow={'hidden'}>
					<MiniPromotionAvatar
						src={item.images[0]?.url || ''}
						alt={item.name}
						variant={isCircularImage ? 'circular' : 'rounded'}
						className={dynamicClass ? 'dynamic-avatar' : ''}
						$size={size}
					/>
				</Stack>
				{
					showPrice &&
					<MiniPromotionPriceTypography $fontSize="18px" $isPromotion $fontWeight="700">{code} {minimumPrice}</MiniPromotionPriceTypography>

					// <MiniPromotionPriceTypography $fontSize="18px" $isPromotion $fontWeight="700">{code} {symbol}{price}</MiniPromotionPriceTypography>
				}
			</Stack>
		</Link>
	);
};

const ScrollablePromotion = ({
	items,
	showPrice,
	isCircularImage,
	size,
	spacing,
	scrollBy,
}: {
	items: TItem[],
	showPrice: boolean,
	isCircularImage: boolean,
	spacing: number
	size?: TAvatarSizing,
	scrollBy?: number,
}) => {
	return (
		<ScrollableContainer orientation="horizontal" float scrollBy={scrollBy}>
			<Stack direction={'row'} gap={spacing} pl={2} pr={2} >
				{items.map(item => (
					<PromotionContent
						key={item.id}
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

const MiniPromotionTypography = styled(Typography)(({ theme }) => ({
	fontFamily: 'Inter',
	fontWeight: '600',
	fontSize: '22px',
	lineHeight: '133.4%',
	color: '#000000',
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)]: {
		fontSize: '20px',
	}
}));

const MiniPromotionalGrid = styled('div', {
	shouldForwardProp: prop => !['$columnGap', '$spacing'].includes(prop as string)
})<{ $columnGap: number, $spacing: number }>(({ theme, $columnGap, $spacing }) => ({
	display: 'grid',
	padding: theme.spacing(2),
	gridTemplateColumns: 'repeat(auto-fit, minmax(100px, auto))',
	columnGap: theme.spacing($columnGap || 2),
	rowGap: theme.spacing($spacing || 2)
}));