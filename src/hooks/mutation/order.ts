import fetcher from "#hooks/fetcher.ts";
import { useMutation } from "@tanstack/react-query";

export const useOrderMutation = () => {
	// const queryClient = useQueryClient();

	const addReview = useMutation({
		mutationFn: (fields: { orderId: string, productId: string, rating: number, title: string, comment: string, photos: File[] }) => {
			const { orderId, productId, ...otherFields } = fields;
			return fetcher.post('v1/orders/'+orderId+'/items/'+productId+'/review', {
				...otherFields
			},
			{
				headers: {
					"Content-Type": 'multipart/form-data'
				}
			});
		},
		// onSuccess: (_, fields) => {
		// 	const { orderId, productId } = fields;
		// 	queryClient.setQueryData(['delievered-order-detail', orderId], (oldData) => {
		// 		const itemReviewed = oldData.orderItems.find(item => item.id === productId);
		// 		itemReviewed.isReviewed = true;
		// 		return { ...oldData };
		// 	});
		// }
	});

	const cancelOrder = useMutation({
		mutationFn: (orderId: string) => {
			return fetcher.delete('v1/orders/'+orderId+'/cancel');
		}
	});

	const addDeliveredItemToCart = useMutation({
		mutationFn: (orderId: string) => {
			return fetcher.post('v1/orders/'+orderId+'/items/to-cart');
		}
	});
	return {
		addReview, cancelOrder, addDeliveredItemToCart
	};
};