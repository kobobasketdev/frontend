import { ContentStack, ShopTypography } from "#component/CommonViews.tsx";
import { items as itemsStub } from "#testData.ts";
import { CUSTOM_893_WIDTH, DESKTOP_SCREEN_MAX_WIDTH, LARGED_DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Stack, styled } from "@mui/material";
import ProductItem from "#component/ProductItem.tsx";
import ProfileWishlist from "#component/ProfileWishlist.tsx";
import ProfileHeading from "#component/ProfileHeading.tsx";


export default function Profile() {
	return (
		<Stack>
			<StyledStackContent>
				<StyledStack>
					<ProfileHeading />
					<ContentStack>
						<ProfileWishlist />
					</ContentStack>
				</StyledStack>
				<ContentStack mt={2}>
					<Stack gap={2} >
						<Stack gap={1}>
							<ShopTypography>
								Awesome Deals for you today
							</ShopTypography>
						</Stack>
						<ProductItemGrid>
							{Array(24).fill('Item').map((arrayItem, index) => (
								<ProductItem
									key={index}
									item={{
										...itemsStub[0], id: index, name: arrayItem + " " + index, promotion: {
											id: 2,
											promotionName: "Valentine's Deals"
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

const StyledStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	gap: theme.spacing(),
	maxWidth: '1200px',
	margin: '0 auto',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		gap: theme.spacing(8),
		flexDirection: 'column'
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(16),
	gap: theme.spacing(8),
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

