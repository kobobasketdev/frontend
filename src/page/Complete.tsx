import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { styled, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "@tanstack/react-router";

export default function Complete() {
	const [redirect, setRedirect] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setRedirect(true);
		}, 2000);
	}, []);


	return (
		<>
			{
				redirect ? <Navigate to="/" /> :
					(
						<StyledStackContent>
							<h2>Payment Complete</h2>
						</StyledStackContent>
					)
			}
		</>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(12),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(8)
	},
}));