import { ClickAwayListener, List, ListItem, ListItemButton, Paper, Popper, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import { CategorySelection } from ".";
import { NavigationHeaderButton } from "./NavigationHeaderButton";

export default function SearchDropdown() {
	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState<CategorySelection>({
		id: 1,
		name: 'All categories'
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	//TODO: Get category list from query
	const categories = [
		{ id: 1, name: 'All categories' }, 
		{ id: 2, name: 'Staples' },
		{ id: 3, name:  'Oils' }, 
		{ id: 4, name: 'Flour' }, 
		{ id: 5, name: 'Beauty' }, 
		{ id: 6, name: 'Spices' }, 
		{ id: 7, name: 'Snacks' }
	];

	const handledChangeCategory = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	const handleChooseSelection = (userSelection: CategorySelection) => {
		setSelection({ ... userSelection });
		handleClickAway();
	};
      
	const canOpenCategory = open && Boolean(anchorEl);
	const id = canOpenCategory ? 'change-product-category' : undefined;
	return (
		<>
			<NavigationHeaderButton 
				aria-label="change product category" aria-describedby={id} onClick={handledChangeCategory}
				sx={{ pl: '0px' }}
				variant="text"
				endIcon={
					<ExpandMore />
				}
			>
				{selection.name}
			</NavigationHeaderButton>
			<StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
				<ClickAwayListener onClickAway={handleClickAway}>
					<Paper elevation={2}>
						<StyledList>
							{categories.map(({ id, name }) => (
								<ListItem key={id} disablePadding>
									<ListItemButton disabled={selection.id === id} onClick={() => handleChooseSelection({ id, name })}
										aria-label={`choose ${name}`}>
										{name}
									</ListItemButton>
								</ListItem>
							))}
						</StyledList>
					</Paper>
				</ClickAwayListener>
			</StyledPopper>
		</>
	);
}

const StyledPopper = styled(Popper)(({ theme }) => ({
	zIndex: theme.zIndex.appBar
}));

const StyledList = styled(List)({
	minWidth: '200px'
});