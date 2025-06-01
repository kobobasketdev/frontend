import { Box, IconButton, List, ListItem, ListItemButton, Modal, Stack, styled, Typography } from "@mui/material";
import { HighlightOff } from '@mui/icons-material';
import ScrollableContainer from "./ScrollableContainer";
import { upperFirst } from 'lodash';
import { extractsupportedCountries, IDeliveryState, TSupportedCountry } from "#state-management/slices/delivery.slice.ts";


export default function DeliveryCountryList({
	supportedCountries, selection, open, isLocationBased, handleChooseSelection, handleClose
}: {
	supportedCountries: TSupportedCountry,
	selection: IDeliveryState,
	open: boolean,
	isLocationBased: boolean,
	handleChooseSelection: (args: IDeliveryState) => void,
	handleClose: () => void
}) {
	const parsedSupportedDeliveryCountry = extractsupportedCountries(supportedCountries, selection.code);
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
								Filters and displays products that are allowed into this delivery location
							</StyledTypographySubhead>
						</Stack>
					</StyledBox>
					<Stack height={'400px'}>
						<ScrollableContainer showNavigation>
							<StyledDeliveryList>
								<Typography fontFamily={'Roboto'} fontSize={'14px'} mb={1}>{isLocationBased ? 'Suggested based on your location' : 'Based on your selection'}</Typography>
								<SelectedCountryListItem>
									<Stack direction={'row'} gap={1} justifyContent={'space-between'} width={1}>
										<Stack gap={1} justifyContent={'space-between'}>
											<SelectedTypographyHead fontSize={'1px'}>
												{upperFirst(selection.country)}
											</SelectedTypographyHead>
											<SelectedTypographySubhead>
												Showing you products allowed into this country
											</SelectedTypographySubhead>
										</Stack>
									</Stack>
								</SelectedCountryListItem>
								{parsedSupportedDeliveryCountry.map(({ country, code }) => (
									<StyledListItem key={country} disablePadding >
										<ListItemButton disabled={selection.country === country} onClick={() => handleChooseSelection({ country, code })}
											aria-label={`choose ${name}`}>
											<Stack direction={'row'} gap={1} width={'100%'} justifyContent={'space-between'}>
												<Box>
													<ListTypography>
														{upperFirst(country)}
													</ListTypography>
												</Box>
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
		width: '95%',
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

}));

const StyledTypographySubhead = styled(Typography)({
	fontFamily: 'Roboto',
	fontSize: '16px',
	lineHeight: '28px',
	letterSpacing: '0.15px'
});

const SelectedCountryListItem = styled(ListItem)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover,
	paddingTop: theme.spacing(1.5),
	paddingBottom: theme.spacing(1.5),
	border: `1px solid ${theme.palette.primaryGreen.main}`,
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