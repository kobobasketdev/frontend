import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 80
	},
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@src', replacement: resolve(__dirname, 'src') }
		]
	}
});
