import Notifyme from '#page/Notifyme.tsx';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.INTERNAL_NOTIFICATION)({
	component: Notifyme,
});

