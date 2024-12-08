import { FormControl, IconButton, InputAdornment, OutlinedInput, Stack, styled  } from "@mui/material";
import SearchIconSvg from "./svg/SearchSvg";
import SearchDropdown from "./SearchDropdown";
import { ChangeEvent, useState } from "react";
import { NORMAL_PHONE_BREAKPOINT } from "#constants.tsx";

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
			<Stack>
				<StyledFormControl variant="outlined">
					<StyledOutlinedInput
						placeholder="What are you looking for?"
						id="outlined-adornment-headersearch"
						value={searchProduct}
						onChange={handleSearchInput}
						endAdornment={
							<InputAdornment position="end">
								<Stack direction={'row'}>
									<SearchDropdown />
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
			</Stack>
		</>
	);
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
	backgroundColor: 'white',
	width: 'fit-content',
	borderRadius: (theme.shape.borderRadius * 10),
}));

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
	paddingRight: theme.spacing(3),
	fontSize: '14px',
	height: '48px',
	width: '370px',
	transition: '.5s',
	'.MuiOutlinedInput-input': {
		paddingTop: theme.spacing(2)
	},
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primaryOrange.main,
		borderRadius: (theme.shape.borderRadius * 6),
		borderWidth: '1px'
	},
	':hover .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primaryOrange.deeper,
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: theme.palette.primaryOrange.deeper,
	},
	
	[theme.breakpoints.between('xs', NORMAL_PHONE_BREAKPOINT)] : {
		width: '304px'
	},
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	backgroundColor: theme.palette.primaryOrange.main,
	paddingTop: theme.spacing(1.2),
	paddingLeft: theme.spacing(1.2),
	':hover': {
		backgroundColor: theme.palette.primaryOrange.deeper
	}
}));