import CreateAccount from "#component/CreateAccount.tsx";
import GuestCheckout from "#component/GuestCheckout.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { Stack, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

export default function CheckoutSignIn() {
	const [value, setValue] = useState<string>('guest');

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		if (newAlignment) {
			setValue(newAlignment);
		}
	};
	return (
		<Stack>
			<StyledStackContent>
				<ContainerStack p={1} gap={3} alignSelf={'center'}>
					<Stack gap={1}>
						<Typography fontFamily={'Alata'} fontSize={'24px'}>Guest Checkout or Login</Typography>
						<Typography fontSize={'14px'}>Please choose how you want to checkout your items</Typography>
					</Stack>
					<ToggleButtonGroup
						value={value}
						exclusive onChange={handleChange}
						size="small"
						fullWidth>
						<StyledToggleButton value={'guest'} >
							Guest Checkout
						</StyledToggleButton>
						<StyledToggleButton value={'account'}>
							Login/Sign Up
						</StyledToggleButton>
					</ToggleButtonGroup>
					{
						value == 'guest' ?
							<GuestCheckout />
							:
							<CreateAccount />
					}
				</ContainerStack>
			</StyledStackContent>
		</Stack>
	);
}

const ContainerStack = styled(Stack)(({ theme }) => ({
	width: '450px',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		maxWidth: '320px'
	}
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
	textTransform: 'inherit',
	'&.Mui-selected, &.Mui-selected:hover': {
		backgroundColor: theme.palette.primaryGreen.light,
		borderColor: theme.palette.primaryGreen.main,
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(12),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(8)
	},
}));