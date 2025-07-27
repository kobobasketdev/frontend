import NewOrder from '#component/NewOrder.tsx';
import { RoutePath } from '#utils/route.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.INTERNAL_NEW_ORDER)({
	component: NewOrder,
});
