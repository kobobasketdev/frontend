import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "../fetcher";

export const useWishlistMutation = () => {
	const queryClient = useQueryClient();
	const addToWishlist = useMutation({
		mutationFn: (productId: number) => {
			return fetcher.post('v1/wishlist/add', { productId });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wishlist'] });
		}
	});

	const removeFromWishlist = useMutation({
		mutationFn: (productId: number) => {
			return fetcher.delete('v1/wishlist/'+productId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wishlist'] });
		}
	});

	return { removeFromWishlist, addToWishlist };
};