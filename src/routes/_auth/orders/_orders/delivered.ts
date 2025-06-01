import DeliveredOrder from '#component/DeliveredOrder.tsx'
import { RoutePath } from '#utils/route.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(RoutePath.INTERNAL_DELIVERED_ORDER)({
  component: DeliveredOrder,
})
