import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, styled  } from "@mui/material";
import SearchIconSvg from "./svg/SearchSvg";
import SearchDropdown from "./SearchDropdown";
import { ChangeEvent, useState } from "react";
import { SMALL_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";

export default function HeaderSearch() {
	const [searchProduct, setSearchProduct] = useState<string>('');
	const handleClickSearchProduct = () => {
		// Todo send search query 
		console.log('search product');
	};

	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchProduct(event.target.value);
	};

	return (
		<>
			<SearchFormControlStack>
				<StyledFormControl variant="outlined">
					<StyledOutlinedInput
						placeholder="What are you looking for?"
						id="outlined-adornment-headersearch"
						value={searchProduct}
						onChange={handleSearchInput}
						endAdornment={
							<InputAdornment position="end">
								<Stack direction={'row'}>
									<LanscapeMobileScreenUpward>
										<SearchDropdown />
									</LanscapeMobileScreenUpward>
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
		</>
	);
}

const SearchFormControlStack = styled(FormControl)(({ theme }) => ({
	width: 'fit-content',
	// borderRadius: (theme.shape.borderRadius * 10),
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		flexGrow: 1,
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
		width: '400px',
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
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

const LanscapeMobileScreenUpward = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		display: 'none'
	}
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
	backgroundColor: theme.palette.primaryOrange.main,
	paddingTop: theme.spacing(1.2),
	paddingLeft: theme.spacing(1.2),
	':hover': {
		backgroundColor: theme.palette.primaryOrange.deeper
	}
}));