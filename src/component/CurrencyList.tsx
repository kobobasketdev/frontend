import { Box, IconButton, List, ListItem, ListItemButton, Modal, Stack, styled, Typography } from "@mui/material";
import { HighlightOff } from '@mui/icons-material';
import { CurrencySelection } from ".";
import ScrollableContainer from "./ScrollableContainer";

export default function CurrencyList({ currencyList, selection, open, isLocationBased, handleChooseSelection, handleClose }: 
{ 
	currencyList: CurrencySelection[], 
	selection: CurrencySelection,
	open: boolean,
	isLocationBased: boolean,
	handleChooseSelection: (args: CurrencySelection) => void,
	handleClose: () => void
}) {

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="currency-modal-title"
			aria-describedby="currnecy-modal-description"
		>
			<Stack alignItems={'center'} justifyContent={'center'} height={'100%'}>
				<StyledModelcontent bgcolor={'white'}>
					<StyledBox>
						<Stack alignItems={'end'} mb={1}>
							<IconButton onClick={handleClose}>
								<HighlightOff />
							</IconButton>
						</Stack>
						<Stack gap={2}>
							<StyledTypographyHead id="currency-modal-title">
								SELECT YOUR DELIVERY LOCATION
							</StyledTypographyHead>
							<StyledTypographySubhead id="currency-modal-title">
								Delivery fee vary based on your location
							</StyledTypographySubhead>
						</Stack>
					</StyledBox>
					<Stack height={'400px'}>
						<ScrollableContainer showNavigation>
							<StyledDeliveryList>
								<Typography fontFamily={'Roboto'} fontSize={'14px'} mb={1}>{isLocationBased ? 'Suggested based on your location' : 'Based on your selection'}</Typography>
								<SelectedCurrencyListItem>
									<Stack direction={'row'} gap={1} justifyContent={'space-between'} width={1}>
										<Stack gap={1} justifyContent={'space-between'}>
											<SelectedTypographyHead fontSize={'1px'}>
												{selection.country}
											</SelectedTypographyHead>
											<SelectedTypographySubhead>
												Your order will be charged in
											</SelectedTypographySubhead>
										</Stack>
										<Stack gap={1} width={1/3}>
											<SelectedTypographyHead>
												{selection.name}
											</SelectedTypographyHead>
											<SelectedTypographySubhead>
												{selection.currency}
											</SelectedTypographySubhead>
										</Stack>
									</Stack>
								</SelectedCurrencyListItem>
								{currencyList.filter(currency => currency.id !== selection.id).map(({ id, name, country, currency }) => (
									<StyledListItem key={id} disablePadding >
										<ListItemButton disabled={selection.id === id} onClick={() => handleChooseSelection({ id, name, country, currency })}
											aria-label={`choose ${name}`}>
											<Stack direction={'row'} gap={1} width={'100%'} justifyContent={'space-between'}>
												<Box>
													<ListTypography>
														{country}
													</ListTypography>
												</Box>
												<SideStyledBox>
													<ListTypography>
														{name}
													</ListTypography>
													<LsitTypographyLight>
														{currency}
													</LsitTypographyLight>
												</SideStyledBox>
											</Stack>
										</ListItemButton>
									</StyledListItem>
								))}
							</StyledDeliveryList>
						</ScrollableContainer>
					</Stack>
				</StyledModelcontent>
			</Stack>
		</Modal>
	);
}

const StyledModelcontent = styled(Stack)(({ theme }) => ({
	width: '500px',
	borderRadius: theme.shape.borderRadius,
	padding: theme.spacing(2),
	[theme.breakpoints.between('xs', 'sm')]: {
		width: '380px',
	}
}));

const StyledBox = styled(Box)(({ theme }) => ({
	paddingTop: '16px',
	paddingBottom: '16px',
	borderBottom: `1px solid ${theme.palette.divider}`,
	color: theme.palette.primaryBlack.main
}));

const StyledTypographyHead = styled(Typography)({
	fontFamily: 'Alata',
	fontSize: '24px',
	lineHeight: '133.4%',
	letterSpacing: '1px'
});

const StyledDeliveryList = styled(List)(() => ({
	backgroundColor:'orange'
}));

const StyledTypographySubhead = styled(Typography)({
	fontFamily: 'Roboto',
	fontSize: '16px',
	lineHeight: '100%',
	letterSpacing: '0.15px'
});

const SelectedCurrencyListItem = styled(ListItem)(({ theme }) => ({
	backgroundColor: theme.palette.menuBackground.main,
	paddingTop: theme.spacing(1.5),
	paddingBottom: theme.spacing(1.5),
	border: `1px solid ${theme.palette.primaryOrange.main}`,
	borderRadius: theme.shape.borderRadius * 8
}));

const SelectedTypographyHead = styled(Typography)(({ theme }) => ({
	fontFamily: 'Roboto',
	fontWeight: '600',
	fontSize: '18px',
	lineHeight: '100%',
	letterSpacing: '0.15px',
	[theme.breakpoints.between('xs', 'sm')]: {
		fontSize: '14px'
	}
}));

const SelectedTypographySubhead = styled(Typography)(({ theme }) => ({
	fontFamily: 'Roboto',
	fontWeight: '400',
	fontSize: '14px',
	lineHeight: '100%',
	letterSpacing: '0.17px',
	color: theme.palette.primaryBlack.deeper,
	[theme.breakpoints.between('xs', 'sm')]: {
		fontSize: '12px'
	}
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
	marginTop: theme.spacing(1.5),
	marginBottom: theme.spacing(1.5),
}));

const SideStyledBox = styled(Box)(({ theme }) => ({
	width: '150px',
	[theme.breakpoints.between('xs', 'sm')]: {
		width: '130px'
	}
}));

const ListTypography = styled(Typography)(({ theme }) => ({
	fontFamily: 'Roboto',
	fontSize: '16px',
	[theme.breakpoints.between('xs', 'sm')]: {
		fontSize: '14px'
	}
}));

const LsitTypographyLight = styled(Typography)(({ theme }) => ({
	fontWeight: '400',
	fontFamily: 'Roboto',
	fontSize: '14px',
	[theme.breakpoints.between('xs', 'sm')]: {
		fontSize: '12px',
	}
}));