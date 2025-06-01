import ProfileHeading from "#component/ProfileHeading.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH } from "#constants.tsx";
import { RoutePath } from "#utils/route.ts";
import { ArrowBackIos, ExpandMore } from "@mui/icons-material";
import { Stack, Box, Typography, styled, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Link } from "@tanstack/react-router";

export default function HelpCenter() {
	return (
		<Stack>
			<StyledStackContent>
				<StyledStack>
					<ProfileHeading activeMenu={2} />
					<PageContainerStack>
						<NavStack gap={2.5} >
							<Box pl={.5}>
								<Link to={RoutePath.PROFILE} style={{ color: 'black', display: "inline-flex", }}>
									<ArrowBackIos /> <Typography >My Profile</Typography>
								</Link>
							</Box>
							<Typography fontFamily={'Alata'} pl={.5}>
								HELP CENTER
							</Typography>
							<Typography pl={.5} fontSize={'14px'}>
								Need help with something, We're here to help with all your Questions.
							</Typography>
						</NavStack>
						<HelpCenterContent />
					</PageContainerStack>
				</StyledStack>
			</StyledStackContent>
		</Stack>
	);
}

export const HelpCenterContent = () => {
	return (
		<ContainerSection>
			<Typography fontWeight={'500'}>Frequently asked Questions</Typography>
			<CustomGrid>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>How long does it take for me to receive my order?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						KoboBasket orders take anywhere from 10 days to 14 days to get delivered anywhere around the globe. Just place your order and leave the rest to us! In the meantime, we will send you realtime updates on the status of your shipment.
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>What type of foodstuff can I find on KoboBasket?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						Items on the shopping list include best-sellers like Crayfish, Palm Oil, Egusi, Garri, Smoked fish, Stockfish, Rice and much more. KoboBasket sources only from the best producers to bring you quality foodstuff at the best price to your doorstep.
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>Can I cancel my order with KoboBasket?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						Yes, you can cancel at anytime before processing begins. Simply go to website to cancel your order.
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>Tell us more about KoboBasket?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						Due to rising cost of foodstuff at African stores near you, KoboBasket was launched to help West Africans in diaspora source foodstuffs directly from Nigeria and ship them directly to their doorstep without having to deal with intermediary suppliers or pay extra clearance fees.
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>Is there a minimum order?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						Yes, the minimum order you can place is 10kg, to put that in context that could be as little as only two or three items!
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>How does the process works?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						When you place an order, our on the ground team picks and packs only the freshest ingredients and ships your order in a single box (or more, depending on your order volume!) directly to your doorstep. You receive direct notification and status updates on the shipment till they arrive to you.
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>Can I make a bulk order?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						Yes, we also accept custom or bulk wholesale orders. Just contact us at <span style={{ color: '#F74C25', fontWeight: '500' }}>info@kobobasket.com</span> with your bulk request on orders of 100kg or more.
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion>
					<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
						<Typography fontSize={'15px'} fontWeight={'500'}>How do I pay for my order?</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ fontSize: '14px', color: 'rgba(27, 31, 38, 0.72)' }}>
						We accept most payment platforms for ease of payment and secure processing. They include Mastercard, Visa Debit and Credit, PayPal and many more.
					</AccordionDetails>
				</StyledAccordion>
			</CustomGrid>
		</ContainerSection>
	);
};

const PageContainerStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingTop: theme.spacing(9),
		'& > div:last-of-type': {
			paddingTop: theme.spacing(),
			paddingBottom: theme.spacing()
		}
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
		gap: theme.spacing(2),
		margin: '0 0',
	}
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
	backgroundColor: '#F2F2F7',
	boxShadow: 'none',
	borderRadius: theme.shape.borderRadius,
	'::before': {
		backgroundColor: 'transparent'
	}
}));

const CustomGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(1, minmax(auto, 450px))',
	gap: theme.spacing(2),
}));

const ContainerSection = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	gap: theme.spacing(2),
	margin: '0 auto',
	maxWidth: '800px',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(1.5),
	paddingBottom: theme.spacing(1),

	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		// maxWidth: '400px',
		paddingLeft: theme.spacing(1.5),
		paddingRight: theme.spacing(1.5),

	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(15),
	gap: theme.spacing(2),
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
		'& p:first-of-type': {
			fontSize: '20px'
		},
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	}
}));