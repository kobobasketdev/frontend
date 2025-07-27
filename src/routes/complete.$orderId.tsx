import Complete from '#page/Complete.tsx';
import { setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/complete/$orderId')({
	beforeLoad: () => {
		store.dispatch(setIsShowheaderContainer(false));
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: Complete,
});

