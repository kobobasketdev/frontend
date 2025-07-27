import fetcher from "#hooks/fetcher.ts";
import { queryOptions } from "@tanstack/react-query";

export const getUserNotificationList = () => queryOptions({
	queryKey: ['user-notifications'],
	queryFn: async() => fetcher.get('v1/users/notification/')
});

export const getAppNotifications = () => queryOptions({
	queryKey: ['notifications'],
	queryFn: async() => fetcher.get('v1/notifications')
});