import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { theme } from './customtheme';
import { store } from '#state-management/store.ts';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { SnackbarProvider } from 'notistack';

import { routeTree } from './routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '#hooks/fetcher.ts';
import PageNotFound from '#PageNotFound.tsx';
import { enableMocking } from './__mock__/httpserver';

const router = createRouter({
	routeTree, context: { queryClient },
	notFoundMode: 'root',
	defaultNotFoundComponent: () => <PageNotFound />
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Provider store={store}>
				<SnackbarProvider autoHideDuration={2000}>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider theme={theme}>
							<RouterProvider router={router} />
						</ThemeProvider>
					</QueryClientProvider>
				</SnackbarProvider>
			</Provider>
		</StrictMode>,
	);
});
