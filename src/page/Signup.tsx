
import CreateAccount from "#component/CreateAccount.tsx";
import HeaderWithouSearch from "#component/HeaderWithoutSearch.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Stack, styled } from "@mui/material";

export default function SignUp() {
	return (
		<Stack>
			<HeaderWithouSearch />
			<StyledStackContent>
				<Stack p={1} gap={3} maxWidth={'320px'} alignSelf={'center'}>
					<CreateAccount showHeading />
				</Stack>
			</StyledStackContent>
		</Stack>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(12),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(8)
	},
}));