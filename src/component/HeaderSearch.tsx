import { Box, FormControl, IconButton, InputAdornment, List, ListItem, ListItemButton, OutlinedInput, Skeleton, Stack, styled } from "@mui/material";
import SearchIconSvg from "./svg/SearchSvg";
import SearchDropdown from "./SearchDropdown";
import { ChangeEvent, useState } from "react";
import { MEDIUM_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import { CategorySelection } from "./types";

export default function HeaderSearch({
	showAdornment,
	placeholder = 'What are you looking for?',
	showDropdown,
	showSearchList,
	searchResult,
	isSearching,
	shouldSearchOnType = false,
	onSearch
}: {
	showAdornment?: boolean,
	searchResult: { id: number, name: string }[] | null,
	placeholder?: string,
	showDropdown?: boolean,
	showSearchList?: boolean,
	isSearching?: boolean,
	shouldSearchOnType?: boolean,
	onSearch: (args: { searchString: string, category?: number }) => void
}) {
	const [searchProduct, setSearchProduct] = useState<string>('');
	const [dropdownSelection, setDropdownSelection] = useState<CategorySelection>({
		id: 0,
		name: 'All categories'
	});


	const navigate = useNavigate();
	const customDropdownSelection = (value: CategorySelection) => {
		setDropdownSelection(value);
		setSearchProduct('');
	};
	const handleClickSearchProduct = () => {
		// Todo send search query 
		onSearch({ searchString: searchProduct, category: dropdownSelection.id });
		console.log('search product');
	};

	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchProduct(event.target.value);
		if (shouldSearchOnType) {
			onSearch({ searchString: event.target.value, category: dropdownSelection.id });
		}
	};

	const handleGotoProduct = (productId: number) => () => {
		setSearchProduct('');
		navigate({
			to: RoutePath.PRODUCT_DISPLAY,
			params: { details: '' + productId }
		});
	};

	const handleSeeMoreSearchProduct = () => {
		setSearchProduct('');
		navigate({
			to: RoutePath.CATEGORY,
			params: { category: '' + dropdownSelection.name }
		});
	};

	let searchListContent = null;

	if (isSearching) {
		searchListContent = <>
			<ListItem>
				<Skeleton sx={{ width: '100%' }}></Skeleton>
			</ListItem>
			<ListItem>
				<Skeleton sx={{ width: '100%' }}></Skeleton>
			</ListItem>
		</>;
	}
	else if (searchResult === null) {
		searchListContent = <ListItem>Something went wrong!!</ListItem>;
	}
	else if (searchResult && searchResult.length > 0) {
		searchListContent = <>
			{
				searchResult.slice(0, 6).map(result => (
					<ListItem disableGutters key={result.id}>
						<StyledSearchLink onClick={handleGotoProduct(result.id)}>
							{result.name}
						</StyledSearchLink>
					</ListItem>
				))
			}

		</>;
	}
	else {
		searchListContent = <ListItem>No product found</ListItem>;
	}


	return (
		<CustomContainer>
			{
				searchProduct && showSearchList && (
					<StyledSearchListContainer>
						<List sx={{ bgcolor: 'white', maxHeight: '180px', overflow: 'auto' }} disablePadding dense>
							{
								<>
									{searchListContent}
								</>
							}

						</List>
						{
							dropdownSelection.id > 0 && (searchResult && searchResult.length > 0) &&
							<Box pt={1}>
								<StyledViewMoreListItemButton onClick={handleSeeMoreSearchProduct}>
									View more {dropdownSelection.name} product
								</StyledViewMoreListItemButton>
							</Box>
						}
					</StyledSearchListContainer>
				)
			}

			<SearchFormControlStack>
				<StyledFormControl variant="outlined">
					<StyledOutlinedInput
						placeholder={placeholder}
						id="outlined-adornment-headersearch"
						value={searchProduct}
						onChange={handleSearchInput}
						endAdornment={
							showAdornment && <InputAdornment position="end">
								<Stack direction={'row'}>
									{
										showDropdown &&
										<LanscapeMobileScreenUpward>
											<SearchDropdown dropdownSelection={dropdownSelection} setDropdownSelection={customDropdownSelection} />
										</LanscapeMobileScreenUpward>
									}
									<StyledIconButton
										aria-label='find search product'
										onClick={handleClickSearchProduct}
										edge="end"
									>
										<SearchIconSvg />
									</StyledIconButton>
								</Stack>
							</InputAdornment>
						}
					/>
				</StyledFormControl>
			</SearchFormControlStack>
		</CustomContainer >
	);
}

const StyledViewMoreListItemButton = styled(ListItemButton)(({ theme }) => ({
	color: theme.palette.primaryOrange.main,
	fontSize: '.8rem',
	fontWeight: 'bold'
}));
const CustomContainer = styled('div')({
	position: 'relative',
});

const StyledSearchLink = styled(ListItemButton)(({ theme }) => ({
	color: theme.palette.primaryBlack.moreDeeper,
	textTransform: 'inherit',
	fontWeight: '500'
}));

const StyledSearchListContainer = styled('div')(({ theme }) => ({
	position: 'absolute',
	top: '30px',
	zIndex: theme.zIndex.fab,
	backgroundColor: 'white',
	width: '100%',
	borderRadius: theme.shape.borderRadius * 2,
	boxShadow: '0px 2px 11.4px rgba(0, 0, 0, 0.1)',
	paddingTop: theme.spacing(4),
	paddingBottom: theme.spacing(),
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		boxShadow: 'none'
	}
}));

const SearchFormControlStack = styled(FormControl)(({ theme }) => ({
	width: 'fit-content',
	zIndex: theme.zIndex.fab,
	// borderRadius: (theme.shape.borderRadius * 10),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '100%',
	},
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
	backgroundColor: 'white',
	// width: 'fit-content',
	borderRadius: (theme.shape.borderRadius * 10),
	width: '375px',
	boxSizing: 'border-box',
	boxShadow: '0px 2px 11.4px rgba(0, 0, 0, 0.1)',
	paddingRight: theme.spacing(1),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		width: '100%',
	},
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
	width: '100%',
	borderRadius: (theme.shape.borderRadius * 6),
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primaryOrange.main,
		borderRadius: (theme.shape.borderRadius * 6),
		borderWidth: '0px'
	},
	':hover .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primaryOrange.deeper,
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: 'white',
	},
}));

const LanscapeMobileScreenUpward = styled(Box)(() => ({
	// [theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
	// 	display: 'none'
	// }
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
	backgroundColor: theme.palette.primaryGreen.main,
	paddingTop: theme.spacing(1.2),
	paddingLeft: theme.spacing(1.2),
	':hover': {
		backgroundColor: theme.palette.primaryGreen.moreDeeper
	}
}));