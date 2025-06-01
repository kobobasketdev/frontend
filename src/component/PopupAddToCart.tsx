import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectPopupAddToCartItem, setAddToCartPopup } from "#state-management/slices/cart.slice.ts";
import { Modal, Stack, styled } from "@mui/material";
import ProductsDetail from "./ProductsDetail";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";

export default function PopupAddToCart() {
	const popupItem = useAppSelector(selectPopupAddToCartItem);
	const dispatch = useAppDispatch();
	return (
		<>
			{
				popupItem &&
				<Modal sx={{ display: 'flex' }} open={!!popupItem.id} onClose={() => {
					dispatch(setAddToCartPopup(null));
				}}>
					<CustomStack margin={'auto'} alignSelf={'center'} maxWidth={'900px'} minWidth={'320px'} position={'relative'}>
						<ProductsDetail item={popupItem} />
					</CustomStack>
				</Modal>
			}
		</>
	);
}

const CustomStack = styled(Stack)(({ theme }) => ({
	width: '100%',
	height: 'auto',
	backgroundColor: 'white',
	padding: theme.spacing(1),
	borderRadius: theme.shape.borderRadius,
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '90%',
		maxWidth: '400px',
	}
}));