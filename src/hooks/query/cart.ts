import { queryOptions } from "@tanstack/react-query";
import fetcher from "../fetcher";

export const viewCart = () => queryOptions({
	queryKey: ['cart'],
	queryFn: async () => {
		return fetcher.get('v1/cart');
	}
});