import { queryClient } from "#hooks/fetcher.ts";
import { searchProduct } from "#hooks/query/product";
import { debounce } from "lodash";

export const debouncedSearch = debounce(async (
	{ searchString, category, setIsSearching, setSearchResult }:
	{ 
		searchString: string, 
		category?: number, 
		setIsSearching: (args: boolean) => void, 
		setSearchResult: (args?: { id: number, name: string }[]) => void 
	}
) => {
	try{
		const result = await queryClient.fetchQuery(searchProduct(searchString, category));
		setIsSearching(false);
		setSearchResult(result.data.items);
	}
	catch{
		setIsSearching(false);
		setSearchResult();
	}
}, 2000, {
	trailing: true
});
