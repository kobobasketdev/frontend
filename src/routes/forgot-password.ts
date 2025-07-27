import ForgotPassword from '#page/ForgotPassword.tsx';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.FORGOTPASSWORD)({
	component: ForgotPassword,
});

