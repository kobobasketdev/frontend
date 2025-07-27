import { CheckoutButton, CustomProfileGrid } from "#component/CommonViews.tsx";
import { ContactDetails } from "#component/ContactDetails.tsx";
import ProfileHeading from "#component/ProfileHeading.tsx";
import ShippingAddress from "#component/ShippingAddress.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH } from "#constants.tsx";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { extractsupportedCountries, selectSupportedCountries } from "#state-management/slices/supported-countries.ts";
import { signOut } from "#state-management/slices/user.slice.ts";
import { RoutePath } from "#utils/route.ts";
import { ArrowBackIos, ArrowForwardIos, Place } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemIcon, Stack, styled, Typography } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { upperFirst } from "lodash";

export default function Settings() {
	const supportedCountriesInfo = useAppSelector(selectSupportedCountries);
	const supportedCountries = extractsupportedCountries(supportedCountriesInfo);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return (
		<Stack>
			<StyledStackContent>
				<StyledStack>
					<ProfileHeading activeMenu={4} />
					<PageContainerStack>
						<NavStack gap={2.5} >
							<Box pl={.5}>
								<Link to={RoutePath.PROFILE} style={{ color: 'black', display: "inline-flex", }}>
									<ArrowBackIos /> <Typography >My Profile</Typography>
								</Link>
							</Box>
							<Typography fontFamily={'Alata'} pl={.5}>
								SETTINGS
							</Typography>
						</NavStack>
						<CustomProfileGrid>
							<StyledGrid>
								<OuterContainerStack>
									<StyledAccordion disableGutters>
										<AccordionSummary
											expandIcon={<ArrowForwardIos />}
											aria-controls="country-content"
											id="country-header"
										>
											<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={1} maxWidth={'400px'}>
												<Stack gap={1}>
													<Typography fontWeight={'500'}>
														Country
													</Typography>
													<Typography color="rgba(0, 0, 0, 0.6)" fontSize={'13px'}>
														Countries KoboBasket currently delivers to
													</Typography>
												</Stack>
											</Stack>
										</AccordionSummary>
										<AccordionDetails>
											<List disablePadding>
												{
													supportedCountries.map(({ country }) => (<ListItem disableGutters key={country}>
														<ListItemIcon>
															<Place color="disabled" />
														</ListItemIcon>
														{upperFirst(country)}
													</ListItem>))
												}
											</List>
										</AccordionDetails>
									</StyledAccordion>
								</OuterContainerStack>
								<OuterContainerStack>
									<ContainerSection gap={1.5}>
										<Typography fontWeight={'500'}>
											Contact Details
										</Typography>
										<ContactDetails />
									</ContainerSection>
								</OuterContainerStack>
								<OuterContainerStack>
									<ContainerSection gap={1}>
										<ShippingAddress />
									</ContainerSection>
								</OuterContainerStack>
							</StyledGrid>
						</CustomProfileGrid>
					</PageContainerStack>
				</StyledStack>
				<ContainerSection direction={'row'} justifyContent={'center'}>
					<CheckoutButton $isCurved={false} onClick={() => {
						dispatch(signOut());
						navigate({
							to: RoutePath.LOGIN
						});
					}}>
						Sign Out of KoboBasket
					</CheckoutButton>
				</ContainerSection>
			</StyledStackContent>
		</Stack>
	);
}

const StyledGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(1, minmax(auto, 800px))',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

const StyledStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	gap: theme.spacing(),
	maxWidth: '1200px',
	margin: '0 auto',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		'& .profile-nav': {
			display: 'none',
		},
		flexDirection: 'column',
		backgroundColor: '#EDEDED',
		gap: theme.spacing(2),
		margin: '0 0',
	}
}));

const PageContainerStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingTop: theme.spacing(9),
		'& > div:last-of-type': {
			// border: '1px solid #F2F2F7',
			paddingTop: theme.spacing(),
			paddingBottom: theme.spacing()
		}
	}
}));

const OuterContainerStack = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	'& > *': {
		width: '100%',
		maxWidth: '500px',
		[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
			margin: '0 auto'
		}
	}
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
	border: 'none',
	boxShadow: 'none',
	paddingLeft: theme.spacing(),
	':last-of-type': {
		borderRadius: '0px'
	},
	'::before': {
		display: 'none'
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		padding: '0px',
	}
}));

const ContainerSection = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(2.5),
	paddingBottom: theme.spacing(1),
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(15),
	gap: theme.spacing(4),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(24)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(20)
	},
}));

const NavStack = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(2.5),
	paddingBottom: theme.spacing(1),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingLeft: theme.spacing(2.5),
		'& > div:first-of-type': {
			display: 'none'
		},
		'& p': {
			fontSize: '20px'
		},
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	}
}));