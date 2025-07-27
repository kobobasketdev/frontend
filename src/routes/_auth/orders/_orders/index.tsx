import { RoutePath } from '#utils/route.ts';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute(RoutePath.INTERNAL_ORDERS)({
	component: RouteComponent,
});

function RouteComponent() {
	return <Navigate to={RoutePath.DELIVERED_ORDER} />;
}