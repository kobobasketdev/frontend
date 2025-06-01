
import CreateAccount from "#component/CreateAccount.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectLoginUserEmail } from "#state-management/slices/user.slice.ts";
import { RoutePath } from "#utils/route.ts";
import { Stack, styled } from "@mui/material";
import { Navigate } from "@tanstack/react-router";

export default function SignUp() {
	const currentUserEmail = useAppSelector(selectLoginUserEmail);

	if (currentUserEmail) {
		return <Navigate to={RoutePath.PROFILE} />;
	}
	return (
		<Stack>
			<StyledStackContent>
				{
					currentUserEmail ?
						<>Hello {currentUserEmail}</> :
						<ContainerStack p={1} gap={3} alignSelf={'center'}>
							<CreateAccount showHeading />
						</ContainerStack>
				}
			</StyledStackContent>
		</Stack>
	);
}

const ContainerStack = styled(Stack)(({ theme }) => ({
	maxWidth: '400px',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		maxWidth: '320px'
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(12),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(8)
	},
}));