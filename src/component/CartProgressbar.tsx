import { minimumWeight } from "#constants.tsx";
import { LinearProgress, linearProgressClasses, Stack, styled, Typography, SvgIcon } from "@mui/material";
import CheckoutReadySvg from "./svg/CheckoutReadySvg";
import ProductAddToCartSvg from "./svg/ProductAddToCartSvg";

export default function CartProgressbar({
	cartWeight = 0, showProgressWeight = false, showCartWeight = true
}: {
	cartWeight: number, showProgressWeight?: boolean, showCartWeight?: boolean
}) {
	const fixedWeight = cartWeight.toFixed(2);
	const value = Math.min(((+fixedWeight / minimumWeight) * 100), 100);
	return (
		<Stack gap={2} position={'relative'}>
			{
				showProgressWeight &&
				<Stack direction={'row'} justifyContent={'space-between'}>
					<StaticProgressTextTypography>
						0kg
					</StaticProgressTextTypography>
					<StaticProgressTextTypography>
						Min {minimumWeight}kg
					</StaticProgressTextTypography>
				</Stack>
			}

			<StyledCartProgressBar variant="determinate" value={value} />
			<CustomSpan $value={value === 0 ? 0.5 : value}>
				<StyledCartFilledIcon fontSize="small" viewBox="-3 -4 18 18" id="moving-cart">
					<ProductAddToCartSvg strokeWidth={"2"} color="white" />
				</StyledCartFilledIcon>
				{
					showCartWeight &&
					<CartWeightTypography>
						{fixedWeight}kg
					</CartWeightTypography>
				}
			</CustomSpan>
			<StyledCartGoIcon fontSize="large" $isReadyToGo={value === 100} viewBox="-2 -2 12 12">
				<CheckoutReadySvg fillColor={value === 100 ? 'white' : ''} />
			</StyledCartGoIcon>
		</Stack>
	);
}

const StyledCartProgressBar = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.customGrey.lightshade,
		...theme.applyStyles('dark', {
			backgroundColor: theme.palette.customGrey.lightshade,
		}),
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		background: 'linear-gradient(90deg, #F74C25 69.05%, #FFF700 130.95%)',
		...theme.applyStyles('dark', {
			background: 'linear-gradient(90deg, #F74C25 69.05%, #FFF700 130.95%)',
		}),
	},
}));


const StaticProgressTextTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.customGrey.deeper,
	fontFamily: 'Roboto',
	fontSize: '12px',
	lineHeight: '13px',
	letterSpacing: '0.46px',
}));

const StyledCartGoIcon = styled(SvgIcon, {
	shouldForwardProp: prop => prop !== '$isReadyToGo'
})<{ $isReadyToGo?: boolean }>(({ theme, $isReadyToGo }) => ({
	border: `2.5px solid ${$isReadyToGo ? 'white' : theme.palette.customGrey.lightshade}`,
	borderRadius: theme.shape.borderRadius * 10,
	background: $isReadyToGo ? 'linear-gradient(180deg, #F74C25 8.7%, #FFF700 165.22%)' : 'white',
	position: 'absolute',
	right: '0px',
	bottom: '-12px'
}));

const StyledCartFilledIcon = styled(SvgIcon)(({ theme }) => ({
	border: `2.5px solid white`,
	borderRadius: theme.shape.borderRadius * 10,
	backgroundColor: 'white',
	background: 'linear-gradient(180deg, #F74C25 8.7%, #FFF700 165.22%)',

}));

const CustomSpan = styled('span')<{ $value: number }>(({ theme, $value }) => ({
	display: 'inline-flex',
	flexDirection: 'column',
	gap: theme.spacing(1),
	position: 'absolute',
	left: `calc(${$value}% - ${$value > 97 ? '2em' : '1em'})`,
	bottom: '-24.5px',
	transition: '.9s',
	'& #moving-cart': {
		visibility: $value > 97 ? 'hidden' : 'visible'
	}
}));

const CartWeightTypography = styled(Typography)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontSize: '12px',
	lineHeight: '13px',
	letterSpacing: '0.46px'
}));