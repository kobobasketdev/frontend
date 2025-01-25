import { IconButton, Stack, styled } from "@mui/material";
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Dispatch, useEffect, useRef, useState, SetStateAction, MouseEvent, TouchEvent } from "react";
import { TScrollNavigationMode, TScrollOrientation } from "./types";

const processNavigationDisabled = ({
	setShouldDisableTopNavigation,
	setShouldDisableBottomNavigation,
	translateValue, 
	boundary
}: {
	setShouldDisableTopNavigation:  Dispatch<SetStateAction<boolean>>,
	setShouldDisableBottomNavigation: Dispatch<SetStateAction<boolean>>,
	translateValue: number,
	boundary: number
}) => {
	setShouldDisableTopNavigation(translateValue >= 0);
	setShouldDisableBottomNavigation(translateValue <= boundary);
};
const getBoundary = (outterRef: React.MutableRefObject<HTMLDivElement | null>, scrollerRef:  React.MutableRefObject<HTMLDivElement | null>, orientation: TScrollOrientation) => {
	
	const boundaryValues = orientation === 'vertical' ? 
		{ outterSize: outterRef.current!.clientHeight, scrollerSize: scrollerRef.current!.clientHeight }
		: { outterSize: outterRef.current!.clientWidth, scrollerSize: scrollerRef.current!.clientWidth };

	const boundary = boundaryValues.outterSize - boundaryValues.scrollerSize;
	return { boundary, shouldDisableTranslate: boundary >= 0 };
};

const resetScroller = ({
	translateValue, 
	boundary, 
	shouldDisableTranslate,
	orientation
}: {
	translateValue: React.MutableRefObject<number>, 
	boundary: number,
	shouldDisableTranslate: boolean,
	orientation: TScrollOrientation
}) => {
	if(shouldDisableTranslate) {
		return '0px 0px';
	}

	if(translateValue.current > 0) {
		translateValue.current = 0;
	}
	
	if(boundary < 0 && translateValue.current < boundary) {
		translateValue.current = boundary;
	}

	return orientation === 'vertical' ? `0px ${translateValue.current}px` : `${translateValue.current}px 0px`;
};

const setTranslatedValue = ({
	translateValue, 
	boundary, 
	shouldDisableTranslate,
	orientation
}: {
	translateValue: React.MutableRefObject<number>, 
	boundary: number,
	shouldDisableTranslate: boolean,
	orientation: TScrollOrientation
}) => {
	if(shouldDisableTranslate) {
		return '0px 0px';
	}

	if(translateValue.current > 0) {
		translateValue.current = 30;
	}

	if(translateValue.current < boundary) {
		translateValue.current = boundary - 30 ;
	}
		
	return orientation === 'vertical' ? `0px ${translateValue.current}px` : `${translateValue.current}px 0px`;
};

const horizontalArrangeContents = ({
	outterContainerWidth, nodeChildren, orientation, fullContent
}: {
	outterContainerWidth: number, nodeChildren: HTMLCollection, orientation: TScrollOrientation, fullContent: boolean
}) => {
	if(orientation === 'vertical' || !fullContent) {
		return;
	}

	for(const node of nodeChildren) {
		(node as HTMLElement).style.width = `${outterContainerWidth}px`;
	}
};

enum SCROLL_NAVIGATION_ID_ENUM {
	PREV,
	NEXT
}
export interface IScrollableContainer {
	orientation?: TScrollOrientation,
	showNavigation?: boolean,
	fullContent?: boolean,
	scrollBy?: number,
	float?: boolean,
	height?: string,
	width?: string,
	children: React.ReactElement<unknown>[] | React.ReactElement<unknown>
}

export interface IClientPointer {
	x: number ,
	y: number ,
}

export default function ScrollableContainer({ 
	children, 
	orientation = 'vertical', 
	showNavigation = false, 
	fullContent = false,
	scrollBy,
	height,
	width,
	float = false,
}: IScrollableContainer) {

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const outterContainerRef = useRef<HTMLDivElement | null>(null);
	const [shouldDisableTopNavigation, setShouldDisableTopNavigation] =  useState(true);
	const [shouldDisableBottomNavigation, setShouldDisableBottomNavigation] =  useState(true);
	const [isFloatHovered, setIsFloatHover] = useState<boolean>(false);
	const isUserActionDown = useRef<boolean>(false);
	const mouseDownPosition = useRef<IClientPointer>({ x: 0, y: 0 });
	const translateValue = useRef<number>(0);
	const movePosition = useRef<IClientPointer>({ x: 0, y: 0 });
	const direction = orientation === 'vertical' ? 'column'  : 'row' ;

	useEffect(() => {
		if(!scrollContainerRef.current || !outterContainerRef.current) {
			return;
		}
		horizontalArrangeContents({ 
			fullContent,
			outterContainerWidth: outterContainerRef.current.clientWidth, 
			nodeChildren: scrollContainerRef.current.children, 
			orientation 
		});
		const { boundary } = getBoundary(outterContainerRef, scrollContainerRef, orientation);
			
		processNavigationDisabled(
			{ 
				setShouldDisableTopNavigation,
				setShouldDisableBottomNavigation,
				translateValue: translateValue.current,
				boundary
			}
		);

		const handleResize = () => {
			horizontalArrangeContents({ 
				outterContainerWidth: outterContainerRef.current!.clientWidth, 
				nodeChildren: scrollContainerRef.current!.children, 
				orientation,
				fullContent 
			});
			const { boundary, shouldDisableTranslate } = getBoundary(outterContainerRef, scrollContainerRef, orientation);
			scrollContainerRef.current!.style.translate = resetScroller({ translateValue, boundary, shouldDisableTranslate, orientation });
		};
		
		addEventListener('resize', handleResize);

		return () => {
			removeEventListener('resize', handleResize);
		};
	}, [orientation, fullContent]);

	const handleScrollBy = (navDirection: number, scrollValue?: number ) => {
		isUserActionDown.current = false;

		if(!scrollContainerRef.current || !outterContainerRef.current) {
			return;
		}
		const { boundary, shouldDisableTranslate } = getBoundary(outterContainerRef, scrollContainerRef, orientation);
		
		const defaultScrollDistance =   orientation === 'horizontal' && fullContent ? outterContainerRef.current.clientWidth : scrollValue || 100;

		translateValue.current += navDirection === 1 ? -defaultScrollDistance : defaultScrollDistance;
		const properties = { translateValue, boundary, shouldDisableTranslate, orientation };

		setTranslatedValue(properties);
		scrollContainerRef.current.style.translate = resetScroller(properties); 
		processNavigationDisabled(
			{ 
				setShouldDisableTopNavigation,
				setShouldDisableBottomNavigation,
				translateValue: translateValue.current,
				boundary
			}
		);
	};

	const computePan = () => {
		const defaultScrollDistance = 30;

		const yMovement = movePosition.current.y - mouseDownPosition.current.y > 0 ? defaultScrollDistance : -defaultScrollDistance;
		const xMovement = movePosition.current.x - mouseDownPosition.current.x > 0 ? defaultScrollDistance : -defaultScrollDistance;
		const movement = orientation === 'vertical' ? yMovement : xMovement;
		translateValue.current += movement;
		return getBoundary(outterContainerRef, scrollContainerRef, orientation);

	};
	const handleScrollerPan = (event: MouseEvent<HTMLDivElement | MouseEvent>) => {
		event.preventDefault();

		if(!scrollContainerRef.current || !outterContainerRef.current) {
			return;
		}
		if( !isUserActionDown.current ) {
			return;
		}
		movePosition.current = { x: event.clientX, y: event.clientY };
		
		const { boundary, shouldDisableTranslate } = computePan();
		scrollContainerRef.current.style.translate = setTranslatedValue({ translateValue, boundary, shouldDisableTranslate, orientation });

	};

	const handleTouchPan = (event: TouchEvent<HTMLDivElement>) => {
		if(!scrollContainerRef.current || !outterContainerRef.current) {
			return;
		}
		if( !isUserActionDown.current ) {
			return;
		}
		
		movePosition.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
		

		const { boundary, shouldDisableTranslate } = computePan();
		scrollContainerRef.current.style.translate = setTranslatedValue({ translateValue, boundary, shouldDisableTranslate, orientation });

	};

	const handleUserActionDown = (e: MouseEvent<HTMLDivElement | MouseEvent> | TouchEvent<HTMLDivElement>) => {
		if(e.type === 'mousedown') {
			const event = (e as MouseEvent<HTMLDivElement | MouseEvent>);
			mouseDownPosition.current = { x: event.clientX, y: event.clientY };
		}
		else {
			const event = (e as TouchEvent<HTMLDivElement>);
			mouseDownPosition.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
		}
		isUserActionDown.current = true;
	};

	const handleResetMouse = () => () => {
		isUserActionDown.current = false;
		if(!scrollContainerRef.current || !outterContainerRef.current) {
			return;
		}

		const { boundary, shouldDisableTranslate } = getBoundary(outterContainerRef, scrollContainerRef, orientation);

		scrollContainerRef.current.style.translate = resetScroller({ translateValue, boundary, shouldDisableTranslate, orientation });
		processNavigationDisabled(
			{ 
				setShouldDisableTopNavigation,
				setShouldDisableBottomNavigation,
				translateValue: translateValue.current,
				boundary
			}
		);

	};

	const handleMouseEnter = () => () => {
		setIsFloatHover(float);
	};

	const handleMouseLeave = () => () => {
		setIsFloatHover(false);
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
					<NavigationStack alignItems={'center'} justifyContent={'center'} $mode={{ float, id: SCROLL_NAVIGATION_ID_ENUM.PREV, orientation }} id="prev-nav">
						<span>
							<IconButton 
								size="small"
								disabled={shouldDisableTopNavigation}
								aria-controls="scrollable-container" 
								onClick={() => handleScrollBy(SCROLL_NAVIGATION_ID_ENUM.PREV, scrollBy)}>
								{orientation === 'horizontal' ? <ChevronLeft /> : <ExpandLess />}
							</IconButton>
						</span>
					</NavigationStack>
				}
				<OutterContainer className="outter-scroller"
					ref={outterContainerRef}
					onMouseDown={(e) => handleUserActionDown(e)}
					onMouseUp={handleResetMouse()}
					onMouseLeave={handleResetMouse()}
					onMouseMove={(e) => handleScrollerPan(e)}
					onTouchStart={(e) => handleUserActionDown(e)}
					onTouchMove={(e) => handleTouchPan(e)}
					onTouchEnd={handleResetMouse()}
				>
					<InnerContainer 
						id='scrollable-container' 
						role="scrollbar" 
						ref={scrollContainerRef} 
						$direction={direction}
					>
						{children}
					</InnerContainer>
				</OutterContainer>
				{
					(showNavigation || (isFloatHovered && float && !shouldDisableBottomNavigation)) && 
					<NavigationStack alignItems={'center'} justifyContent={'center'} $mode={{ float, id: SCROLL_NAVIGATION_ID_ENUM.NEXT, orientation }} id="next-nav">
						<span>
							<IconButton 
								size="small"

								disabled={shouldDisableBottomNavigation}
								aria-controls="scrollable-container"
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
	touchAction: 'unset'
});

const InnerContainer = styled(Stack, {
	shouldForwardProp: prop => prop !== '$direction'
})<{ $direction: 'column' | 'row' }>(({ $direction })=>({
	flexDirection: $direction,
	width: $direction === 'column' ? 'inherit' : 'fit-content',
	transition: '.5s',
	...( $direction === 'row' && {
		height: 'inherit',
	}),
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