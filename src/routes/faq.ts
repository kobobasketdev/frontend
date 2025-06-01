import Faq from '#page/Faq.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/faq')({
	component: Faq,
});
