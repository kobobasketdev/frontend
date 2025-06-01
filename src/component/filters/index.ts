import { getAllNewProducts, getAllProductsByCategory } from "#hooks/query/product";

export type TFilterSelect = { name: string, id?: number };

export const getCategoryItems = (id?: number) => {
	if(!id) {
		return getAllNewProducts({ page: 1 });
	} 
	return getAllProductsByCategory({ page: 1, productCategory: id });
};