import { ContentStack, ShopTypography } from "#component/CommonViews.tsx";
import { items as itemsStub } from "#testData.ts";
import ProductItem from "#component/ProductItem.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { RoutePath } from "#utils/route.ts";
import { ArrowBackIos } from "@mui/icons-material";
import { Stack, Box, Typography, styled, Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ProfileHeading from "#component/ProfileHeading.tsx";


const orderTabs = ['Delivered', 'New order/In Transit'];

export default function Order() {
	const [selectedTab, setSelectedTab] = useState<string>('Delivered');
	const tabContainerRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleDomScroll = () => {
			if (scrollY < 300) {
				tabContainerRef.current?.classList.remove('sticky');
			}
			else {
				tabContainerRef.current?.classList.add('sticky');
			}
		};
		addEventListener('scroll', handleDomScroll);
		if (location.pathname.includes(RoutePath.NEW_ORDER)) {
			setSelectedTab(orderTabs[1]);
		}
		return () => {
			removeEventListener('scroll', handleDomScroll);
		};
	}, []);

	const handleSelectTab = (key: string) => () => {
		setSelectedTab(key);
		let route: string = RoutePath.NEW_ORDER;
		if (key === orderTabs[0]) {
			route = RoutePath.DELIVERED_ORDER;
		}

		navigate({
			to: route
		});
	};
	return (
		<Stack>
			<StyledStackContent>
				<StyledStack>
					<ProfileHeading activeMenu={0} />
					<PageContainerStack>
						<Stack>
							<NavStack gap={2.5} >
								<Box pl={.5}>
									<Link to={RoutePath.PROFILE} style={{ color: 'black', display: "inline-flex", }}>
										<ArrowBackIos /> <Typography >My Profile</Typography>
									</Link>
								</Box>
								<Typography fontFamily={'Alata'} pl={.5}>
									MY ORDERS
								</Typography>
							</NavStack>
						</Stack>
						<Stack bgcolor={'white'}>
							<OrderTabContainer direction={'row'} gap={2} ref={tabContainerRef}>
								{
									orderTabs.map((orderTab, index) => <OrderTabButton onClick={handleSelectTab(orderTab)} $isActive={orderTab == selectedTab} key={index}>{orderTab}</OrderTabButton>)
								}
							</OrderTabContainer>
							<Outlet />
						</Stack>
					</PageContainerStack>
				</StyledStack>
				<ContentStack mt={8}>
					<Stack gap={2} >
						<Stack gap={1}>
							<ShopTypography>
								Recommended
							</ShopTypography>
						</Stack>
						<ProductItemGrid>
							{Array(24).fill('Item').map((arrayItem, index) => (
								<ProductItem
									key={index}
									item={{
										...itemsStub[0], id: index, name: arrayItem + " " + index, promotion: {
											promoName: "Valentine's Deals",
											promoPrice: 10
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
				</ContentStack>
			</StyledStackContent>
		</Stack>
	);
}

const PageContainerStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingTop: theme.spacing(9),
		'& > div:last-of-type': {
			border: '1px solid #F2F2F7',
			paddingTop: theme.spacing(),
			paddingBottom: theme.spacing()
		}
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
		columnGap: theme.spacing(1),
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

const StyledStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	gap: theme.spacing(),
	maxWidth: '1200px',
	margin: '0 auto',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		'& .profile-nav': {
			display: 'none',
		},
		flexDirection: 'column',
		backgroundColor: '#EDEDED',
		gap: theme.spacing(2),
		margin: '0 0',
	}
}));

const OrderTabButton = styled(Button, {
	shouldForwardProp: prop => prop !== '$isActive'
})<{ $isActive: boolean }>(({ theme, $isActive }) => ({
	textTransform: 'inherit',
	fontWeight: '500',
	fontSize: '16px',
	color: theme.palette.primaryBlack.lightshade,
	...($isActive && {
		color: theme.palette.primaryBlack.main,
		'&::before': {
			position: 'absolute',
			bottom: 0,
			border: '1px solid black',
			width: '100%',
			content: '""',
		}
	})
}));

const OrderTabContainer = styled(Stack)(({ theme }) => ({


	paddingLeft: theme.spacing(2.5),
	paddingRight: theme.spacing(2.5),
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		'&.sticky': {
			position: 'fixed',
			width: '100%',
			backgroundColor: 'white',
			top: 0,
			paddingBottom: theme.spacing(),
			zIndex: theme.zIndex.fab,
			boxShadow: theme.shadows[10],
		},
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		justifyContent: 'unset',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	},
}));



const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(15),
	gap: theme.spacing(4),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(24)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(20)
	},
}));

const NavStack = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(2.5),
	paddingBottom: theme.spacing(1),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		'& div:first-of-type': {
			display: 'none'
		},
		'& p': {
			fontSize: '20px'
		},
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	}
}));

