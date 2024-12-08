import { ClickAwayListener, Divider, Link, List, ListItem, Paper, Popper, Stack, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import { NavigationHeaderButton } from "./NavigationHeaderButton";

export default function AboutDropdown() {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	//TODO: Change about us categories content and href
	const categories = [
		{ title: 'About Kobobasket', href: '' }, 
		{ title: 'Shipping and delivery', href: '' },
	];

	const handleShowAboutDropdown = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	const canOpenCategory = open && Boolean(anchorEl);
	const id = canOpenCategory ? 'about-us-dropdown' : undefined;
	return (
		<>
			<Stack width={'fit-content'}>
				<NavigationHeaderButton 
					$fontWeight="600"
					aria-label="about us dropdown" aria-describedby={id} onClick={handleShowAboutDropdown}
					variant="text"
					endIcon={
						<ExpandMore />
					}
				>
					About us
				</NavigationHeaderButton>
			</Stack>
			<StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
				<ClickAwayListener onClickAway={handleClickAway}>
					<Paper elevation={1}>
						<StyledList>
							{categories.map(({ title, href }) => (
								<ListItem key={title}>
									<StyledLink href={href} underline="hover">
										{title}
									</StyledLink>
								</ListItem>
							))}
							<Divider />
							<ListItem >
								<StyledLink href={''} underline="hover">
									FAQ
								</StyledLink>
							</ListItem>
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
	minWidth: '100px'
});

const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.palette.primaryBlack.main,
	fontFamily: 'Roboto',
	fontSize: '16px'
}));