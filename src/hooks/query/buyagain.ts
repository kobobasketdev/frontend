import fetcher from "#hooks/fetcher.ts";
import { queryOptions } from "@tanstack/react-query";

export const getUserBuyagain = (page: number) => queryOptions({
	queryKey: ['user-buyagain', page],
	queryFn: async() => fetcher.get('v1/buyagain?page='+page+'&limit=10')
});

export const searchUserBuyagain = (userId: string, search: string) => queryOptions({
	queryKey: ['search-user-buyagain', userId, search],
	queryFn: async() => fetcher.get('v1/buyagain?search='+search)
});