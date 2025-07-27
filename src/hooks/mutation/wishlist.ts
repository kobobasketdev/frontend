import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "../fetcher";

export const useWishlistMutation = () => {
	const queryClient = useQueryClient();
	const addToWishlist = useMutation({
		mutationFn: (productId: string) => {
			return fetcher.post('v1/wishlist/add', { productId });
		},
		onSuccess: (_, productId) => {
			queryClient.setQueryData(['wishlist-ids'], (oldWishlistIds: string[]) => {
				const newData = [...oldWishlistIds, productId+''];
				return newData;
			});
			// queryClient.invalidateQueries({ queryKey: ['wishlist'] });
		}
	});

	const removeFromWishlist = useMutation({
		mutationFn: (productId: string) => {
			return fetcher.delete('v1/wishlist/'+productId);
		},
		onSuccess: (_, productId) => {
			queryClient.setQueryData(['wishlist-ids'], (oldWishlistIds: string[]) => {
				const newData = oldWishlistIds.filter(wishlistId => wishlistId !== productId+'');
				return newData;
			});
			// queryClient.invalidateQueries({ queryKey: ['wishlist'] });
		}
	});

	return { removeFromWishlist, addToWishlist };
};