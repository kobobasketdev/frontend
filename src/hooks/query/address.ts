import fetcher from "#hooks/fetcher.ts";
import { queryOptions } from "@tanstack/react-query";

export const getUserRelatedAddress = () => queryOptions({
	queryKey: ['addresses'],
	queryFn: async() => fetcher.get('v1/addresses')
});