
import { CheckoutButton, SigupWithGoogle } from "#component/CommonViews.tsx";
import HeaderWithouSearch from "#component/HeaderWithoutSearch.tsx";
import GoogleSvg from "#component/svg/GoogleSvg.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography, styled } from "@mui/material";
import { ChangeEvent, useState } from "react";

type TSignIn = {
	email: string,
	password: string
};
const initialState = {
	email: '',
	password: ''
};
export default function Login() {
	const [fields, setFields] = useState<TSignIn>(initialState);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setFields({
			...fields,
			[field]: e.target.value
		});
	};

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};
	return (
		<Stack>
			<HeaderWithouSearch />
			<StyledStackContent>
				<Stack p={1} gap={3} width={1} maxWidth={'320px'} alignSelf={'center'}>
					<Stack gap={1}>
						<Typography fontFamily={'Alata'} fontSize={'24px'} >Sign In</Typography>
					</Stack>
					<Stack gap={3}>
						<TextField label='Email address' value={fields.email} onChange={handleChange('email')} />
						<FormControl variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={showPassword ? 'text' : 'password'}
								value={fields.password}
								onChange={handleChange('password')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showPassword ? 'hide the password' : 'display the password'
											}
											onClick={handleClickShowPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
						<CheckoutButton $isCurved={false}>
							Sign in to my KoboBasket's Account
						</CheckoutButton>
					</Stack>
					<Stack gap={1} direction={'row'} alignItems={'center'}>
						<span style={{ flexGrow: 1 }}>
							<Divider />
						</span>
						<Typography fontSize={'12px'}>OR Sign in with Google</Typography>
						<span style={{ flexGrow: 1 }}>
							<Divider />
						</span>
					</Stack>

					<SigupWithGoogle>
						<Stack direction={'row'} alignItems={'center'} gap={1}>
							Sign in with Google <GoogleSvg />
						</Stack>
					</SigupWithGoogle>
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