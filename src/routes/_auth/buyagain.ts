import Buyagain from "#page/Buyagain.tsx";
import { RoutePath } from "#utils/route.ts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(RoutePath.INTERNAL_BUYAGAIN)({
	component: Buyagain,
});

