import Order from '#page/Order.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/orders/_orders')({
  component: Order,
})

