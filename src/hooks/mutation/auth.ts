import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "../fetcher";
import { ICreateAccount, IResidentialAddress, IUser } from "#component/types/index.js";
import { useAppDispatch } from "#state-management/hooks.ts";
import { setAuthToken, setCurrentUser, updateLoginUser, addResidenceAddress, updateResidenceAddress, deleteShippingAddress } from "#state-management/slices/user.slice.ts";



export const useAuthMutation = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const register = useMutation({
		mutationFn: (userInfo: ICreateAccount) => {
			return fetcher.post('v1/register', { ...userInfo });
		},
	});

	const verifyEmail = useMutation({
		mutationFn: (emailVerification: { email: string, otp: string }) => {
			return fetcher.post('v1/verify-email', emailVerification);
		},
		onSuccess: (data) => {
			const authInfo = data.data as { user: IUser, token: string };
			dispatch(setAuthToken(authInfo.token));
			dispatch(setCurrentUser(authInfo.user));
		}
	});

	const resendOTP = useMutation({
		mutationFn: (email: string) => {
			return fetcher.post('v1/resend-otp', { email });
		}
	});

	const loginUser = useMutation({
		mutationFn: (loginData: { email: string, password: string }) => {
			return fetcher.post('v1/login', loginData);
		},
		onSuccess: (data) => {
			const authInfo = data.data as { user: IUser, token: { type: string, token: string } };
			dispatch(setAuthToken(authInfo.token.token));
			dispatch(setCurrentUser(authInfo.user));
		}
	});

	const forgotPassword = useMutation({
		mutationFn: (email: string) => {
			return fetcher.post('v1/forgot-password', { email });
		}
	});

	const resetPassword = useMutation({
		mutationFn: (resetPasswordData: { token: string, newPassword: string }) => {
			return fetcher.post('/v1/reset-password', resetPasswordData);
		}
	});

	const updateProfile = useMutation({
		mutationFn: (userData: IUser) => {
			return fetcher.put('v1/user/profile', userData);
		},
		onSuccess: (_, userData) => {
			console.log(userData, 'data');
			dispatch(updateLoginUser(userData));
		}
	});

	const createNewShippingAddress = useMutation({
		mutationFn: (fields: { address: Omit<IResidentialAddress, 'id'>, isDefault:boolean }) => {
			const { isDefault, address } = fields;
			return fetcher.post('v1/addresses', { address, isDefault });
		},
		onSuccess: (data, addressFields) => {
			const { address } = addressFields;
			const { id: newAddressId, defaultAddressId } = (data.data as { id: string, defaultAddressId: string });
			dispatch(addResidenceAddress({ ...address, id:newAddressId }));
			dispatch(updateLoginUser({ defaultAddressId }));
		}
	});

	const updateShippingAddress = useMutation({
		mutationFn: (fields: { address: Omit<IResidentialAddress, 'id'>, isDefault:boolean, addressId: string }) => {
			const { isDefault, address, addressId } = fields;
			return fetcher.put('v1/addresses/'+addressId, { address, isDefault });
		},
		onSuccess: (data, addressFields) => {
			const { address, addressId } = addressFields;
			const { defaultAddressId } = (data.data as { id: string, defaultAddressId: string });
			dispatch(updateResidenceAddress({ ...address, id:addressId }));
			dispatch(updateLoginUser({ defaultAddressId }));
		}
	});

	const deleteResidentShippingAddress = useMutation({
		mutationFn: (id: string) => {
			return fetcher.delete('v1/addresses/'+id);
		},
		onSuccess: (_, id) => {
			dispatch(deleteShippingAddress(id));
		}
	});

	const addUserNotificationList = useMutation({
		mutationFn: (notificationId: string) => {
			return fetcher.post('v1/users/notification', {
				notificationId
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey:  ['user-notifications']
			});
		}
	});

	const removeUserNotificationList = useMutation({
		mutationFn: (notificationId: string) => {
			return fetcher.delete('v1/users/notification/'+notificationId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey:  ['user-notifications']
			});
		}
	});

	return {
		updateProfile, resetPassword, forgotPassword,
		loginUser, resendOTP, verifyEmail, register,
		createNewShippingAddress, updateShippingAddress,
		deleteResidentShippingAddress,
		addUserNotificationList, removeUserNotificationList
	};
};