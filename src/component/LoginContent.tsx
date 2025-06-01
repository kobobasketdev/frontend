import { Alert, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, styled, TextField, Typography } from "@mui/material";
import { CheckoutButton, SigupWithGoogle } from "./CommonViews";
import GoogleSvg from "./svg/GoogleSvg";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Check, Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { theme } from "#customtheme.ts";
import { Link, useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import { TPasswordError, validatePassword } from "#utils/index.ts";
import { TEmailRegistration } from "./types";
import { validateSignUp } from "#utils/validation.ts";
import { useSnackbar } from "notistack";
import { useAuthMutation } from "#hooks/mutation/auth.ts";
import { useAppDispatch } from "#state-management/hooks.ts";
import { setRouteRedirect } from "#state-management/slices/active-menu.slice.ts";

const initialState = {
	email: '',
	password: '',
	isAgreed: false
};



export default function LoginContent({
	handleEmailPropagate, showHeading = false,
}: {
	handleEmailPropagate: (email: string) => void, showHeading?: boolean,
}) {
	const navigate = useNavigate();
	const [fields, setFields] = useState<TEmailRegistration>(initialState);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<TPasswordError[]>([]);
	const [fieldsError, setFieldsError] = useState<{ [x: string]: string[] }>({});
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { register } = useAuthMutation();


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
		if (checked) {
			setFieldsError({});
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const goToLogin = () => {
		if (location.pathname.includes(RoutePath.CHECKOUT)) {
			dispatch(setRouteRedirect(RoutePath.CHECKOUT));
		}
		navigate({
			to: RoutePath.LOGIN
		});
	};

	const handleCreateAccount = async (e: SyntheticEvent) => {
		e.preventDefault();
		const { success, errors } = validateSignUp(fields);
		if (!success) {
			setFieldsError({ ...errors });
			return;
		}

		if (location.pathname.includes(RoutePath.CHECKOUT)) {
			dispatch(setRouteRedirect(RoutePath.CHECKOUT));
		}

		try {
			await register.mutateAsync({
				email: fields.email,
				password: fields.password,
				type: 'user'
			});
			handleEmailPropagate(fields.email);
		}
		catch {
			enqueueSnackbar(<Alert severity="error">
				Account creation failed. try again
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};

	const isDisabled = Boolean(passwordError.find(error => !error[0]));
	return (
		<>
			{
				showHeading && <Stack gap={1}>
					<Typography fontFamily={'Alata'} fontSize={'24px'} >Create Account or Login</Typography>
				</Stack>
			}

			<Stack gap={5} maxWidth={'380px'} alignSelf={'center'}>
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
						<form>
							<Stack gap={2} pt={1}>
								<TextField name="email" label='Email address' required value={fields.email} onChange={handleChange('email')} error={Boolean(fieldsError['email'])} />
								<FormControl variant="outlined" required error={Boolean(fieldsError['password'])}>
									<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
									<OutlinedInput
										name="password"
										required
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
									<Checkbox name="isAgreed" checked={fields.isAgreed} size="medium" onChange={handledAgreement} slotProps={{
										root: {
											sx: {
												'svg': {
													fill: fieldsError['isAgreed'] && '#d32f2f'
												}
											}
										}
									}} />
									<Typography fontSize={'14px'} >
										By continuing, you agree with KoboBasket's <Link to={RoutePath.HOME} style={{
											fontWeight: '500', color: theme.palette.primaryOrange.main
											,
											textDecoration: 'underline'
										}}>Conditions of use and Privacy Notice</Link>
									</Typography>
								</Stack>
								<CheckoutButton type="submit" $isCurved={false} disabled={isDisabled} $disabledButton={isDisabled} onClick={handleCreateAccount}>CONTINUE</CheckoutButton>
							</Stack>
						</form>
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

