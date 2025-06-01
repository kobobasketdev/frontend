import { store } from '#state-management/store.ts';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const env = import.meta.env;
const token = store.getState().user.token;

export const queryClient = new QueryClient();
const fetcher = axios.create({
	baseURL: env.VITE_URL_ENDPOINT,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${token}`
	}
	
});

export default fetcher;