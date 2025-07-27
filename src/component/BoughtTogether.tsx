import { SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Button, Stack, styled, Typography } from "@mui/material";
import { TItem } from "./types";
import { ProductAvatar } from "./CommonViews";
import ProductInfo from "./ProductInfo";
import { useAppDispatch } from "#state-management/hooks.ts";
import { setShowMenu } from "#state-management/slices/active-menu.slice.ts";
import { RoutePath } from "#utils/route.ts";
import { useNavigate } from "@tanstack/react-router";
import ScrollableContainer from "./ScrollableContainer";

export default function BoughtTogether({ boughtTogether }: { boughtTogether: TItem[] }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleGotoProductDetails = (itemId: string) => () => {
		dispatch(setShowMenu(false));
		navigate({
			to: RoutePath.PRODUCT_DISPLAY,
			params: { details: itemId + "" }
		});
	};

	return (
		<Stack pt={4}>
			<Typography fontFamily={'Alata'} fontSize={'15px'} pl={.5}>
				FREQUENTLY BOUGHT TOGETHER
			</Typography>
			<MobileContainer>
				{boughtTogether.map((boughtItem, index) => (
					<BoughtMoreProduct key={index} item={boughtItem} handleGotoProductDetails={handleGotoProductDetails(boughtItem.id)} />
				))}
			</MobileContainer>
			<WebContainer>
				<Stack p={1}>
					<ScrollableContainer orientation="horizontal" float>
						<Stack direction={'row'} gap={1}>
							{
								boughtTogether.map((boughtItem, index) => (
									<BoughtMoreProduct key={index} item={boughtItem} handleGotoProductDetails={handleGotoProductDetails(boughtItem.id)} />
								))
							}
						</Stack>
					</ScrollableContainer>
				</Stack>
			</WebContainer>
		</Stack>
	);
}

const BoughtMoreProduct = ({ item, handleGotoProductDetails }: { item: TItem, handleGotoProductDetails: () => void }) => {
	return (
		<StyledBoughtMoreStack>
			<Stack borderRadius={3} overflow={'hidden'}>
				<ProductAvatar
					src={item.images[0]?.url || ''}
					alt={item.name}
					variant={'rounded'}
				/>
			</Stack>
			<StyledProductButton disableRipple onClick={handleGotoProductDetails}>
				<ProductInfo
					item={item}
					showPrice
					fullDetails
					fontSize="24px"
					fontWeight="600"
				/>
			</StyledProductButton>
		</StyledBoughtMoreStack>
	);
};

const StyledBoughtMoreStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '180px'
	}
}));

const WebContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const MobileContainer = styled('div')(({ theme }) => ({
	display: 'none',
	gridAutoFlow: 'dense',
	padding: theme.spacing(.2),
	marginTop: theme.spacing(2),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, minmax(100px, auto))',
		columnGap: theme.spacing(1.5),
		rowGap: theme.spacing(1.5)
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		columnGap: theme.spacing(),
	}
}));

const StyledProductButton = styled(Button)({
	textAlign: 'left',
	textTransform: 'unset',
	':hover': {
		backgroundColor: 'transparent'
	}
});

