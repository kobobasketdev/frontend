import FacebookSvg from "#component/svg/FacebookSvg.tsx";
import InstagramSvg from "#component/svg/InstagramSvg.tsx";
import TiktokSvg from "#component/svg/TiktokSvg.tsx";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Divider, IconButton, List, ListItem, Stack, styled, TextField, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import americanPay from '@src/assets/american.png';
import chinaPay from '@src/assets/china.png';
import dinersPay from '@src/assets/diners.png';
import discoveryPay from '@src/assets/discover.png';
import jcbPay from '@src/assets/jcb.png';
import mastercardPay from '@src/assets/mastercard.png';
import paypalPay from '@src/assets/paypal.png';
import visaPay from '@src/assets/visa.png';
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";

const payment = [
	americanPay, chinaPay, dinersPay, discoveryPay, jcbPay, mastercardPay, paypalPay, visaPay
];

export default function Footer() {
	return (
		<StyledFooterStack width={1} alignSelf={'center'}>
			<MobileFooter />
			<WebFooter />
		</StyledFooterStack>
	);
}

const WebFooter = () => {
	return (
		<WebContent width={1} maxWidth={'990px'} margin={'0 auto'} gap={3}>
			<Stack direction={'row'} mt={8} justifyContent={'space-between'}>
				<Stack gap={3}>
					<Stack gap={1}>
						<Typography color="white" fontWeight={'800'}>
							We Value Your Option
						</Typography>
						<Typography color="white" fontSize={'14px'}>
							Take our quick survey (it'll only take 5 minutes) and help us grow!
						</Typography>
					</Stack>
					<Box>
						<Button sx={{ bgcolor: 'black', color: 'white', textTransform: 'inherit', pl: 2, pr: 2 }}>
							Take the survey
						</Button>
					</Box>
				</Stack>

				<Stack gap={2} maxWidth={'400px'} >
					<Typography fontWeight={'800'} color="white">
						Join for Exclusive Offers and Updates
					</Typography>
					<TextField label='Email' variant="standard" placeholder="Enter your email"
						helperText='By subscribing, you agree to receive updates, promotions, and other communications from Kobobasket regarding your orders and our products.'
						slotProps={{
							inputLabel: {
								shrink: true,
								sx: {
									color: 'white',
									'&.Mui-focused': {
										color: 'white'
									}
								}
							},
							formHelperText: {
								sx: {
									color: '#AEAEB2',
									marginTop: 1,
								}
							},
							input: {
								sx: {
									color: 'white',
									'&::after': {
										borderColor: 'white'
									},
									'&::before': {
										borderWidth: '2px',
										borderColor: 'white'
									}
								}
							}
						}}
					/>
					<Box>
						<Button sx={{ bgcolor: 'black', color: 'white', textTransform: 'inherit', pl: 2, pr: 2 }}>
							Subscribe
						</Button>
					</Box>
				</Stack>
			</Stack>
			<Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.30)', mt: 2 }} />
			<Stack direction={'row'} justifyContent={'space-between'}>
				<Stack direction={'row'} justifyContent={'space-between'}>
					<StyledAccordion expanded>
						<AccordionSummary >
							Company
						</AccordionSummary>
						<AccordionDetails>
							<List sx={{ pt: '0px' }}>
								<ListItem disableGutters>
									<FooterLink to="" >
										About Kobobasket
									</FooterLink>
								</ListItem>
								<ListItem disableGutters >
									<FooterLink to="">
										Organic sourcing policy
									</FooterLink>
								</ListItem>
								<ListItem disableGutters >
									<FooterLink to="">
										Careers
									</FooterLink>
								</ListItem>
							</List>
						</AccordionDetails>
					</StyledAccordion>
					<StyledAccordion expanded>
						<AccordionSummary>
							Help and Support
						</AccordionSummary>
						<AccordionDetails>
							<List sx={{ pt: '0px' }}>
								<ListItem disableGutters>
									<FooterLink to="" >
										FAQ
									</FooterLink>
								</ListItem>
								<ListItem disableGutters >
									<FooterLink to="">
										Contact us
									</FooterLink>
								</ListItem>
								<ListItem disableGutters >
									<FooterLink to="">
										Shipping info
									</FooterLink>
								</ListItem>
							</List>
						</AccordionDetails>
					</StyledAccordion>
					<StyledAccordion expanded>
						<AccordionSummary>
							My Account
						</AccordionSummary>
						<AccordionDetails>
							<List sx={{ pt: '0px' }}>
								<ListItem disableGutters>
									<FooterLink to="" >
										My Account
									</FooterLink>
								</ListItem>
								<ListItem disableGutters >
									<FooterLink to="">
										My Wishlist
									</FooterLink>
								</ListItem>
								<ListItem disableGutters >
									<FooterLink to="">
										Items in cart
									</FooterLink>
								</ListItem>
								<ListItem disableGutters >
									<FooterLink to="">
										Track my Order
									</FooterLink>
								</ListItem>
							</List>
						</AccordionDetails>
					</StyledAccordion>
					<StyledAccordion expanded>
						<AccordionSummary>
							Accepted Payments
						</AccordionSummary>
						<AccordionDetails sx={{ pb: 2 }}>
							<Stack direction={'row'} flexWrap={'wrap'} gap={3} mt={2} pb={2}>
								{
									payment.map((icon, index) => <Avatar variant="rounded" src={icon} key={index} />)
								}
							</Stack>
						</AccordionDetails>
					</StyledAccordion>
				</Stack>
				<Stack gap={2} pt={2.7}>
					<Typography color="white" fontWeight={'500'} textAlign={'center'}>Connect with us</Typography>
					<Stack direction={'row'} justifyContent={'center'} gap={3}>
						<IconButton>
							<InstagramSvg />
						</IconButton>
						<IconButton>
							<FacebookSvg />
						</IconButton>
						<IconButton>
							<TiktokSvg />
						</IconButton>
					</Stack>
				</Stack>
			</Stack>
		</WebContent>
	);
};

const MobileFooter = () => {
	return (
		<MobileContent padding={2} pt={3} gap={4} maxWidth={'500px'} margin={'0 auto'}>
			<Stack gap={2}>
				<Stack direction={'row'} justifyContent={'center'} gap={3}>
					<IconButton>
						<InstagramSvg />
					</IconButton>
					<IconButton>
						<FacebookSvg />
					</IconButton>
					<IconButton>
						<TiktokSvg />
					</IconButton>
				</Stack>
				<Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.30)' }} />
			</Stack>
			<Stack gap={2} mt={2}>
				<Typography fontWeight={'800'} color="white">
					Join for Exclusive Offers and Updates
				</Typography>
				<TextField label='Email' variant="standard" placeholder="Enter your email"
					helperText='By subscribing, you agree to receive updates, promotions, and other communications from Kobobasket regarding your orders and our products.'
					slotProps={{
						inputLabel: {
							shrink: true,
							sx: {
								color: 'white',
								'&.Mui-focused': {
									color: 'white'
								}
							}
						},
						formHelperText: {
							sx: {
								color: '#AEAEB2',
								marginTop: 1,
							}
						},
						input: {
							sx: {
								color: 'white',
								'&::after': {
									borderColor: 'white'
								},
								'&::before': {
									borderWidth: '2px',
									borderColor: 'white'
								}
							}
						}
					}}
				/>
				<Box>
					<Button sx={{ bgcolor: 'black', color: 'white', textTransform: 'inherit', pl: 2, pr: 2 }}>
						Subscribe
					</Button>
				</Box>
			</Stack>
			<Stack>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore sx={{ fill: 'white' }} />}>
						Company
					</AccordionSummary>
					<AccordionDetails>
						<List sx={{ pt: '0px' }}>
							<ListItem disableGutters>
								<FooterLink to="" >
									About Kobobasket
								</FooterLink>
							</ListItem>
							<ListItem disableGutters >
								<FooterLink to="">
									Organic sourcing policy
								</FooterLink>
							</ListItem>
							<ListItem disableGutters >
								<FooterLink to="">
									Careers
								</FooterLink>
							</ListItem>
						</List>
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore sx={{ fill: 'white' }} />}>
						Help and Support
					</AccordionSummary>
					<AccordionDetails>
						<List sx={{ pt: '0px' }}>
							<ListItem disableGutters>
								<FooterLink to="" >
									FAQ
								</FooterLink>
							</ListItem>
							<ListItem disableGutters >
								<FooterLink to="">
									Contact us
								</FooterLink>
							</ListItem>
							<ListItem disableGutters >
								<FooterLink to="">
									Shipping info
								</FooterLink>
							</ListItem>
						</List>
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore sx={{ fill: 'white' }} />}>
						My Account
					</AccordionSummary>
					<AccordionDetails>
						<List sx={{ pt: '0px' }}>
							<ListItem disableGutters>
								<FooterLink to="" >
									My Account
								</FooterLink>
							</ListItem>
							<ListItem disableGutters >
								<FooterLink to="">
									My Wishlist
								</FooterLink>
							</ListItem>
							<ListItem disableGutters >
								<FooterLink to="">
									Items in cart
								</FooterLink>
							</ListItem>
							<ListItem disableGutters >
								<FooterLink to="">
									Track my Order
								</FooterLink>
							</ListItem>
						</List>
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore sx={{ fill: 'white' }} />}>
						Accepted Payments
					</AccordionSummary>
					<AccordionDetails sx={{ pb: 2 }}>
						<Stack direction={'row'} flexWrap={'wrap'} gap={3} mt={2} pb={2}>
							{
								payment.map((icon, index) => <Avatar variant="rounded" src={icon} key={index} />)
							}
						</Stack>
					</AccordionDetails>
				</StyledAccordion>
			</Stack>
			<Stack pt={1} gap={3}>
				<Stack gap={1}>
					<Typography color="white" fontWeight={'800'}>
						We Value Your Option
					</Typography>
					<Typography color="white" fontSize={'14px'}>
						Take our quick survey (it'll only take 5 minutes) and help us grow!
					</Typography>
				</Stack>
				<Box>
					<Button sx={{ bgcolor: 'black', color: 'white', textTransform: 'inherit', pl: 2, pr: 2 }}>
						Take the survey
					</Button>
				</Box>
			</Stack>
		</MobileContent>
	);
};

const MobileContent = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const WebContent = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));

const FooterLink = styled(Link)(() => ({
	color: 'white',
	fontWeight: 'normal',
	fontSize: '14px'
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
	backgroundColor: 'transparent',
	color: 'white',
	boxShadow: 'none',
	borderRadius: '0px !important',
	'::before': {
		display: 'none'
	},
	'.MuiAccordionSummary-root ': {
		paddingLeft: '0px',
		paddingRight: '0px'
	},
	'div:only-of-type': {
		padding: 0,
	},

	[theme.breakpoints.up(TABLET_SCREEN_MAX_WIDTH)]: {
		width: '200px',
		'&.Mui-expanded': {
			marginTop: '0px'
		},
		':last-child.Mui-expanded': {
			paddingBottom: theme.spacing(1.5)
		},
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		borderBottom: '1px solid rgba(255, 255, 255, 0.30)',
		':last-child.Mui-expanded': {
			paddingBottom: theme.spacing(1.5)
		},
	}
}));

const StyledFooterStack = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.primaryGreen.main,
	marginTop: theme.spacing(6),
	[theme.breakpoints.down(955)]: {
		width: '100%',
		alignSelf: 'unset'
	}
}));