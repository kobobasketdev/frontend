
import AccountOTP from "#component/AccountOTP.tsx";
import { CheckoutButton } from "#component/CommonViews.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useAuthMutation } from "#hooks/mutation/auth.ts";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectRouteRedirect } from "#state-management/slices/active-menu.slice.ts";
import { RoutePath } from "#utils/route.ts";
import { validateLogin } from "#utils/validation.ts";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { ChangeEvent, SyntheticEvent, useState } from "react";

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
	const [fieldsError, setFieldsError] = useState<{ [x: string]: string[] }>({});
	const { enqueueSnackbar } = useSnackbar();
	const { loginUser } = useAuthMutation();
	const [showVerify, setShowVerify] = useState<boolean>(false);
	const navigate = useNavigate();
	const routeRedirect = useAppSelector(selectRouteRedirect);

	const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setFields({
			...fields,
			[field]: e.target.value
		});
	};

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const handleLogin = async (e: SyntheticEvent) => {
		e.preventDefault();
		const { success, errors } = validateLogin(fields);
		if (!success) {
			setFieldsError({ ...errors });
			return;
		}

		try {
			await loginUser.mutateAsync({
				email: fields.email,
				password: fields.password,
			});

			navigate({
				to: routeRedirect || RoutePath.PROFILE
			});
		}
		catch (e: unknown) {
			const { message } = (e as AxiosError).response?.data as { message: string };
			if (message === 'Please verify your email before logging in') {
				setShowVerify(true);
				return;
			}
			enqueueSnackbar(<Alert severity="error">
				Login failed {message}. try again
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};

	const handleClearEmail = (_args: string) => {
		console.log(_args);
		setShowVerify(false);
	};
	return (
		<>
			{
				showVerify ?
					<StyledStackContent>
						<Stack alignSelf={'center'}>
							<AccountOTP email={fields.email} handleClearEmail={handleClearEmail} />
						</Stack>
					</StyledStackContent> :
					(
						<Stack>
							<form>
								<StyledStackContent>
									<Stack p={1} gap={3} width={1} maxWidth={'320px'} alignSelf={'center'}>
										<Stack gap={1}>
											<Typography fontFamily={'Alata'} fontSize={'24px'} >Sign In</Typography>
										</Stack>
										<Stack gap={3}>
											<TextField label='Email address' value={fields.email} onChange={handleChange('email')} error={Boolean(fieldsError['email'])} />
											<FormControl variant="outlined" error={Boolean(fieldsError['password'])}>
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
											<Link to={RoutePath.FORGOTPASSWORD} style={{ fontSize: '14px', color: '#3d8cf3', fontWeight: 'normal' }}>
												Forgot password
											</Link>
											<CheckoutButton type="submit" $isCurved={false} onClick={handleLogin}>
												Sign in to my KoboBasket's Account
											</CheckoutButton>
										</Stack>
										{/* <Stack gap={1} direction={'row'} alignItems={'center'}>
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
						</SigupWithGoogle> */}
									</Stack>
								</StyledStackContent>
							</form>
						</Stack>
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