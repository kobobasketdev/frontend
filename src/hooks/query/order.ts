import fetcher from "#hooks/fetcher.ts";
import { queryOptions } from "@tanstack/react-query";

export const getUserDeliveredOrders = (userId: string, page: number) => queryOptions({
	queryKey: ['user-delivered-order', userId, page],
	queryFn: async() => fetcher.get('v1/orders?type=delivered&page='+page+'&limit=6')
});

export const getDeliveredOrderDetails = (orderId: string) => queryOptions({
	queryKey: ['delievered-order-detail', orderId],
	queryFn: async() => fetcher.get('v1/orders/'+orderId)
});

export const addDeliveredOrderItemsToCart = (orderId: string) => queryOptions({
	queryKey: ['add-order-items-to-cart', orderId],
	queryFn: async() => fetcher.get('v1/orders/'+orderId+'/items/to-cart'),
});

export const getUserNewOrders = (userId: string, page: number) => queryOptions({
	queryKey: ['user-new-order', userId, page],
	queryFn: async() => fetcher.get('v1/orders?type=new&page='+page+'&limit=6')
});