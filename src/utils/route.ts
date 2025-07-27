import type { QueryClient } from "@tanstack/react-query";

export const RoutePath = {
	HOME: '/',
	CATEGORY: '/category/$category',
	PRODUCT_DISPLAY: '/products/$details',
	WISHLIST: '/wishlist',
	INTERNAL_MOBILEREVIEW: '/products_/review/$details',
	MOBILEREVIEW: '/products/review/$details',
	CART: '/cart',
	CHECKOUT: '/checkout',
	LOGIN: '/login',
	SIGNUP: '/signup',
	FORGOTPASSWORD: '/forgot-password',
	PROFILE: '/profile',
	BUYAGAIN: '/buyagain',
	NOTIFICATION: '/notification',
	SETTINGS: '/settings',
	ORDERS: '/orders',
	DELIVERED_ORDER: '/orders/delivered',
	NEW_ORDER: '/orders/neworder',
	DELIVERED_ORDER_ITEM: '/orders/delivered/$orderId',
	HELP_CENTER: '/help',
	//INTERNAL ROUTES
	INTERNAL_SETTINGS: '/_auth/settings',
	INTERNAL_NOTIFICATION: '/_auth/notification',
	INTERNAL_PROFILE: '/_auth/profile',
	INTERNAL_BUYAGAIN: '/_auth/buyagain',
	INTERNAL_ORDERS: '/_auth/orders/_orders/',
	INTERNAL_DELIVERED_ORDER: '/_auth/orders/_orders/delivered',
	INTERNAL_NEW_ORDER: '/_auth/orders/_orders/neworder',
	INTERNAL_DELIVERED_ITEM: '/_auth/orders/delivered/$orderId',
	INTERNAL_HELP_CENTER: '/_auth/help'
} as const;



export type TQueryClient = QueryClient;
export interface RouterContext {
	queryClient: TQueryClient
}