import { TEmailRegistration } from "#component/types/index.js";
import { z } from 'zod';

const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	isAgreed: z.literal(true)
});
export const validateSignUp = (fields: TEmailRegistration) => {
	const validation = signUpSchema.safeParse(fields);
	return { success: validation.success, errors: validation.error?.formErrors.fieldErrors };
};

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1)
});
export const validateLogin = (fields: { email: string, password: string }) => {
	const validation = loginSchema.safeParse(fields);
	return { success: validation.success, errors: validation.error?.formErrors.fieldErrors };
};

const passwordResetSchema = z.object({
	otp: z.string().min(1),
	password: z.string().min(1)
});

export const validateResetPassword = (fields: { otp: string, password: string }) => {
	const validation = passwordResetSchema.safeParse(fields);
	return { success: validation.success, errors: validation.error?.formErrors.fieldErrors };
};

const shippingAddressSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	province: z.string().min(1),
	city: z.string().optional(),
	postalCode: z.string().optional(),
	phone: z.string().min(1, 'Required'),
	address: z.string().min(1),
	country: z.string().min(1, 'Country is required')
});

type TResidentAddress = z.infer<typeof shippingAddressSchema>;
export type TResidentKey = keyof TResidentAddress;
export const validateResidentialAddress = (fields: TResidentAddress) => {
	const validation = shippingAddressSchema.safeParse(fields);
	return { success: validation.success, errors: validation.error?.formErrors.fieldErrors };
};

export const validateEmail = (email: string) => {
	return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};