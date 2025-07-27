import fetcher from "#hooks/fetcher.ts";
import { queryOptions } from "@tanstack/react-query";

export const getSupportedDeliveryCountries = () => queryOptions({
	queryKey: ['supported-countries'],
	staleTime: 5400000,
	queryFn: async() => fetcher.get('v1/countries')
});

export const getUserLocation = () => queryOptions({
	queryKey: ['user-location'],
	staleTime: 7200000,
	queryFn: async() => fetcher.get('v1/location')
});