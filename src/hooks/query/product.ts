import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import fetcher from "../fetcher";

export const getAllProducts= ({
	page = 1
} : {
	page: number
}) => queryOptions({
	queryKey: ['all-product',  page ],
	queryFn: async() => {
		return fetcher.get(`v1/products?page=${page}&limit=40`);
	},
	staleTime: 5400000,
	placeholderData: keepPreviousData
});

export const getAllProductsByCategory = ({
	page = 1, productCategory = 1, 
	price, weight, isPromotion
} : {
	page: number, productCategory: number,
	price?: string, weight?: string, isPromotion?: boolean
}) => {
	if(isPromotion) {
		return queryOptions({
			queryKey: ['promotion', page, productCategory, { price, weight }],
			queryFn: async() =>  fetcher.get(`v1/promotions?page=${page}&limit=40&productCategory=${productCategory}&price=${price}&weight=${weight}`),
			staleTime: 5400000,
			placeholderData: keepPreviousData
		});
	}
	else {
		return queryOptions({
			queryKey: ['product', page, productCategory, { price, weight }],
			queryFn: async() =>  fetcher.get(`v1/products?page=${page}&limit=40&productCategory=${productCategory}&price=${price}&weight=${weight}`),
			staleTime: 5400000,
			placeholderData: keepPreviousData
		});
	};

	
};

export const getAllNewProducts = ({
	page = 1, price, weight
} : {
	page: number, price?: string, weight?: string
}) => queryOptions({
	queryKey: ['new-product', page, { price, weight } ],
	queryFn: async() => {
		return fetcher.get(`v1/products/recent?page=${page}&limit=40&price=${price}&weight=${weight}`);
	},
	staleTime: 5400000,
	placeholderData: keepPreviousData
});

export const getAllCategories = () => queryOptions({
	queryKey: ['all-categories'],
	queryFn: async () => fetcher.get('v1/categories'),
	staleTime: 7200000,
	placeholderData: keepPreviousData
});

export const getProductById = ({ productId }: { productId: number }) => queryOptions({
	queryKey: ['product-detail',  productId ],
	queryFn: async() => {
		return fetcher.get('v1/products/'+productId);
	}
});

export const getProductReviews = ({
	productId, page, filterBy, sortBy
}: {
	productId: number, page: number, filterBy?: string | number, sortBy?: string
}) => queryOptions({
	queryKey: ['product-review', productId, page, { filterBy, sortBy }],
	queryFn: async() => fetcher.get('v1/products/'+productId+'/reviews?page='+page+'&limit=10&filterBy='+filterBy+'&sortBy='+sortBy)
});

export const getBestSeller = (categoryId = 'all') => queryOptions({
	queryKey: ['best-sellers', categoryId],
	queryFn: async () => {
		return fetcher.get('v1/products/best-sellers?limit=40&category='+categoryId);
	}
});

export const getFrequentlyBought = (categoryId = 'all') => queryOptions({
	queryKey: ['frequently-bought', categoryId],
	queryFn: async () => {
		return fetcher.get('v1/products/frequently-bought?limit=40&category='+categoryId);
	}
});

export const searchProduct = (search: string, categoryId?: number) => queryOptions({
	queryKey: ['search-product', search, { categoryId } ],
	queryFn: async () => {
		return fetcher.get('v1/products/search?query='+search+'&category='+categoryId);
	}
});