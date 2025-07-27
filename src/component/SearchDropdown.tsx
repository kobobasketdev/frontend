import { ClickAwayListener, List, ListItem, ListItemButton, Paper, Popper, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import { CategorySelection } from "./types";
import { NavigationHeaderButton } from "./NavigationHeaderButton";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectProductCategories } from "#state-management/slices/active-menu.slice.ts";
import { upperFirst } from "lodash";
import { TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";

export default function SearchDropdown({ dropdownSelection, setDropdownSelection }: {
	dropdownSelection: CategorySelection,
	setDropdownSelection: (args: CategorySelection) => void
}) {
	const [open, setOpen] = useState(false);

	const productCategories = useAppSelector(selectProductCategories);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	//TODO: Get category list from query
	const categories = [
		{ id: 0, name: 'All categories' },
		...productCategories.slice(1)
	];

	const handledChangeCategory = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	const handleChooseSelection = (userSelection: CategorySelection) => {
		setDropdownSelection({ ...userSelection });
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
				{upperFirst(dropdownSelection.name)}
			</NavigationHeaderButton>
			<StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
				<ClickAwayListener onClickAway={handleClickAway}>
					<Paper elevation={2}>
						<StyledList>
							{categories.map(({ id, name }) => (
								<ListItem key={id} disablePadding>
									<ListItemButton disabled={dropdownSelection.id === id} onClick={() => handleChooseSelection({ id, name })}
										aria-label={`choose ${name}`}>
										{upperFirst(name)}
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
	zIndex: theme.zIndex.appBar,
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		zIndex: theme.zIndex.tooltip
	}
}));

const StyledList = styled(List)({
	minWidth: '200px'
});