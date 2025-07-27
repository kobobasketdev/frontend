import CheckoutCartItem from "#component/CheckoutCartItem.tsx";
import { ShopTypography, StyledHeaderLink } from "#component/CommonViews.tsx";
import MiniNavigation from "#component/MiniNavigation.tsx";
import MobileCartContainer from "#component/MobileCartCheckout.tsx";
import ProductItem from "#component/ProductItem.tsx";
import { TItem } from "#component/types/index.js";
import WebCartContainer from "#component/WebCartContainer.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, minimumWeight, SMALL_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH } from "#constants.tsx";
import fetcher from "#hooks/fetcher.ts";
import { getWishlistItem } from "#hooks/query/wishlist";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { addBulkItemToCart, selectCartItems, TCartItems } from "#state-management/slices/cart.slice.ts";
import { getCartItems, getCartWeight, getTotalSavings } from "#utils/index.ts";
import { RoutePath } from "#utils/route.ts";
import { ChevronRight, IosShare } from "@mui/icons-material";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import pluralize from "pluralize";
import { useEffect, useState } from "react";

const env = import.meta.env;
export default function Cart() {
	const navigate = useNavigate();
	const cartItemsMap = useAppSelector(selectCartItems);
	const dispatch = useAppDispatch();
	const cartItems = getCartItems(cartItemsMap);
	const cartInfo = getCartWeight(cartItems);
	const { data } = useQuery(getWishlistItem(1));
	const wishlistItems: TItem[] = data?.data || [];
	const isDisabled = cartInfo.weight < minimumWeight;
	const totalSavings = getTotalSavings(cartItems);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('access_token')) {
			setIsLoading(true);
			fetcher.get(env.VITE_URL_ENDPOINT + 'v1/cart')
				.then(response => {
					const { data: savedCarts }: { data: TCartItems[] } = response;
					const mappedCart = savedCarts.reduce((acc, savedCart) => {
						const { item, variant } = savedCart;
						acc[item.id + '_' + variant] = savedCart;
						return acc;
					}, {} as Record<string, TCartItems>);
					dispatch(addBulkItemToCart(mappedCart));
					setIsLoading(false);
				})
				.catch(response => {
					console.log(response, 'error');
					setIsLoading(false);
				});
		}
	}, [dispatch]);

	const handleCartButton = () => {
		navigate({
			to: isDisabled ? RoutePath.HOME : RoutePath.CHECKOUT
		});
	};

	return (
		<StyledStackContent gap={2}>
			<MiniNavigation>
				<ProductDisplayNavHeader>
					<Stack direction={'row'} alignItems={'center'} width={1 / 2}>
						<StyledHeaderLink to={RoutePath.HOME}>
							<Stack direction={'row'} alignItems={'center'}>
								HOME
							</Stack>
						</StyledHeaderLink>
						<ChevronRight color="action" />
						<Typography textTransform={'uppercase'} fontWeight={'500'} noWrap>
							CART
						</Typography>
					</Stack>
				</ProductDisplayNavHeader>
			</MiniNavigation>
			<StyledCartContainerStack gap={2}>
				<Stack gap={2.5} width={1}>
					<Stack direction={'row'} justifyContent={'space-between'} pl={1.2} pr={1.2}>
						<Typography fontFamily={'Alata'} fontSize={'1.4rem'}>
							MY CART <CartSmallSpan>({cartItems.length} {pluralize('item', cartItems.length)})</CartSmallSpan>
						</Typography>
						<StyledShareCartButton variant="outlined" color="inherit">
							<Stack direction={'row'} gap={.5} alignItems={'center'}>
								<IosShare fontSize="small" />
								Share cart
							</Stack>
						</StyledShareCartButton>
					</Stack>
					{
						!isLoading &&
						<CheckoutCartItem cartItems={cartItems} />
					}
				</Stack>
				<WebCartContainer
					weight={cartInfo.weight}
					userCurrency={{ code: cartInfo.code, symbol: cartInfo.symbol }}
					totalPrice={cartInfo.total} totalSavings={totalSavings}
					handleCartButton={handleCartButton} />

				<MobileCartContainer
					userCurrency={{ code: cartInfo.code, symbol: cartInfo.symbol }}
					weight={cartInfo.weight}
					handleCartButton={handleCartButton}
					isDisabled={isDisabled}
					itemCount={cartItems.length}
					totalSavings={totalSavings} totalPrice={cartInfo.total} />
			</StyledCartContainerStack>
			{
				localStorage.getItem('access_token') &&
				<ContentStack mt={3}>
					<Stack gap={2} >
						<Stack gap={1}>
							<ShopTypography>
								ITEMS IN YOUR WISH LIST
							</ShopTypography>
						</Stack>
						<ProductItemGrid>
							{wishlistItems.map((item, index) => (
								<ProductItem
									key={index}
									item={item}
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
			}

			{/* <ContentStack mt={3}>
				<Stack gap={2} >
					<Stack gap={1}>
						<ShopTypography>
							BEST SELLERS THIS MONTH
						</ShopTypography>
					</Stack>
					<ProductItemGrid>
						{Array(24).fill('Item').map((arrayItem, index) => (
							<ProductItem
								key={index}
								item={{
									...itemsStub[0], id: index, name: arrayItem + " " + index, promotion: {
										promotionName: "Valentine's Deals",
										id: Math.floor(Math.random() * 100)
									}
								}}
								showPrice={true}
								isCircularImage={false}
								fullDetails
								fontSize="24px"
								fontWeight="600"
							/>
						))}
					</ProductItemGrid>
				</Stack>
			</ContentStack> */}
		</StyledStackContent >
	);
}

const ContentStack = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	width: '100%',
	marginLeft: 'auto',
	marginRight: 'auto',
	[theme.breakpoints.down(447)]: {
		alignItems: 'unset'
	}
}));

const StyledCartContainerStack = styled(Stack)(({ theme }) => ({
	width: 'fit-content',
	// maxWidth: '1150px',
	gap: theme.spacing(5),
	margin: '0 auto',
	flexDirection: 'row',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column',
		maxWidth: '600px',
		width: '100%',
		alignSelf: 'center'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		alignSelf: 'unset'
	}
}));

const CartSmallSpan = styled('span')(() => ({
	fontFamily: 'Roboto',
	fontSize: '1rem',
}));

const StyledShareCartButton = styled(Button)(({ theme }) => ({
	borderRadius: theme.shape.borderRadius * 5,
	textTransform: 'inherit',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	color: theme.palette.primaryBlack.main,
	display: 'none',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		fontSize: '.7rem',
		display: 'inline'
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(17),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23.7)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(16.7)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(13)
	},
}));

const ProductDisplayNavHeader = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '1000px',
	margin: '0 auto',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		maxWidth: '1000px',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
}));

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: '100%',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(3),
	padding: `0px ${theme.spacing(.3)}`,
	gridAutoFlow: 'row dense',
	gridTemplateColumns: "repeat(5,220PX)",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(4,220PX)",
		columnGap: theme.spacing(1.5),
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
	[theme.breakpoints.down(447)]: {
		columnGap: theme.spacing(1),
		justifyContent: 'space-around',
		gridTemplateColumns: "repeat(2, minmax(150px, auto))",
	}
}));