import { TABLET_BREAKPOINT, XTRA_SMALL_PHONE_BREAKPOINT } from "#constants.tsx";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Avatar, Box, BoxProps, Button, Chip, Link, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import { TAvatarSizing } from ".";

export const WebOnlyView = styled('div')(({ theme }) => ({
	[theme.breakpoints.between('xs', TABLET_BREAKPOINT)]: {
		display: 'none',
	}
}));

export const LargeMobileOnlyView = styled('div')<BoxProps>(({ theme, width, bgcolor }) => ({
	display: 'none',
	[theme.breakpoints.between('xs', TABLET_BREAKPOINT)]: {
		width: width || 'auto',
		display: 'inline-flex',
		backgroundColor: bgcolor
	},
	[theme.breakpoints.between('xs', XTRA_SMALL_PHONE_BREAKPOINT)]: {
		display: 'none'
	}
}));

export const AllMobileOnlyView = styled('div')<BoxProps>(({ theme, width, bgcolor }) => ({
	display: 'none',
	[theme.breakpoints.between('xs', TABLET_BREAKPOINT)]: {
		width: width || 'auto',
		display: 'inline-flex',
		backgroundColor: bgcolor
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

export const FilterItem = ({ title, imageSrc = "", href="" }: { title: string, imageSrc?: string, href?: string }) => {
	return (
		<FilterItemLink underline="none" href={href}>
			<Stack alignItems={'center'} gap={1} >
				<FilterAvatar alt={title} src={imageSrc} />
				<Typography fontWeight={'light'} fontFamily={'Roboto'} fontSize={'14px'} textAlign={'center'} width={'74px'}>
					{title}
				</Typography>
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
}));

export const ProductNameTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.lightshade,
	fontFamily: 'Roboto',
	fontWeight: '600',
	fontSize: '18px',
	lineHeight: '175%',
	letterSpacing: '0.15px',
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

export const ProductSavingTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryOrange.main,
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: '14px',
	lineHeight: '100%',
	letterSpacing: '0.17px',
}));

export const ProductPromotionChip = styled(Chip)(({ theme })=> ({
	backgroundColor: theme.palette.primaryOrange.main,
	fontFamily: 'Roboto',
	fontWeight: '500',
	fontSize: '12px',
	lineHeight: '22px',
	letterSpacing: '0.46px',
	textTransform: 'uppercase',
	color: '#FFFFFF',
}));

