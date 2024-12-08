import type { Preview } from "@storybook/react";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import './index.css';
import React from "react";
import { theme } from '#customtheme';


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
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Story />
			</ThemeProvider>
		)
	]
};

export default preview;
