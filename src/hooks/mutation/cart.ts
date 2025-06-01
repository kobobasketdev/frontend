import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../fetcher';
import { TCreateOrder, TItem } from '#component/types/index.js';
import { TCheckoutOrderSummary } from '#utils/index.ts';

type TCartItem = {
	productId: number,
	variationId: number,
	quantity: number
};

export const useCartMutation = () => {
	const queryClient = useQueryClient();
	const addToCart = useMutation({
		mutationFn: (cartItem: TCartItem) => {
			return fetcher.post('v1/cart', cartItem);
		},
		onSuccess: (data) => {
			const cartProduct = data.data as TItem & { cartItemId: number };
			queryClient.setQueryData(['cart', { id: cartProduct.id }], cartProduct);
		}
	});

	const updateCartItem = useMutation({
		mutationFn: (cartUpdate: { cartItemId: number, quantity: number }) => {
			return fetcher.put('v1/cart', cartUpdate);
		},
		onSuccess: (data) => {
			const cartProduct = data.data as TItem & { cartItemId: number };
			queryClient.setQueryData(['cart', { id: cartProduct.id }], cartProduct);
		}
	});

	const removeCartItem = useMutation({
		mutationFn: (cartItemId: number) => {
			return fetcher.delete('v1/cart/'+cartItemId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] });
		}
	});

	const setCheckoutPayment = useMutation({
		mutationFn: () => {
			return fetcher.post('v1/cart/checkout', { gateway: 'stripe' });
		}
	});

	const checkoutCallback = useMutation({
		mutationFn: (checkoutPaymentComplete: { reference: string, gateway: string }) => {
			return fetcher.post('v1/payments/callback', checkoutPaymentComplete);
		}
	});

	const applyCouponCode = useMutation({
		mutationFn: (couponCode: string) => {
			return fetcher.post('v1/coupons', {
				couponCode
			});
		}
	});

	const createOrderMutation = useMutation({
		mutationFn: (fields: TCreateOrder) => {
			return fetcher.post('v1/order', fields);
		}
	});
	
	return {
		checkoutCallback, setCheckoutPayment, 
		removeCartItem, updateCartItem, addToCart,
		applyCouponCode, createOrderMutation
	};
};