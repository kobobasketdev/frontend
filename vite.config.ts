import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 80,
		host: true
	},
	plugins: [
		react(),
		TanStackRouterVite(),
	],
	resolve: {
		alias: [
			{ find: '@src', replacement: resolve(__dirname, 'src') }
		]
	},
});
