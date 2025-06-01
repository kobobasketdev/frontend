import { theme } from "#customtheme.ts";
import { useAuthMutation } from "#hooks/mutations/auth";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectLoginUserFullname, selectLoginUserEmail } from "#state-management/slices/user.slice.ts";
import { Stack, Typography, TextField, Button, styled, Alert } from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";

export const ContactDetails = () => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const { updateProfile } = useAuthMutation();
	const { enqueueSnackbar } = useSnackbar();
	const fullName = useAppSelector(selectLoginUserFullname);
	const [localFullname, setLocalFullname] = useState<string>(fullName);
	const email = useAppSelector(selectLoginUserEmail);

	const handleFullnameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocalFullname(e.target.value);
	};

	const onSubmitChangeName = async () => {
		if (!localFullname.trim()) {
			return;
		}

		const [firstName, ...otherName] = localFullname.split(' ');
		try {
			await updateProfile.mutateAsync({ firstName: firstName || '', lastName: otherName.join(' ') || '' });
			setIsEditable(false);
		}
		catch {
			enqueueSnackbar(<Alert severity="error">
				Could not update account owner name
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};
	return (
		<Stack gap={2} pb={1}>
			<Stack gap={1.5}>
				<Typography color="rgba(0, 0, 0, 0.6)" fontSize={'13px'}>
					Name
				</Typography>
				{
					isEditable ?
						(
							<Stack borderBottom={'1px solid #E5E5EA'} gap={2} pb={2}>
								<Stack gap={1.5}>
									<TextField size="small" placeholder="Fullname" value={localFullname} onChange={handleFullnameChange} />
								</Stack>
								<Stack direction={'row'} gap={1.5}>
									<Button variant="contained" sx={{
										textTransform: 'inherit',
										bgcolor: theme.palette.primaryOrange.main,
										minWidth: 'unset',
									}} onClick={onSubmitChangeName} disabled={!localFullname.trim()}>
										Save
									</Button>

									<Button color="inherit" sx={{
										textTransform: 'inherit',

										minWidth: 'unset',
									}} onClick={() => setIsEditable(false)}>
										Cancel
									</Button>
								</Stack>
							</Stack>
						)
						:
						(
							<Stack
								direction={'row'}
								borderBottom={'1px solid #E5E5EA'}
								alignItems={'center'}
								justifyContent={'space-between'}
								pb={.5}
							>
								<Typography fontSize={'14px'}>
									{fullName}
								</Typography>
								<UnderlineButton size="small" onClick={() => setIsEditable(true)}>
									Edit
								</UnderlineButton>
							</Stack>
						)
				}
			</Stack>
			<Stack gap={1.5}>
				<Typography color="rgba(0, 0, 0, 0.6)" fontSize={'13px'}>
					Email Address
				</Typography>
				<Stack
					direction={'row'}
					borderBottom={'1px solid #E5E5EA'}
					alignItems={'center'}
					justifyContent={'space-between'}
					pb={.5}
				>
					<Typography fontSize={'14px'}>
						{email}
					</Typography>

				</Stack>
			</Stack>
		</Stack>
	);
};

export const UnderlineButton = styled(Button)(({ theme }) => ({
	textTransform: 'inherit',
	textDecoration: 'underline',
	color: theme.palette.primaryOrange.main,
	minWidth: 'unset',
	padding: 0
}));