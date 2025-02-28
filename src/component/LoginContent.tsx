import { Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, styled, TextField, Typography } from "@mui/material";
import { CheckoutButton, SigupWithGoogle } from "./CommonViews";
import GoogleSvg from "./svg/GoogleSvg";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Check, Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { theme } from "#customtheme.ts";
import { Link, useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";

type TEmailRegistration = {
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	isAgreed: boolean
};

type TPasswordError = {
	[x: number]: boolean | string
};

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	isAgreed: false
};

const validatePassword = (password: string) => {
	const error: TPasswordError[] = [];
	error.push([RegExp(/.{8,}/).test(password), '8 or more Characters']);
	error.push([RegExp(/[A-Z]/).test(password), '1 or more Uppercase']);
	error.push([RegExp(/\d/).test(password), '1 or more Number']);
	error.push([RegExp(/\W/).test(password), '1 or more Special Character']);
	return error;
};

export default function LoginContent({ handleEmailPropagate, showHeading = false }: { handleEmailPropagate: (email: string) => void, showHeading?: boolean }) {
	const navigate = useNavigate();
	const [fields, setFields] = useState<TEmailRegistration>(initialState);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<TPasswordError[]>([]);

	const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setFields({
			...fields,
			[field]: e.target.value
		});
		if (field === 'password') {
			const error = validatePassword(e.target.value);
			setPasswordError(error);
		}
	};

	const handledAgreement = (_e: SyntheticEvent, checked: boolean) => {
		setFields({
			...fields,
			isAgreed: checked
		});
	};

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const goToLogin = () => navigate({
		to: RoutePath.LOGIN
	});

	const handleCreateAccount = () => {
		console.log('helo');
		handleEmailPropagate(fields.email);
	};

	const isDisabled = Boolean(passwordError.find(error => !error[0]));
	return (
		<>
			{
				showHeading && <Stack gap={1}>
					<Typography fontFamily={'Alata'} fontSize={'24px'} >Create Account or Login</Typography>
				</Stack>
			}

			<Stack gap={5}>
				<Stack gap={1} pt={1}>
					<Typography>
						Already have an account? Login
					</Typography>
					<CheckoutButton $isCurved={false} onClick={goToLogin}>
						Login to my KoboBasket's Account
					</CheckoutButton>
				</Stack>
				<Stack gap={4}>
					<Stack gap={1}>
						<Typography>
							Don't have an account? Sign Up
						</Typography>
						<Stack gap={2}>
							{/* <TextField label='First name' required value={fields.firstName} onChange={handleChange('firstName')} />
						<TextField label='Last name' required value={fields.lastName} onChange={handleChange('lastName')} /> */}
							<TextField label='Email address' required value={fields.email} onChange={handleChange('email')} />
							<FormControl variant="outlined" required>
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
							{
								fields.password
								&&
								<Stack gap={1}>
									<Typography fontSize={'14px'}>Your password must contain at least</Typography>
									{
										passwordError.map((error, index) => (
											<StyledStack direction={'row'} $isPassed={error[0] as boolean} key={index} gap={1}>
												{
													error[0] ? <Check color="success" fontSize="small" /> : <Close color="disabled" fontSize="small" />
												}
												<Typography>{error[1]}</Typography>
											</StyledStack>
										))
									}
								</Stack>
							}
							<Stack direction={'row'} alignItems={'center'} pt={1}>
								<Checkbox checked={fields.isAgreed} size="large" onChange={handledAgreement} />
								<Typography fontSize={'14px'} >
									By continuing, you agree with KoboBasket's <Link to={RoutePath.HOME} style={{
										fontWeight: '500', color: theme.palette.primaryOrange.main
										,
										textDecoration: 'underline'
									}}>Conditions of use and Privacy Notice</Link>
								</Typography>
							</Stack>
							<CheckoutButton $isCurved={false} disabled={isDisabled} $disabledButton={isDisabled} onClick={handleCreateAccount}>CONTINUE</CheckoutButton>
						</Stack>
					</Stack>
					<SigupWithGoogle>
						<Stack direction={'row'} alignItems={'center'} gap={1}>
							Sign Up with Google <GoogleSvg />
						</Stack>
					</SigupWithGoogle>
				</Stack>
			</Stack>
		</>
	);
}

const StyledStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$isPassed'
})<{ $isPassed: boolean }>(({ theme, $isPassed }) => ({
	color: $isPassed ? theme.palette.primaryGreen.main : theme.palette.primaryBlack.disabled,
	fontSize: '14px'
}));

