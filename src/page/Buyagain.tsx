import { ContentStack, ShopTypography } from "#component/CommonViews.tsx";
import HeaderSearch from "#component/HeaderSearch.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { RoutePath } from "#utils/route.ts";
import { ArrowBackIos } from "@mui/icons-material";
import { Box, Stack, styled, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { items as itemsStub } from "#testData.ts";
import ProductItem from "#component/ProductItem.tsx";
import ProfileHeading from "#component/ProfileHeading.tsx";


export default function Buyagain() {
	return (
		<Stack>
			<StyledStackContent>
				<StyledStack>
					<ProfileHeading activeMenu={1} />
					<PageContainerStack>
						<NavStack gap={2.5} bgcolor={'white'}>
							<Box pl={.5}>
								<Link to={RoutePath.PROFILE} style={{ color: 'black', display: "inline-flex", }}>
									<ArrowBackIos /> <Typography >My Profile</Typography>
								</Link>
							</Box>
							<TopStack>
								<Typography fontFamily={'Alata'} pl={.5}>
									BUY AGAIN
								</Typography>
								<HeaderSearch placeholder="Search recently purchased item" showAdornment onSearch={() => {
									console.log('holla here');
								}} />
							</TopStack>
						</NavStack>
						<Stack bgcolor={'white'}>
							<ContentStack mt={2} >
								<Stack gap={2} >
									<Stack gap={1}>
										<ShopTypography>
											Products You recently purchased
										</ShopTypography>
									</Stack>
									<ProductItemGrid>
										{
											Array(10).fill('Item').map((item, index) => (
												<ProductItem
													key={index}
													item={{ ...itemsStub[0], name: item + " " + index, images: [''] }}
													showPrice={true}
													isCircularImage={false}
													fullDetails
													fontSize="24px"
													fontWeight="600"
												/>
											))
										}
									</ProductItemGrid>
								</Stack>
							</ContentStack>
						</Stack>
					</PageContainerStack>
				</StyledStack>
			</StyledStackContent>
		</Stack>
	);
}

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

const PageContainerStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingTop: theme.spacing(9),
		'& > div:last-of-type': {
			// border: '1px solid #F2F2F7',
			paddingTop: theme.spacing(),
			paddingBottom: theme.spacing()
		}
	}
}));

const NavStack = styled(Stack)(({ theme }) => ({
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(2.5),
	paddingBottom: theme.spacing(2.5),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		'& > div:first-of-type': {
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

const TopStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	alignItems: 'center',
	gap: theme.spacing(2),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		alignItems: 'inherit',
		flexDirection: 'column'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		flexDirection: 'column'
	}
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

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: '100%',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(3),
	padding: `0px ${theme.spacing(.3)}`,
	gridAutoFlow: 'row dense',
	gridTemplateColumns: "repeat(4,minmax(140px, 220px))",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		columnGap: theme.spacing(1.5),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: `0px ${theme.spacing()}`,
		gridTemplateColumns: "repeat(3,minmax(160px, 200px))",
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