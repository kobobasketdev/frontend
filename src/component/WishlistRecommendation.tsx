import { Stack, styled } from "@mui/material";
import ScrollableContainer from "./ScrollableContainer";
import { items as itemsStub } from "#testData.ts";
import ProductItem from "./ProductItem";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";

export default function WishlistRecommendation(){
	return (
		<Stack p={.5}>
			<ScrollableContainer orientation="horizontal" float>
				<Stack direction={'row'} gap={2}>
					{
						itemsStub.map((item, index) => (
							<CustomProductContainer  key={index}>
								<ProductItem 
									item={item} 
									showPrice={true} 
									isCircularImage={false}
									fullDetails
									fontSize="24px"
									fontWeight="600"
									disableProductSlider
								/>

							</CustomProductContainer>
						))
					}
				</Stack>
			</ScrollableContainer>
		</Stack>
	);
}

const CustomProductContainer = styled('div')(({ theme }) => ({
	width: '210px',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '200px'
	}
}));