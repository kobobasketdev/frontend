import { Box, IconButton, Rating, Stack, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { TItem } from "./types";
import { CustomLongWishlistButton, ProductPriceTypography, ProductSavingTypography, ViewMore } from "./CommonViews";
import { useAppDispatch } from "#state-management/hooks.ts";
import { CheckCircle, ExpandLess, ExpandMore } from "@mui/icons-material";
import { MouseEvent, useEffect, useState } from "react";
import { theme } from "#customtheme.ts";
import htmlReactParse from 'html-react-parser';
import GrommetWishListSvg from "./svg/GrommetWishlistSvg";
import pluralize from "pluralize";
import millify from "millify";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import ProductAddToCartControl from "./ProductAddToCartControl";
import { removeFromWishlist, addToWishlist } from "#state-management/slices/wishlist.slice.ts";
import { appCurrencySymbol } from "#utils/index.ts";

const getSavedPercent = (price: number, locationPrice: number) => {
	return Math.abs(price - locationPrice);
};

export default function ProductDisplayDetail({
	item,
	fontSize,
	fontWeight,
}: {
	item: TItem,
	fontWeight?: string,
	fontSize?: string,
}) {
	const dispatch = useAppDispatch();
	const [isWishListItem, setIsWishListItem] = useState<boolean>(false);
	const handleAddToWishlist = (item: TItem) => () => {
		if (isWishListItem) {
			dispatch(removeFromWishlist("" + item.id));
		}
		else {
			dispatch(addToWishlist(item));
		}
		const newWishListStatus = !isWishListItem;
		setIsWishListItem(newWishListStatus);
	};

	useEffect(() => {
		setIsWishListItem(item.isWishListItem);
	}, []);

	const [selectedVariant, setSelectedVariant] = useState<number>(0);
	const productVariant = item.variations[selectedVariant];
	const code = productVariant.price.currency;
	const symbol = appCurrencySymbol[code];
	const price = productVariant.price.converted;
	const itemPromotion = item.promotion;
	const marketPrice = productVariant.marketPrice?.converted;

	const handleVariantSelection = (_e: MouseEvent<HTMLElement>, value: number) => {
		setSelectedVariant(value);
	};
	return (
		<>
			<StyledStack gap={2} p={1}>
				<ProductDetails details={item.productDetails || "10-Pack Men'S Boxer Briefs, 96% Polyester 4% Elastane, Solid Color, Breathable Comfort Fit, Knit Fabric, Slight Stretch, Casual Athletic Shorts"} />
				<Stack direction={'row'} gap={1} alignItems={'baseline'} flexWrap={'wrap'}>
					<Typography fontSize={'14px'} fontWeight={'500'} color={theme.palette.primaryOrange.main}>
						LOCAL MARKET PRICE <span style={{ textDecoration: 'line-through' }}>{code} {symbol}{marketPrice}</span>
					</Typography>
					<ProductSavingTypography $fontWeight="500">
						save {code} {symbol}{getSavedPercent(price, marketPrice)}
					</ProductSavingTypography>
				</Stack>
				<Stack direction={'row'} alignItems={'center'} gap={.2}>
					<span style={{ color: 'rgba(27, 31, 38, 0.72)' }}>{item.rating}</span>
					<Rating size="small" readOnly value={Math.floor(item.rating!) + .5} precision={0.5} />
					<ReviewSpan $lineThrough>
						<a href="#reviews">
							{item.reviewCount} Reviews
						</a>
					</ReviewSpan>
					<VeritcalBar />
					<ReviewSpan >
						{item.soldCount} sold
					</ReviewSpan>
					<VeritcalBar />
					<ReviewSpan $disableColor>
						<GrommetWishListSvg $isFilled />
						{millify(item.likeCount!, {
							units: ['', 'k', 'm', 'b'],
							precision: 3,
						})}
						{' '}
						{pluralize('likes', item.likeCount)}
					</ReviewSpan>
				</Stack>
				{
					item.isBestSeller &&
					<Stack direction={'row'}>
						<BestSellerSpan>
							Best Sellers in {item.productCategoryId}
						</BestSellerSpan>
					</Stack>
				}
				<ProductPriceTypography $isPromotion={Boolean(itemPromotion)} $fontSize={fontSize} $fontWeight={fontWeight}>
					{code} {symbol}{price}
				</ProductPriceTypography>
				<StyledToggleButtonGroup
					size="small"
					value={selectedVariant}
					exclusive
					onChange={handleVariantSelection}
					aria-label="text alignment"
				>
					{
						item.variations.map((variant, index) => (
							<ToggleButton value={index} aria-label="left aligned" key={index}>
								{
									selectedVariant === index && <CheckCircle fontSize="small" color="success" />
								}
								{variant.weight}kg
							</ToggleButton>
						))
					}
				</StyledToggleButtonGroup>
			</StyledStack>
			<StyledReversableStack gap={1}>
				<Box p={1} flexGrow={1}>
					<ProductAddToCartControl item={item} fullWidth choosenVariant={selectedVariant} showControl />
				</Box>
				<Box p={1} flexGrow={1}>
					<CustomLongWishlistButton onClick={() => handleAddToWishlist(item)()} fullWidth sx={{ pl: 2.5, pr: 2.5 }}>
						<GrommetWishListSvg $isFilled={isWishListItem} />
						<WishlistCustomSpan>
							ADD TO WISHLIST
						</WishlistCustomSpan>
					</CustomLongWishlistButton>
				</Box>
			</StyledReversableStack>
		</>
	);
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	gap: theme.spacing(1.5),

	'.MuiToggleButtonGroup-firstButton, .MuiToggleButtonGroup-lastButton': {
		width: '70px',
		color: 'black',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.spacing(.5),
		borderTopRightRadius: theme.spacing(.5)
	}
}));

export const WishlistCustomSpan = styled('span')(({ theme }) => ({
	display: 'inline-flex',
	marginLeft: theme.spacing(.5),
	fontSize: '.8rem',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		fontSize: '.7rem'
	}
}));

const BestSellerSpan = styled('span')({
	background: 'linear-gradient(175.69deg, #F74C25 35.39%, #FFF700 158.3%)',
	borderRadius: '14px 0px',
	color: "white",
	fontWeight: '700',
	fontSize: '12px',
	padding: '6px 12px'
});
const ReviewSpan = styled('span', {
	shouldForwardProp: prop => !['$lineThrough', '$disableColor'].includes(prop as string)
})<{ $lineThrough?: boolean, $disableColor?: boolean }>(({ theme, $lineThrough, $disableColor }) => ({
	color: !$disableColor ? theme.palette.primaryGreen.moreDeeper : 'rgba(27, 31, 38, 0.72)',
	fontSize: '12px',
	margin: '0px 4px',
	display: 'inline-flex',
	alignItems: 'center',
	textDecoration: $lineThrough ? 'underline' : 'none',
	'> a': {
		color: 'inherit'
	}
}));

const VeritcalBar = styled('span')({
	display: 'inline-block',
	width: '2px',
	height: '15px',
	marginLeft: '2px',
	marginRight: '2px',
	backgroundColor: '#C7C7CC'
});

const ProductDetails = ({ details }: { details: string }) => {
	const [showMore, setShowMore] = useState<boolean>(false);

	const handleShowMore = (flag: boolean) => () => {
		setShowMore(flag);
	};

	return (
		<StyledDiv $showMore={showMore} >
			{htmlReactParse(details)}
			<ViewMore>
				<IconButton onClick={handleShowMore(!showMore)} size="small">
					{showMore ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
				</IconButton>
			</ViewMore>
		</StyledDiv>
	);
};


const StyledDiv = styled('span', {
	shouldForwardProp: prop => prop !== '$showMore'
})<{ $showMore: boolean }>(({ $showMore }) => ({
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	position: 'relative',
	paddingRight: $showMore ? 'unset' : '10px',
	overflow: $showMore ? 'unset' : 'hidden',
	WebkitLineClamp: $showMore ? 'unset' : 2
}));

const StyledStack = styled(Stack)(() => ({

}));

const StyledReversableStack = styled(Stack)(({ theme }) => ({
	flexWrap: 'wrap',
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'row',
		alignItems: 'center'
	},
}));