import fetcher from "#hooks/fetcher.ts";
import { queryOptions } from "@tanstack/react-query";

export const getSupportedDeliveryCountries = () => queryOptions({
	queryKey: ['supported-countries'],
	queryFn: async() => fetcher.get('v1/supported-country')
});

export const getUserLocation = () => queryOptions({
	queryKey: ['user-location'],
	queryFn: async() => fetcher.get('v1/user-location')
});