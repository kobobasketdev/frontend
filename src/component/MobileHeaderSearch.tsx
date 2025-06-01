import { styled, IconButton, Box, Drawer, Stack } from "@mui/material";
import SearchIconSvg from "./svg/SearchSvg";
import { useEffect, useState } from "react";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { getWindowWidth } from "#utils/index.ts";
import HeaderSearchWrapper from "./HeaderSearchWrapper";


export default function MobileHeaderSearch() {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpenMobileDrawer = (state: boolean) => () => {
		setOpen(state);
	};

	useEffect(() => {
		const handleMobileSearchResize = () => {
			if (getWindowWidth() >= MEDIUM_SCREEN_MAX_WIDTH) {
				setOpen(false);
			}
		};
		addEventListener('resize', handleMobileSearchResize);
		return () => {
			removeEventListener('resize', handleMobileSearchResize);
		};
	}, []);
	return (
		<MobileSearchBox>
			<StyledIconButton
				aria-label='find search product'
				onClick={handleOpenMobileDrawer(true)}

			>
				<SearchIconSvg />
			</StyledIconButton>
			<Drawer open={open} anchor="bottom" onClose={handleOpenMobileDrawer(false)}>
				<Stack height={'70vh'} pt={2} pl={1} pr={1}>
					<HeaderSearchWrapper />
				</Stack>
			</Drawer>
		</MobileSearchBox>
	);
}

const MobileSearchBox = styled(Box)(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		display: 'inherit'
	}
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
	backgroundColor: theme.palette.primaryGreen.main,
	paddingTop: theme.spacing(1.2),
	paddingLeft: theme.spacing(1.2),
	':hover': {
		backgroundColor: theme.palette.primaryGreen.main,
	}
}));