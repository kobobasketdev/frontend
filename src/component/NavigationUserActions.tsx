import { Badge, Box, IconButton, styled } from "@mui/material";
import CartSvg from "./svg/CartSvg";
import ProfileSvg from "./svg/ProfileSvg";
import WishlistIcon from "./svg/WishlistSvg";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectCartItemsCount } from "#state-management/slices/cart.slice.ts";
import { selectWishlistCount } from "#state-management/slices/wishlist.slice.ts";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import { setRouteRedirect } from "#state-management/slices/active-menu.slice.ts";
import MobileHeaderSearch from "./MobileHeaderSearch";
import { selectLoginUserFirstname } from "#state-management/slices/user.slice.ts";

export default function NavigationUserActions() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const cartItemsCount = useAppSelector(selectCartItemsCount);
	const wishlistItemsCount = useAppSelector(selectWishlistCount);
	const currentUserFullname = useAppSelector(selectLoginUserFirstname);

	const handleNavigation = (action: string) => () => {
		let route;
		switch (action) {
			case 'login':
				dispatch(setRouteRedirect(['/signup', '/login'].includes(location.pathname) ? RoutePath.PROFILE : location.pathname));
				route = RoutePath.SIGNUP;
				break;
			case 'wishlist':
				route = RoutePath.WISHLIST;
				break;
			default:
				route = RoutePath.CART;
		}
		navigate({
			to: route
		});
	};

	return (
		<NavigationActionBox>
			<MobileHeaderSearch />
			<span>
				<CustomIconButton onClick={handleNavigation('login')} disableRipple>
					<ProfileSvg />
					{
						!currentUserFullname &&
						<CustomSpan>
							<span>
								Welcome
							</span>
							<span>
								Sign in/Register
							</span>
						</CustomSpan>
					}
				</CustomIconButton>
			</span>
			{
				localStorage.getItem('access_token') && <span>
					<IconButton onClick={handleNavigation('wishlist')} >
						<Badge color="warning" badgeContent={wishlistItemsCount} variant="dot">
							<WishlistIcon />
						</Badge>
					</IconButton>
				</span>
			}
			<span>
				<IconButton onClick={handleNavigation('cart')} >
					<Badge badgeContent={cartItemsCount} color="warning">
						<CartSvg />
					</Badge>
				</IconButton>
			</span>
		</NavigationActionBox>
	);
}

const NavigationActionBox = styled(Box)(({ theme }) => ({
	display: 'inline-flex',
	flexDirection: 'row',
	justifyContent: 'right',
	alignItems: 'center',
	gap: theme.spacing()
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
	':hover': {
		backgroundColor: 'transparent',

		[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
			backgroundColor: 'rgba(0, 0, 0, 0.04)'
		}
	}

}));
const CustomSpan = styled('span')(({ theme }) => ({
	display: 'inline-flex',
	justifyContent: 'left',
	flexDirection: 'column',
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: '12px',
	lineHeight: '100%',
	letterSpacing: '0.17px',
	paddingLeft: theme.spacing(.5),
	color: theme.palette.primaryGreen.main,
	gap: theme.spacing(.5),
	' > *': {
		textAlign: 'left'
	},
	'> span:nth-of-type(2)': {
		fontSize: '14px',
		fontWeight: '500',
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));