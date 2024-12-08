import { Box, IconButton, Stack, styled } from "@mui/material";
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Dispatch, useEffect, useRef, useState, SetStateAction } from "react";
import { TScrollNavigationMode, TScrollOrientation } from ".";

const processNavigationDisabled = ({
	setShouldDisableTopNavigation,
	setShouldDisableBottomNavigation,
	containerData, 
}: {
	setShouldDisableTopNavigation:  Dispatch<SetStateAction<boolean>>,
	setShouldDisableBottomNavigation: Dispatch<SetStateAction<boolean>>,
	containerData: { scrollDistance: number, scrollArea: number, clientArea: number }
}) => {
	setShouldDisableTopNavigation(containerData.scrollDistance === 0);
	const endScroll = containerData.scrollArea - containerData.clientArea;
	setShouldDisableBottomNavigation(containerData.scrollDistance >= endScroll);
	return endScroll;
};

enum SCROLL_NAVIGATION_ID_ENUM {
	PREV,
	NEXT
}
export interface IScrollableContainer {
	orientation?: TScrollOrientation,
	showNavigation?: boolean,
	scrollBy?: number,
	scrollableArea?: string,
	contentViewArea?: string,
	float?: boolean,
	children: React.ReactElement<unknown>
}
export default function ScrollableContainer({ 
	children, 
	orientation = 'vertical', 
	showNavigation = false, 
	scrollBy = 70, 
	float = false,
	scrollableArea = '200px', 
	contentViewArea = '100px'
}: IScrollableContainer) {

	const continousScrollIntervalIdRef = useRef<ReturnType<typeof setInterval>>();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [shouldDisableTopNavigation, setShouldDisableTopNavigation] =  useState(true);
	const [shouldDisableBottomNavigation, setShouldDisableBottomNavigation] =  useState(true);
	const [isFloatHovered, setIsFloatHover] = useState<boolean>(false);
	const scrollerProps = orientation === 'vertical' ? { height: scrollableArea, width: contentViewArea } : { width: scrollableArea, height: contentViewArea, maxWidth: scrollableArea };
	const direction = orientation === 'vertical' ? 'column'  : 'row' ;
	
	useEffect(() => {
		if(scrollContainerRef.current) {
			processNavigationDisabled(
				{ 
					setShouldDisableTopNavigation,
					setShouldDisableBottomNavigation,
					containerData: {
						scrollDistance: scrollContainerRef.current[orientation === 'vertical' ? 'scrollTop' : 'scrollLeft'] ,
						scrollArea: scrollContainerRef.current[orientation === 'vertical' ? 'scrollHeight' : 'scrollWidth'],
						clientArea: scrollContainerRef.current[orientation === 'vertical' ? 'clientHeight' : 'clientWidth']
					}
				}
			);
		}

	}, [orientation]);

	const handleScrollBy = (scrollValue: number) => {
		if(!scrollContainerRef.current) {
			return;
		}
		
		scrollContainerRef.current.scrollBy({
			behavior: 'smooth',
			[orientation === 'horizontal' ? 'left' : 'top']: scrollValue
		});
	};

	const handleContinousScroll = (scrollValue: number) => {
		continousScrollIntervalIdRef.current = setInterval(() => {
			handleScrollBy(scrollValue);
		}, 500);
	};

	const handleStopContinousScroll = () => {
		clearInterval(continousScrollIntervalIdRef.current);
	};

	const handleMouseEnter = () => () => {
		setIsFloatHover(float);
	};

	const handleMouseLeave = () => () => {
		setIsFloatHover(false);
	};

	const handleOnscroll = () => {
		if(!scrollContainerRef.current) {
			return;
		}
		const scrollDistance = scrollContainerRef.current[orientation === 'vertical' ? 'scrollTop' : 'scrollLeft'] ;
		const endScroll = processNavigationDisabled(
			{ 
				setShouldDisableTopNavigation,
				setShouldDisableBottomNavigation,
				containerData: {
					scrollDistance ,
					scrollArea: scrollContainerRef.current[orientation === 'vertical' ? 'scrollHeight' : 'scrollWidth'],
					clientArea: scrollContainerRef.current[orientation === 'vertical' ? 'clientHeight' : 'clientWidth']
				},
			}
		);

		if(scrollDistance === 0 || scrollDistance >= endScroll) {
			handleStopContinousScroll();
		}
	};

	return(
		<div onMouseEnter={handleMouseEnter()} onMouseLeave={handleMouseLeave()}>
			<ScrollableStackContainer 
				direction={orientation === 'horizontal' ? 'row' : 'column'} 
				gap={.5} 
				position={'relative'} 
				$orientation={orientation}
			>
				{
					(showNavigation || (isFloatHovered && float && !shouldDisableTopNavigation)) &&
					<NavigationStack alignItems={'center'} justifyContent={'center'} $mode={{ float, id: SCROLL_NAVIGATION_ID_ENUM.PREV, orientation }}>
						<span>
							<IconButton 
								size="small"
								disabled={shouldDisableTopNavigation}
								aria-controls="scrollable-container" 
								onMouseDown={() =>  handleContinousScroll(-scrollBy)}
								onMouseUp={() => handleStopContinousScroll()}
								onClick={() => handleScrollBy(-scrollBy)}>
								{orientation === 'horizontal' ? <ChevronLeft /> : <ExpandLess />}
							</IconButton>
						</span>
					</NavigationStack>
				}
				<OutterContainer {...scrollerProps} pb={1} >
					<InnerContainer  id='scrollable-container' role="scrollbar" ref={scrollContainerRef} onScroll={handleOnscroll} $direction={direction}>
						{children}
					</InnerContainer>
				</OutterContainer>
				{
					(showNavigation || (isFloatHovered && float && !shouldDisableBottomNavigation)) && 
					<NavigationStack alignItems={'center'} justifyContent={'center'} $mode={{ float, id: SCROLL_NAVIGATION_ID_ENUM.NEXT, orientation, floatPosition: scrollableArea }}>
						<span>
							<IconButton 
								size="small"

								disabled={shouldDisableBottomNavigation}
								aria-controls="scrollable-container"
								onMouseDown={() =>  handleContinousScroll(scrollBy)}
								onMouseUp={() => handleStopContinousScroll()}
								onClick={() => handleScrollBy(scrollBy)}>
								{orientation === 'horizontal' ? <ChevronRight /> : <ExpandMore />}
							</IconButton>
						</span>
					</NavigationStack>
				}
			</ScrollableStackContainer>
		</div>
	);
}

const ScrollableStackContainer = styled(Stack, {
	shouldForwardProp: prop => prop !== '$orientation'
})<{ $orientation: TScrollOrientation }>(({ $orientation }) => ({
	...($orientation === 'vertical' ?
		{
			justifyContent: 'center',
			alignItems: 'center'
		}
		: 
		{
			alignItems: 'center'
		}
	)
}));

const OutterContainer = styled(Box)({
	position: 'relative',
	overflow: 'hidden',
});

const InnerContainer = styled(Stack, {
	shouldForwardProp: prop => prop !== '$direction'
})<{ $direction: 'column' | 'row' }>(({ $direction })=>({
	flexDirection: $direction,
	position: 'absolute',
	top: '0px',
	bottom: $direction === 'row' ?'-17px' : '0px',
	left: '0px',
	right: $direction === 'column' ? '-17px' : '0px',
	...($direction === 'column' ? { overflowY: 'scroll', overflowX: 'auto' } : { overflowY: 'auto', overflowX: 'scroll' }),
}));

const NavigationStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$mode'
})<{ $mode: TScrollNavigationMode }>(({ theme, $mode }) => ({
	transition: '.5s',
	...($mode.float &&  
		{
			zIndex: theme.zIndex.tooltip,
			position: 'absolute', 
			...($mode.id === SCROLL_NAVIGATION_ID_ENUM.PREV ? 
				{
					...($mode.orientation === 'horizontal' ? 
						{
							left: '10px',
						}
						:
						{
							top: '8px'
						}
					)
				}
				:
				{
					...($mode.orientation === 'horizontal' ? 
						{
							left: `calc(${$mode.floatPosition} - 50px)` ,
						}
						:
						{
							bottom: '8px'
						}
					)
				}
			),
			borderRadius: theme.shape.borderRadius * 20,
			backgroundColor: theme.palette.scrollNavColor.lightshade,
			'& button': {
				transition: '.3s'
			},
			':hover': {
				backgroundColor: theme.palette.scrollNavColor.main,
				'& button': {
					border: '1px solid white',
					backgroundColor: 'white'
				}
			}
		} 
	)

}));