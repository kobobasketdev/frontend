import { queryClient } from "#hooks/fetcher.ts";
import { searchProductQuery } from "#hooks/query/product";
import { debounce } from "lodash";

export const debouncedSearch = debounce(async (
	{ searchString, category, setIsSearching, setSearchResult }:
	{ 
		searchString: string, 
		category?: number, 
		setIsSearching: (args: boolean) => void, 
		setSearchResult: (args: { id: number, name: string }[] | null) => void 
	}
) => {
	try{
		const result = await queryClient.fetchQuery(searchProductQuery(searchString, category));
		setIsSearching(false);
		setSearchResult(result.data.data);
	}
	catch (e){
		console.log(e);
		setIsSearching(false);
		setSearchResult(null);
	}
}, 1000, {
	trailing: true
});
