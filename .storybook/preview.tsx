import type { Preview } from "@storybook/react";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { Provider } from 'react-redux';
import './index.css';
import React from "react";
import { theme } from '#customtheme';
import { store } from '../src/state-management/store';


const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Story />
				</ThemeProvider>
			</Provider>
		)
	]
};

export default preview;
