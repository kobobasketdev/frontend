import { LARGED_DESKTOP_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Stack, styled, SvgIcon, Typography } from "@mui/material";
import { ShopTypography, ProductAvatar } from "./CommonViews";
import GrommetWishListSvg from "./svg/GrommetWishlistSvg";
import { Link } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import LargeWishlistSvg from "./svg/LargeWishlistSvg";

const wishlistItem = Array(4).fill('');
export default function ProfileWishlist() {
	let content = <EmptyWishlistStack alignItems={'center'}>
		<CustomSvgIcon viewBox="0 0 548 548">
			<LargeWishlistSvg />
		</CustomSvgIcon>
		<Typography fontWeight={'500'} fontFamily={'Alata'} fontSize={'20px'}>No Item in your wishlist</Typography>
	</EmptyWishlistStack>;

	if (wishlistItem.length) {
		content = <WishlistGrid>
			{
				wishlistItem.map((_item, index) => (
					<WishlistItem key={index}>
						<FloatingContainer>
							<GrommetWishListSvg $isFilled />
						</FloatingContainer>
						<ProductAvatar variant="rounded" />
					</WishlistItem>
				))
			}
		</WishlistGrid>;
	}
	return (
		<CustomDiv>
			<Stack width={1}>
				<ShopTypography>
					Wishlist
				</ShopTypography>
			</Stack>
			<Stack gap={2}>

				{content}

				<StyledLink to={RoutePath.WISHLIST} >
					View all wishlist items
				</StyledLink>
			</Stack>
		</CustomDiv>
	);
}

const CustomDiv = styled('div')(({ theme }) => ({
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingTop: theme.spacing(12)
	}
}));

const CustomSvgIcon = styled(SvgIcon)(({ theme }) => ({
	width: '100%',
	height: '200px',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		height: '200px'
	}
}));

const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	border: '1px solid rgba(60, 60, 67, 0.18)',
	borderRadius: '4px',
	padding: '8px 14px',
	fontWeight: '500',
	fontSize: '14px',
	margin: '0 auto'
}));
const FloatingContainer = styled('span')(({ theme }) => ({
	right: '14px',
	top: '14px',
	position: 'absolute',
	zIndex: theme.zIndex.fab
}));
const WishlistItem = styled(Stack)(({ theme }) => ({
	position: 'relative',

	flexDirection: 'row',
	borderRadius: theme.shape.borderRadius * 3,
	overflow: 'hidden',
	'> *': {
		height: '100%'
	}
}));

const EmptyWishlistStack = styled(Stack)(({ theme }) => ({
	width: '100vmax',
	maxWidth: '1380px',
	minWidth: '320px',
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		maxWidth: '920px'
	},
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		maxWidth: '690px'
	},
	[theme.breakpoints.down(690)]: {
		width: '100vmin',
		maxWidth: '480px',
	}
}));
const WishlistGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	overflow: 'hidden',
	gap: theme.spacing(1.5),
	justifyContent: 'space-between',
	padding: theme.spacing(),
	height: '170px',
	gridTemplate: " 155px / repeat(5,minmax(185px, 230px))",

	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gap: theme.spacing(),
		height: '155px',
		gridTemplate: "140px / repeat(5,minmax(auto, 178px))",
	},
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		gridTemplate: '140px / repeat(4, minmax(auto, 150px))',
		minWidth: '690px'
	},
	[theme.breakpoints.down(690)]: {
		gridTemplate: '140px / repeat(3, minmax(auto, 150px))',
		minWidth: '320px'
	}
}));