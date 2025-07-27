import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetcher from '../fetcher';
import { TItem, TProductCategory } from '#component/types/index.js';


type TCreateProduct = Omit<TItem, 'images'> & { images: FileList | null };
export const useProductMutations = () => {
	const queryClient = useQueryClient();
	const createProductCategory = useMutation({
		mutationFn: (category: TProductCategory) => {
			return fetcher.post('v1/categories', category);
		}
	});

	const updateProductCategory = useMutation({
		mutationFn: (category: Partial<TProductCategory> & { categoryId: number }) => {
			const { categoryId, ...otherCategoryDetails } = category;
			return fetcher.put('v1/categories/'+categoryId, otherCategoryDetails);
		}
	});

	const deleteProductCategory = useMutation({
		mutationFn: (categoryId: number ) => {
			return fetcher.delete('v1/categories/'+categoryId);
		}
	});

	const createProduct = useMutation({
		mutationFn: (product: TCreateProduct ) => {
			return fetcher.post('v1/products', product, {
				headers: {
					"Content-Type": 'multipart/form-data'
				}
			} );
		}
	});

	const updateProduct = useMutation({
		mutationFn: (product: Partial<TCreateProduct>) => {
			return fetcher.put('v1/products/'+product.id, product,{
				headers: {
					"Content-Type": 'multipart/form-data'
				}
			});
		},
		onSuccess: (data) => {
			const updatedProduct = data.data as TItem;
			queryClient.setQueryData(['product', { id: updatedProduct.id }], updatedProduct);
		}
	});

	const deleteProduct = useMutation({
		mutationFn: (productId: number) => {
			return fetcher.delete('v1/products/'+productId);
		}
	});

	return {
		deleteProduct, updateProduct, createProduct, 
		deleteProductCategory, updateProductCategory,
		createProductCategory, 
	};
};