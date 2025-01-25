import { Button, Drawer, IconButton, Stack, Typography, styled } from "@mui/material";
import FilterSvg from "./svg/FilterSvg";
import { useState } from "react";
import { DESKTOP_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, } from "#constants.tsx";
import {  HighlightOff } from "@mui/icons-material";
import WebFilterContent from "./filters/WebFilterContent";
import MobileFilterContent from "./filters/MobileFilterContent";

export default function FilterProduct() {
	const [open, setOpen] = useState(false);
	const signedInUserName = 'Jessica';
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};
	
	
	return(
		<div>
			<FilterButton onClick={toggleDrawer(true)}>
				<FilterSvg />
				<Typography>
					Filter
				</Typography>
			</FilterButton>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<Stack p={3} pt={1} height={1} position={'relative'}>
					<IconButton onClick={toggleDrawer(false)} sx={{ position: 'absolute', right: '10px' }}>
						<HighlightOff />
					</IconButton>
					<Stack gap={1} borderBottom={1} pb={1} borderColor={'divider'}>
						<Typography fontFamily={'Alata'} fontSize={'24px'}>
							Hello {signedInUserName  || ', sign in'}
						</Typography>
						<Typography fontFamily={'Roboto'} fontSize={'16px'}>Shop by</Typography>
					</Stack>
					<WebFilterContent />
					<MobileFilterContent />
				</Stack>
			</Drawer>
		</div>
	);
}

const FilterButton = styled(Button)(({ theme }) => ({
	color: theme.palette.primaryGreen.main,
	textTransform: 'inherit',
	'& p': {
		display: 'inline',
		fontFamily: 'Roboto',
		fontSize: '16px',
		letterSpacing: '0.15px',
		paddingLeft: theme.spacing(1),
		color: theme.palette.primaryGreen.main,
	},
	'& svg': {
		color: theme.palette.primaryGreen.main,
	},
	border: `1px solid ${theme.palette.primaryGreen.main}`,
	borderRadius: theme.shape.borderRadius * 2,
	width: 'auto',
	padding: `${theme.spacing(.3)} ${theme.spacing(1)}` ,
	paddingLeft: theme.spacing(1),
	display: 'inline-flex',
	justifyContent: 'center',
	alignItems: 'center',
	minWidth: 'unset',
	backgroundColor: 'white',
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		borderRadius: theme.shape.borderRadius * 10,
		padding: `${theme.spacing(.8)} ${theme.spacing(1)}` ,
		paddingLeft: theme.spacing(1),
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		'& p': {
			display: 'none'
		},
	},
}));
