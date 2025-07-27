import { Stack, styled, Typography } from "@mui/material";
import { HelpCenterContent } from "./HelpCenter";
import TrackFaqContent from "#component/TrackFaqContent.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";

export default function Faq() {
	return (
		<StyledStackContent alignItems={'center'}>
			<Stack direction={'row'} gap={2} width={'auto'}>
				<TrackFaqContent highlight='faq' />
				<Stack pt={3}>
					<NavStack>
						<Typography fontFamily={'Alata'} pl={.5}>
							HELP CENTER
						</Typography>
						<Typography pl={.5} fontSize={'14px'}>
							Need help with something, We're here to help with all your Questions.
						</Typography>
					</NavStack>
					<HelpCenterContent />
				</Stack>
			</Stack>
		</StyledStackContent>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(15),
	[theme.breakpoints.down(1346)]: {
		paddingTop: theme.spacing(16.4),
	},
	[theme.breakpoints.down(1300)]: {
		paddingTop: theme.spacing(16),
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23.5)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(22),
		'& .track-faq': {
			display: 'none'
		}
	},
	[theme.breakpoints.down(955)]: {
		paddingTop: theme.spacing(22.5)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(19)
	},

}));

const NavStack = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(3),
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