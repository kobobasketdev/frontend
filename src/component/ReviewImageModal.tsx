import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectReviewToView, setReviewImageToView } from "#state-management/slices/review.slice.ts";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import ScrollableContainer from "./ScrollableContainer";
import { ProductAvatar } from "./CommonViews";
import { Close } from "@mui/icons-material";

export default function ReviewImageModal({ width = '100%' }: { width?: string, }) {
	const dispatch = useAppDispatch();
	const reviewImage = useAppSelector(selectReviewToView);
	const handleClose = () => {
		dispatch(setReviewImageToView(null));
	};

	return (
		<Modal open={Boolean(reviewImage)} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Stack justifyContent={'center'} width={width}>
				<Box textAlign={'right'}>
					<IconButton onClick={handleClose}>
						<Close htmlColor="white" fontSize="large" />
					</IconButton>
				</Box>
				{
					reviewImage &&

					<Stack width={1}>
						<ScrollableContainer orientation="horizontal" float fullContent>
							{
								reviewImage.images!.map((image, index) => (
									<Stack key={index}>
										<ProductAvatar
											key={index}
											src={image || ''}
											alt={image}
											variant={'rounded'}
										/>
									</Stack>
								))
							}
						</ScrollableContainer>
					</Stack>
				}
			</Stack>
		</Modal>
	);
}