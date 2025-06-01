import { Alert, Button, Stack, styled, TextField, Typography } from "@mui/material";
import { CheckoutButton } from "./CommonViews";
import { theme } from "#customtheme.ts";
import { ChangeEvent, memo, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "#state-management/hooks.ts";
import { useAuthMutation } from "#hooks/mutation/auth.ts";
import { useSnackbar } from "notistack";
import { selectRouteRedirect } from "#state-management/slices/active-menu.slice.ts";
import { RoutePath } from "#utils/route.ts";
import { useNavigate } from "@tanstack/react-router";

export default function AccountOTP({ email, handleClearEmail }: { email: string, handleClearEmail: (email: string) => void }) {
	const [otp, setOTP] = useState<string[]>([]);
	const navigate = useNavigate();
	const routeRedirect = useAppSelector(selectRouteRedirect);
	const { verifyEmail } = useAuthMutation();
	const { enqueueSnackbar } = useSnackbar();
	const otp1 = useRef<HTMLInputElement | null>(null);
	const otp2 = useRef<HTMLInputElement | null>(null);
	const otp3 = useRef<HTMLInputElement | null>(null);
	const otp4 = useRef<HTMLInputElement | null>(null);
	const otp5 = useRef<HTMLInputElement | null>(null);
	const otp6 = useRef<HTMLInputElement | null>(null);

	const otpRefArray = [otp1, otp2, otp3, otp4, otp5, otp6];

	const handleOTPChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
		const otpValue = e.target.value.trim();
		const newValue = [...otp];
		let nextIndex = index;

		if (isNaN(Number(otpValue))) {
			return;
		}


		if (otpValue.length > 1) {
			const otpArray = otpValue.split('');
			let i = 0;
			for (; i < Math.min(otpValue.length, 6); ++i) {
				newValue[i] = otpArray[i];
			}
			nextIndex = i < 6 ? i : -1;
		}
		else {
			newValue[index] = otpValue;
			nextIndex = index < 6 ? (index + 1) : -1;
		}
		setOTP(newValue);

		otpRefArray[index].current?.getElementsByTagName('input')[0].blur();
		if (nextIndex >= 0 && nextIndex < 6) {
			otpRefArray[nextIndex].current?.getElementsByTagName('input')[0].focus();
		}
	};

	const isDisabled = otp.length < 6 || otp.includes('');

	const handleChangeEmail = () => {
		handleClearEmail('');
	};

	const handleVerify = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			await verifyEmail.mutateAsync({ email, otp: otp.join('') });
			navigate({
				to: routeRedirect || RoutePath.HOME
			});
		}
		catch {
			enqueueSnackbar(<Alert severity="error">
				OTP verification failed
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};
	return (
		<Stack>
			<StyledStackContent>
				<form>
					<Stack p={1} gap={3} width={1} maxWidth={'320px'} alignSelf={'center'}>
						<Stack gap={1}>
							<Typography fontFamily={'Alata'} textAlign={'center'} fontSize={'24px'} >OTP Verification</Typography>
							<Typography fontSize={'14px'} color="rgba(27, 31, 38, 0.72)">We're sending you an OTP to verify your Email.</Typography>
							<Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'}>
								<Typography fontWeight={'600'} width={1} sx={{ wordWrap: 'break-word' }}>{email}</Typography>
								<Button variant="text" onClick={handleChangeEmail} sx={{
									color: theme.palette.primaryOrange.main,
									textDecoration: 'underline',
									fontSize: '12px',
									textTransform: 'inherit',
									paddingLeft: 0
								}}>
									Edit Email address
								</Button>

							</Stack>
						</Stack>
						<Stack gap={1} alignItems={'center'}>
							<Typography fontSize={'14px'} color="rgba(27, 31, 38, 0.72)">
								Please enter the 6 digit code here
							</Typography>
							<Stack direction={'row'} gap={1}>
								{
									Array(6).fill('').map((_value, index) => (
										<TextField
											sx={{ 'input': { textAlign: 'center', fontSize: '20px' } }}
											ref={otpRefArray[index]}
											key={index}
											size="small"
											value={otp[index] || ''}
											onChange={handleOTPChange(index)}
										/>
									))
								}
							</Stack>
							<ResendOTP email={email} />
						</Stack>
						<CheckoutButton type="submit" onClick={handleVerify} $isCurved={false} disabled={isDisabled} $disabledButton={isDisabled}>
							VERIFY
						</CheckoutButton>
					</Stack>
				</form>
			</StyledStackContent>
		</Stack>
	);
}

const ResendOTP = memo(({ email }: { email: string }) => {
	const [allowResend, setAllowResend] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(30);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const { resendOTP } = useAuthMutation();

	const startTimer = () => {
		if (timerRef.current && timer <= 0) {
			clearInterval(timerRef.current);
			timerRef.current = null;
			setAllowResend(true);
			return;
		}

		timerRef.current = setTimeout(() => {
			const newTimer = timer - 1;
			setTimer(newTimer);
		}, 1000);
	};

	const handleResend = () => {
		setTimer(30);
		setAllowResend(false);
		clearInterval(timerRef.current!);
		resendOTP.mutateAsync(email);
	};

	useEffect(startTimer, [timer]);

	return (
		<Button variant="text" onClick={handleResend} disabled={!allowResend} sx={{
			color: theme.palette.primaryOrange.main,
			textDecoration: 'underline',
			fontSize: '14px',
			textTransform: 'inherit'
		}}
		>
			Resend code {
				timerRef.current && `(${timer})`
			}
		</Button>
	);
});
const StyledStackContent = styled(Stack)(() => ({
}));