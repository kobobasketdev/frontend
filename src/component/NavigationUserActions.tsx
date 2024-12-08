import { Box, IconButton, styled } from "@mui/material";
import CartSvg from "./svg/CartSvg";
import ProfileSvg from "./svg/ProfileSvg";
import WishlistIcon from "./svg/WishlistSvg";

export default function NavigationUserActions() {
	return(
		<NavigationActionBox>
			<span>
				<IconButton>
					<WishlistIcon />
				</IconButton>
			</span>
			<span>
				<IconButton>
					<CartSvg />
				</IconButton>
			</span>
			<span>
				<IconButton>
					<ProfileSvg />
				</IconButton>
			</span>
		</NavigationActionBox>
	);
}

const NavigationActionBox = styled(Box)(({ theme }) => ({
	display: 'inline-flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: theme.spacing(.2)
}));