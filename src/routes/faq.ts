import Faq from '#page/Faq.tsx';
import { setActiveMenu, setShowMenu, setIsShowheaderContainer } from '#state-management/slices/active-menu.slice.ts';
import { store } from '#state-management/store.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/faq')({
	beforeLoad: () => {
		store.dispatch(setActiveMenu(-1));
		store.dispatch(setShowMenu(true));
		store.dispatch(setIsShowheaderContainer(true));
			
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	},
	component: Faq,
});
