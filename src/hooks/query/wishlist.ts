import { queryOptions } from "@tanstack/react-query";
import fetcher from "../fetcher";

export const viewWishlist = () => queryOptions({
	queryKey: ['wishlist'],
	queryFn: async () => {
		return fetcher.get('v1/wishlist');
	}
});