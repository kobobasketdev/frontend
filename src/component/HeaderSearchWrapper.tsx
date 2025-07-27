import { debouncedSearch } from "#utils/libs.ts";
import { useState } from "react";
import HeaderSearch from "./HeaderSearch";

export default function HeaderSearchWrapper() {
	const [searchResult, setSearchResult] = useState<{ id: number, name: string }[] | null>([]);
	const [isSearching, setIsSearching] = useState<boolean>(true);
	const onSearchDispatch = async ({ searchString, category }: { searchString: string, category?: number }) => {
		setIsSearching(true);
		if (!searchString) {
			setIsSearching(false);
			setSearchResult([]);
			return;
		}

		debouncedSearch({ searchString, category, setIsSearching, setSearchResult });
	};

	return (
		<HeaderSearch
			showAdornment
			showDropdown
			shouldSearchOnType
			onSearch={onSearchDispatch}
			searchResult={searchResult}
			showSearchList
			isSearching={isSearching}
		/>

	);
};