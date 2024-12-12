import { IconButton, Stack, styled } from "@mui/material";
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

const positionRowChildren = (nodeChildren: HTMLCollection) => {
	let count = 0;
	for(const node of nodeChildren) {
		(node as HTMLElement).style.left = `${count * 100}%`;
		++count;
	}
};

enum SCROLL_NAVIGATION_ID_ENUM {
	PREV,
	NEXT
}
export interface IScrollableContainer {
	orientation?: TScrollOrientation,
	showNavigation?: boolean,
	scrollBy?: number,
	float?: boolean,
	height?: string,
	width?: string,
	children: React.ReactElement<unknown>[] | React.ReactElement<unknown>
}
export default function ScrollableContainer({ 
	children, 
	orientation = 'vertical', 
	showNavigation = false, 
	scrollBy,
	height,
	width,
	float = false,
}: IScrollableContainer) {

	const continousScrollIntervalIdRef = useRef<ReturnType<typeof setInterval>>();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [shouldDisableTopNavigation, setShouldDisableTopNavigation] =  useState(true);
	const [shouldDisableBottomNavigation, setShouldDisableBottomNavigation] =  useState(true);
	const [isFloatHovered, setIsFloatHover] = useState<boolean>(false);
	const direction = orientation === 'vertical' ? 'column'  : 'row' ;

	useEffect(() => {
		if(scrollContainerRef.current) {
			if(orientation === 'horizontal') {
				positionRowChildren(scrollContainerRef.current.children);
			}
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

	const handleScrollBy = (navDirection: number, scrollValue?: number ) => {
		if(!scrollContainerRef.current) {
			return;
		}
		const defaultScrollDistance = scrollValue || orientation === 'vertical' ? scrollContainerRef.current.clientHeight : scrollContainerRef.current.clientWidth;

		scrollContainerRef.current.scrollBy({
			behavior: 'smooth',
			[orientation === 'horizontal' ? 'left' : 'top']: navDirection === 1 ? defaultScrollDistance : -defaultScrollDistance
		});
	};

	const handleContinousScroll = (navDirection: number, scrollValue?: number) => {
		continousScrollIntervalIdRef.current = setInterval(() => {
			handleScrollBy(navDirection, scrollValue);
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
		<StyledScrollerWrapper onMouseEnter={handleMouseEnter()} onMouseLeave={handleMouseLeave()} height={height} width={width}>
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
								onMouseDown={() =>  handleContinousScroll(SCROLL_NAVIGATION_ID_ENUM.PREV, scrollBy)}
								onMouseUp={() => handleStopContinousScroll()}
								onClick={() => handleScrollBy(SCROLL_NAVIGATION_ID_ENUM.PREV, scrollBy)}>
								{orientation === 'horizontal' ? <ChevronLeft /> : <ExpandLess />}
							</IconButton>
						</span>
					</NavigationStack>
				}
				<OutterContainer className="outter-scroller">
					<InnerContainer id='scrollable-container' role="scrollbar" ref={scrollContainerRef} onScroll={handleOnscroll} $direction={direction}>
						{children}
					</InnerContainer>
				</OutterContainer>
				{
					(showNavigation || (isFloatHovered && float && !shouldDisableBottomNavigation)) && 
					<NavigationStack alignItems={'center'} justifyContent={'center'} $mode={{ float, id: SCROLL_NAVIGATION_ID_ENUM.NEXT, orientation }}>
						<span>
							<IconButton 
								size="small"

								disabled={shouldDisableBottomNavigation}
								aria-controls="scrollable-container"
								onMouseDown={() =>  handleContinousScroll(SCROLL_NAVIGATION_ID_ENUM.NEXT, scrollBy)}
								onMouseUp={() => handleStopContinousScroll()}
								onClick={() => handleScrollBy(SCROLL_NAVIGATION_ID_ENUM.NEXT, scrollBy)}>
								{orientation === 'horizontal' ? <ChevronRight /> : <ExpandMore />}
							</IconButton>
						</span>
					</NavigationStack>
				}
			</ScrollableStackContainer>
		</StyledScrollerWrapper>
	);
}

const StyledScrollerWrapper = styled('div')<{ height?: string, width?: string }>(({ height, width }) => ({
	width: width || 'inherit',
	height: height || '100%',
}));

const ScrollableStackContainer = styled(Stack, {
	shouldForwardProp: prop => prop !== '$orientation'
})<{ $orientation: TScrollOrientation }>(({ $orientation }) => ({
	width: 'inherit',
	height: 'inherit',
	...($orientation === 'vertical' ?
		{
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		}
		: 
		{
			flexDirection: 'row',
			alignItems: 'center'
		}
	)
}));

const OutterContainer = styled('div')({
	position: 'relative',
	overflow: 'hidden',
	width: '100%',
	height: 'inherit',
});

const InnerContainer = styled(Stack, {
	shouldForwardProp: prop => prop !== '$direction'
})<{ $direction: 'column' | 'row' }>(({ theme, $direction })=>({
	flexDirection: $direction,
	position: 'absolute',
	top: '0px',
	bottom: $direction === 'row' ? '-17px' : '0px',
	left: '0px',
	right: $direction === 'column' ? '-17px' : '0px',
	...($direction === 'column' ? { overflowY: 'scroll', overflowX: 'auto' } : { 
		overflowY: 'auto', 
		overflowX: 'scroll',
		'& > *': {
			width: '100%',
			height: '100%',
			position: 'absolute',
		} 
	}),
	[theme.breakpoints.up(1670)]: {
		bottom: $direction === 'row' ? 'calc(-17px - 4%)' : '0px',
		right: $direction === 'column' ? 'calc(-17px - 2%)' : '0px',
	},
	
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
							right: '10px',
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