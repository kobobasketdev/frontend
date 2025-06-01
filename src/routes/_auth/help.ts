import HelpCenter from '#page/HelpCenter.tsx'
import { RoutePath } from '#utils/route.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(RoutePath.INTERNAL_HELP_CENTER)({
  component: HelpCenter,
})
