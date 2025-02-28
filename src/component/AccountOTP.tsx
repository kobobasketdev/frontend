import { Button, Stack, styled, TextField, Typography } from "@mui/material";
import { CheckoutButton } from "./CommonViews";
import { theme } from "#customtheme.ts";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "#state-management/hooks.ts";
import { updateShowCheckoutSignin } from "#state-management/slices/cart.slice.ts";

export default function AccountOTP({ type, email, handleClearEmail }: { type: 'login' | 'signup', email: string, handleClearEmail: (email: string) => void }) {
	const [otp, setOTP] = useState<string[]>([]);
	const dispatch = useAppDispatch();
	const otp1 = useRef<HTMLInputElement | null>(null);
	const otp2 = useRef<HTMLInputElement | null>(null);
	const otp3 = useRef<HTMLInputElement | null>(null);
	const otp4 = useRef<HTMLInputElement | null>(null);

	const otpRefArray = [otp1, otp2, otp3, otp4];

	const handleOTPChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
		const otpValue = e.target.value.trim();
		const newValue = [...otp];
		let nextIndex = index;


		if (otpValue.length > 1) {
			const otpArray = otpValue.split('');
			for (let i = 0; i < 4; ++i) {
				newValue[i] = otpArray[i];
			}
			nextIndex = -1;
		}
		else {
			newValue[index] = otpValue;
			nextIndex = index < 4 ? (index + 1) : -1;
		}
		setOTP(newValue);

		if (nextIndex >= 0) {
			otpRefArray[index].current?.getElementsByTagName('input')[0].blur();
			otpRefArray[nextIndex].current?.getElementsByTagName('input')[0].focus();
		}
	};

	const isDisabled = otp.length < 4 || otp.includes('');

	const handleChangeEmail = () => {
		handleClearEmail('');
	};

	const handleVerify = () => {
		console.log(type);
		dispatch(updateShowCheckoutSignin(false));
	};
	return (
		<Stack>
			<StyledStackContent>
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
							Please enter the 4 digit code here
						</Typography>
						<Stack direction={'row'} gap={1}>
							{
								Array(4).fill('').map((_value, index) => (
									<TextField
										type="number"
										sx={{ 'input': { textAlign: 'center', fontSize: '20px' } }}
										ref={otpRefArray[index]}
										key={index}
										value={otp[index]}
										onChange={handleOTPChange(index)}
									/>
								))
							}
						</Stack>
						<ResendOTP />
					</Stack>
					<CheckoutButton onClick={handleVerify} $isCurved={false} disabled={isDisabled} $disabledButton={isDisabled}>
						VERIFY
					</CheckoutButton>
				</Stack>
			</StyledStackContent>
		</Stack>
	);
}

const ResendOTP = memo(() => {
	const [allowResend, setAllowResend] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(30);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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