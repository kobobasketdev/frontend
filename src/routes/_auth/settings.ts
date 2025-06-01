import Settings from '#page/Settings.tsx';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.INTERNAL_SETTINGS)({
	component: Settings,
});
