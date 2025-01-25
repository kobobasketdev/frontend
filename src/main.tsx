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

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

  
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<SnackbarProvider>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</SnackbarProvider>
		</Provider>
	</StrictMode>,
);
