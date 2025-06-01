
import { CheckoutButton, SigupWithGoogle } from "#component/CommonViews.tsx";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useAuthMutation } from "#hooks/mutation/auth.ts";
import { TPasswordError, validatePassword } from "#utils/index.ts";
import { RoutePath } from "#utils/route.ts";
import { validateEmail, validateResetPassword } from "#utils/validation.ts";
import { VisibilityOff, Visibility, Check, Close } from "@mui/icons-material";
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography, styled } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { ChangeEvent, SyntheticEvent, useState } from "react";

type TSignIn = {
	email: string,
	password: string,
	otp: string
};
const initialState = {
	email: '',
	password: '',
	otp: ''
};
export default function ForgotPassword() {
	const [fields, setFields] = useState<TSignIn>(initialState);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [fieldsError, setFieldsError] = useState<{ [x: string]: string[] }>({});
	const [passwordError, setPasswordError] = useState<TPasswordError[]>([]);
	const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
	const { forgotPassword, resetPassword } = useAuthMutation();
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();


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

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const handleResetPassword = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (!isOtpSent) {
			if (!validateEmail(fields.email)) {
				setFieldsError({
					...fieldsError,
					email: []
				});
				return;
			}
			try {
				await forgotPassword.mutateAsync(fields.email);
				setIsOtpSent(true);
			}
			catch {
				enqueueSnackbar(<Alert severity="error">
					Reset password failed. Try again
				</Alert>, {
					anchorOrigin: { horizontal: 'center', vertical: 'top' },
					style: { backgroundColor: '#fdeded', padding: '0px 0px', }
				});
			}
			return;
		}

		const { success, errors } = validateResetPassword({ otp: fields.otp, password: fields.password });
		if (!success) {
			setFieldsError({ ...errors });
			return;
		}
		try {
			await resetPassword.mutateAsync({ token: fields.otp, newPassword: fields.password });
			enqueueSnackbar(<Alert severity="success">
				Password reset complete.
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: 'rgb(237, 247, 237)', padding: '0px 0px', }
			});
			navigate({
				to: RoutePath.LOGIN
			});
		}
		catch {
			enqueueSnackbar(<Alert severity="error">
				Reset password failed. Try again
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};

	const isDisabled = Boolean(passwordError.find(error => !error[0]));

	return (
		<Stack>
			<form>
				<StyledStackContent>
					<Stack p={1} gap={3} width={1} maxWidth={'320px'} alignSelf={'center'}>
						<Stack gap={1}>
							<Typography fontFamily={'Alata'} fontSize={'24px'} >Reset Password</Typography>
						</Stack>
						<Stack gap={3}>
							{
								isOtpSent ?
									<>
										<Typography fontSize={'14px'}>Please enter the OTP sent to your email</Typography>
										<TextField label='OTP' value={fields.otp} onChange={handleChange('otp')} error={Boolean(fieldsError['otp'])} />
										<FormControl variant="outlined" error={Boolean(fieldsError['password'])}>
											<InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
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
									</>
									:
									<TextField label='Email address' value={fields.email} onChange={handleChange('email')} error={Boolean(fieldsError['email'])} />
							}
							<CheckoutButton type="submit" $isCurved={false} onClick={handleResetPassword} $disabledButton={isDisabled} disabled={isDisabled}>
								{isOtpSent ? 'Confirm Password Reset' : 'Reset my password'}
							</CheckoutButton>
						</Stack>
						<SigupWithGoogle onClick={() => navigate({
							to: RoutePath.LOGIN
						})}>
							Back to Sign In
						</SigupWithGoogle>
					</Stack>
				</StyledStackContent>
			</form>
		</Stack>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(12),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(8)
	},
}));

const StyledStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$isPassed'
})<{ $isPassed: boolean }>(({ theme, $isPassed }) => ({
	color: $isPassed ? theme.palette.primaryGreen.main : theme.palette.primaryBlack.disabled,
	fontSize: '14px'
}));