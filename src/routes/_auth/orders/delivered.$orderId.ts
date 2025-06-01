import DeliveredOrderItem from '#page/DeliveredOrderItem.tsx'
import { RoutePath } from '#utils/route.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  RoutePath.INTERNAL_DELIVERED_ITEM
)({
  component: DeliveredOrderItem,
})
