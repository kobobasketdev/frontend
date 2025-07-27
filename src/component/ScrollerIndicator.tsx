import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Avatar, styled } from "@mui/material";
import { SyntheticEvent } from "react";

type TIndicatorVariant = 'thumbnail' | 'dot' | 'numbered';
type TScrollIndicator = {
	variant?: TIndicatorVariant
	indicatorCount: number,
	thumbnails?: string[],
	handleIndicatorClick: (args: number) => void
};

export default function ScrollerIndicator({
	variant = 'dot',
	indicatorCount,
	thumbnails,
	handleIndicatorClick
}: TScrollIndicator) {
	let indicator;

	const handleClick = (index: number) => (e: SyntheticEvent) => {
		e.preventDefault();
		// e.stopPropagation();
		handleIndicatorClick(index);
	};
	if (variant === 'dot') {
		indicator = Array(indicatorCount).fill('').map((_indicator, index) => (
			<DotIndicator onClick={handleClick(index)} id={'indicator-' + index} key={index} />
		));
	}

	if (variant === 'thumbnail' && thumbnails) {
		indicator = Array(indicatorCount).fill('').map((_indicator, index) => (
			<ThumbnailIndicator id={'indicator-' + index} key={index} onClick={() => handleIndicatorClick(index)}>
				<Avatar src={thumbnails[index]} variant="square" sx={{ height: 1, width: 1 }} />
			</ThumbnailIndicator>
		));
	}
	return (
		<ScrollerIndicatorContainer $variant={variant}>
			{
				indicator
			}
		</ScrollerIndicatorContainer>
	);
}

const ScrollerIndicatorContainer = styled('div', {
	shouldForwardProp: prop => prop !== '$variant'
})<{ $variant: TIndicatorVariant }>(({ $variant, theme }) => ({
	display: 'flex',
	gap: theme.spacing(1),
	...($variant === 'thumbnail' ? {
		position: 'relative',
		flexDirection: 'column',
		bottom: 'unset',
		width: 'fit-content',
		justifyContent: 'unset',
		marginTop: theme.spacing(.2)
	} : {
		position: 'absolute',
		bottom: '12px',
		left: 0,
		right: 0,
		justifyContent: 'center',
		zIndex: 1,
	}),
	// [theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
	// 	...($variant == 'thumbnail' && {
	// 		justifyContent: 'left',
	// 		position: 'relative',
	// 		width: 'unset',
	// 		// left: 0,
	// 		flexDirection: 'row',
	// 		flexWrap: 'wrap',
	// 		zIndex: 'unset',
	// 		bottom: 'unset',
	// 		margin: theme.spacing(.3),
	// 		marginTop: theme.spacing(1)
	// 	})
	// }
}));

const DotIndicator = styled('span')(({ theme }) => ({
	width: '.6rem',
	height: '.6rem',
	borderRadius: '50%',
	backgroundColor: theme.palette.grey[100],
}));

const ThumbnailIndicator = styled('span')(({ theme }) => ({
	width: '70px',
	height: '70px',
	borderRadius: theme.shape.borderRadius,
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));