import { queryOptions } from "@tanstack/react-query";
import fetcher from "../fetcher";

export const getWishlistItem = (page: number) => queryOptions({
	queryKey: ['wishlist', page],
	queryFn: async () => {
		return fetcher.get('v1/wishlist?page='+page+'&limit=40');
	}
});

export const getWishlistItemIds = () => queryOptions({
	queryKey: ['wishlist-ids'],
	queryFn: async() => fetcher.get('v1/wishlist/ids'),
	staleTime: 12000000
});
