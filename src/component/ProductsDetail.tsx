import { ReactNode } from "@tanstack/react-router";
import { RefObject } from "react";
import { TItem } from "./types";
import { TABLET_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { IosShare } from "@mui/icons-material";
import { Stack, styled, Box } from "@mui/material";
import { ProductAvatar, CustomIconButton, CustomSpan } from "./CommonViews";
import ProductDisplayDetail from "./ProductDisplayDetail";
import ScrollableContainer from "./ScrollableContainer";

export default function ProductsDetail({
	item,
	children,
	productDetailRef,
	pictureProductRef,
	handleCopyToClipBoard
}: {
	item: TItem,
	children?: ReactNode,
	handleCopyToClipBoard?: (itemId?: number) => void,
	productDetailRef?: RefObject<HTMLDivElement | null>,
	pictureProductRef?: RefObject<HTMLElement | null>
}) {
	return (
		<StyledProductDetailStack gap={1} >
			<StyledPictureContainer ref={productDetailRef}>
				<CustomProductBox ref={pictureProductRef}>
					<ScrollableContainer orientation="horizontal" float fullContent width="100%" indicator="thumbnail" thumbnails={item.images.map(image => image.url)}>
						{
							item.images.map((image, index) => (
								<Stack key={index} width={1} height={1}>
									<ProductAvatar
										key={index}
										src={image.url || ''}
										alt={item.name}
										variant={'rounded'}
									/>
								</Stack>
							))
						}
					</ScrollableContainer>
					<MobileShareStyledSpan>
						<CustomIconButton onClick={() => handleCopyToClipBoard && handleCopyToClipBoard()}>
							<IosShare fontSize="small" />
							<CustomSpan >
								Share
							</CustomSpan>
						</CustomIconButton>
					</MobileShareStyledSpan>
				</CustomProductBox>
			</StyledPictureContainer>
			<DetailsStack gap={1} >
				<ProductDisplayDetail item={item} fontSize="24px" fontWeight="600" />
				{children}
			</DetailsStack>
		</StyledProductDetailStack>
	);
}

const StyledProductDetailStack = styled(Stack)(({ theme }) => ({
	width: '100%',
	flexDirection: 'row',
	padding: theme.spacing(),
	alignSelf: 'center',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: theme.spacing(0),
		maxWidth: '450px',
		flexDirection: 'column',
	},
	[theme.breakpoints.down(320)]: {
		width: '100%'
	}
}));

const StyledPictureContainer = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		position: "relative",
		width: '50%',
	}
}));

const CustomProductBox = styled(Box)(({ theme }) => ({
	position: 'relative',
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		'&.sticky': {
			position: 'fixed',
			top: '70px',
			width: '485px',
		},
		'&.absolute': {
			position: 'absolute',
			top: 'unset',
			width: '485px',
			bottom: '45px',
		},

		height: '400px'
	}
}));

const DetailsStack = styled(Stack)(({ theme }) => ({
	width: '50%',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '100%'
	}
}));

const MobileShareStyledSpan = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	top: '10px',
	right: '10px',
	zIndex: theme.zIndex.fab,
	padding: theme.spacing(1),
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'right',
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		padding: theme.spacing(0.3)
	}
}));