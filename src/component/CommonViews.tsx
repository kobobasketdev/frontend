import { LARGED_DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, SMALLDESKTOP_BREAKPOINT, TABLET_BREAKPOINT, TABLET_SCREEN_MAX_WIDTH, XTRA_SMALL_PHONE_BREAKPOINT } from "#constants.tsx";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, IconButton, Link, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import { TAvatarSizing } from "./types";

export const WebOnlyView = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none',
	}
}));

export const LargeDesktopOnlyView = styled(Box)(({ theme }) => ({
	[theme.breakpoints.between('xs', SMALLDESKTOP_BREAKPOINT)]: {
		display: 'none',
	}
}));
export const LargeMobileOnlyView = styled(Box)(({ theme, width }) => ({
	[theme.breakpoints.between('xs', TABLET_BREAKPOINT)]: {
		width: width || 'auto',
		display: 'inline-flex',
	},
	[theme.breakpoints.between('xs', XTRA_SMALL_PHONE_BREAKPOINT)]: {
		display: 'none'
	}
}));

export const SmallDesktopOnlyView = styled(Box)(({ theme, width }) => ({
	display: 'none',
	[theme.breakpoints.between('xs', SMALLDESKTOP_BREAKPOINT)]: {
		width: width || 'auto',
		display: 'inline-flex',
	},
}));

export const AllMobileOnlyView = styled(Box)(({ theme, width }) => ({
	display: 'none',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		width: width || 'auto',
		display: 'inline-flex',
	},
}));

export const DropDownView = ({ title, children }: { title: string, children: React.ReactElement<unknown> }) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const handleIsOpen = () => () => {
		setIsOpen(!isOpen);
	};
	return (
		<Stack>
			<Stack width={'fit-content'}>
				<StyledButton 
					onClick={handleIsOpen()}
					aria-label={`${title} dropdown`}  
					variant="text"
					endIcon={
						<>
							{!isOpen ? <ExpandMore /> : <ExpandLess /> }
						</>
					}
				>
					{title}
				</StyledButton>
			</Stack>
			<Box pl={1} mt={0}>
				{isOpen ? children : <span></span> }
				{/* <TransitionGroup>
				</TransitionGroup> */}
			</Box>
		</Stack>
	);
};

export const FilterItem = ({ title="", imageSrc = "", href="" }: { title?: string, imageSrc?: string, href?: string }) => {
	return (
		<FilterItemLink underline="none" href={href}>
			<Stack alignItems={'center'} gap={1} >
				<FilterAvatar alt={title} src={imageSrc} />
				{
					title && <Typography fontWeight={'light'} fontFamily={'Roboto'} fontSize={'14px'} textAlign={'center'} width={'74px'}>
						{title}
					</Typography>
				}
			</Stack>
		</FilterItemLink>
	);
};

const FilterItemLink = styled(Link)(({ theme }) =>({
	'& p':{
		color: theme.palette.primaryBlack.main
	}
}));

const FilterAvatar = styled(Avatar)({
	height: '74px',
	width: '74px',
});

const StyledButton = styled(Button)(({ theme }) => ({
	textTransform: 'capitalize',
	color: theme.palette.primaryBlack.deeper
}));

export const ProductAvatar = styled(Avatar, {
	shouldForwardProp: prop => prop !== '$size'
})<{ $size?: TAvatarSizing }>(({ $size }) => ({
	height: $size?.height || 'inherit',
	width: $size?.width || '100%'
}));

export const ProductPriceTypography = styled(Typography, {
	shouldForwardProp: prop => !['$isPromotion', '$fontSize', '$fontWeight'].includes(prop as string)
})<{ $isPromotion?: boolean, $fontSize?: string, $fontWeight?: string }>(({ theme, ...props }) => ({
	color: props.$isPromotion ? theme.palette.primaryOrange.main : theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontWeight: props.$fontWeight || '400',
	fontSize: props.$fontSize || '16px',
	lineHeight: '100%',
	letterSpacing: '0.15px',
	[theme.breakpoints.down(466)]: {
		fontSize: props.$fontSize && `calc(${props.$fontSize} - 4px)` || '16px'
	},
}));

export const ProductNameTypography = styled(Typography, {
	shouldForwardProp: prop => prop !== '$fontSize'
})<{ $fontSize?: string }>(({ theme, $fontSize }) => ({
	color: theme.palette.primaryBlack.lightshade,
	fontFamily: 'Roboto',
	fontWeight: '600',
	fontSize: $fontSize || '18px',
	lineHeight: '175%',
	letterSpacing: '0.15px',
	[theme.breakpoints.down(466)]: {
		fontSize: $fontSize && `calc(${$fontSize} - 4px)` || '16px'
	},
}));

export const ProductWeightTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.lightshade,
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: '14px',
	lineHeight: '100%',
	letterSpacing: '0.17px',
}));

export const ProductLocationPriceTypography = styled(Typography, {
	shouldForwardProp: prop => prop !== '$strikeOut'
})<{ $strikeOut?: boolean }>(({ theme, $strikeOut }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontSize: '14px',
	lineHeight: '100%',
	letterSpacing: '0.17px',
	textDecoration: $strikeOut ? 'line-through' : 'none'
}));

export const ProductLocationPriceSpan = styled('span')(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	display: 'inline-block',
	fontFamily: 'Roboto',
	fontSize: '14px',
	fontWeight: 'bold',
	lineHeight: '100%',
	letterSpacing: '0.17px',
	textDecoration: 'line-through' 
}));

export const ProductSavingTypography = styled(Typography, {
	shouldForwardProp: prop => prop !== '$fontWeight'
})<{ $fontWeight?: string }>(({ theme, $fontWeight }) => ({
	color: theme.palette.primaryOrange.main,
	fontFamily: 'Roboto',
	fontWeight: $fontWeight || '400',
	fontSize: '14px',
	lineHeight: '100%',
	letterSpacing: '0.17px',
	[theme.breakpoints.down(466)]: {
		fontSize: '12px'
	},
}));

export const ProductPromotionChip = styled(Chip)(({ theme })=> ({
	backgroundColor: theme.palette.primaryOrange.light,
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '11px',
	lineHeight: '22px',
	letterSpacing: '0.46px',
	textTransform: 'uppercase',
	color: '#FFFFFF',
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		fontSize: '9px'
	}
}));

export const MiniPromotionGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: 'fit-content',
	columnGap: theme.spacing(3),
	rowGap: theme.spacing(4),
	gridTemplateColumns: "repeat(2, 680px)",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(2, 450px)",
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(2, minmax(400px,auto))",
		padding: `0px ${theme.spacing(1)}`,
	},
	[theme.breakpoints.down(893)]: {
		gridTemplateColumns: "repeat(1, 690px)",
		padding: `0px`,
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(1, minmax(318px, auto))",
		padding: `0px ${theme.spacing(2)}`,
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(1, minmax(318px, auto))",
		padding: `0px`,
	}
}));

export const ContentStack = styled(Stack)(() => ({
	alignItems: 'center',
	width: 'fit-content',
	marginLeft: 'auto',
	marginRight: 'auto',
}));

export const ShopTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryGreen.main,
	fontFamily: 'Alata',
	fontWeight: '400',
	fontSize: '1.875rem',
	lineHeight: '133.4%',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingLeft: theme.spacing(),
		fontSize: '1.575rem',
	},
}));

export const ShopTypographyLight = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryGreen.main,
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: '18px',
	lineHeight: '175%',
	letterSpacing: '0.15px',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingLeft: theme.spacing()
	},
	
}));

export const CustomIconButton = styled(IconButton)(() => ({
	boxSizing: 'border-box',
	backgroundColor: 'rgba(255, 255, 255, 0.82)',
	boxShadow: '0px 2px 11.4px rgba(0, 0, 0, 0.1)',
	fontWeight: 'normal',
	borderRadius: '30px',
	fontFamily: 'Roboto',
	color: 'black',
	paddingLeft: '15px',
	paddingRight: '15px',
}));

export const CustomLongWishlistButton = styled(Button)(({ theme }) => ({
	backgroundColor: 'rgba(255, 255, 255, 0.82)',
	boxShadow: '0px 2px 11.4px rgba(0, 0, 0, 0.1)',
	borderRadius: theme.shape.borderRadius * 6,
	color: theme.palette.primaryBlack.moreDeeper
}));

export const CustomSpan = styled('span')(({ theme }) => ({
	display: 'inline-flex',
	marginLeft: theme.spacing(.5),
	fontSize: '1rem'
}));

export const WishLishIconButton = styled(IconButton)(({ theme }) => ({
	paddingRight: theme.spacing(1.5)
}));

export const ViewMore = styled('span')(() => ({
	display: 'inline-flex',
	alignItems: 'end',
	position: 'absolute',
	height: '22px',
	right: '-6px',
	bottom: '-3px'
}));