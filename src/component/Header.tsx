import { AppBar, AppBarProps, Slide, styled, useScrollTrigger } from "@mui/material";
import { drawerWidth, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { getWindowWidth } from "#utils/index.ts";
import { useAppDispatch, useAppSelector } from "#state-management/hooks.ts";
import { selectIsShowheaderContainer, setShowHeader } from "#state-management/slices/active-menu.slice.ts";
import { useEffect } from "react";
import HeaderWithSearch from "./HeaderWithSearch";
import HeaderWithoutSearch from "./HeaderWithoutSearch";

function HideOnScroll({ open }: { open?: boolean }) {
	const isShowHeaderContainer = useAppSelector(selectIsShowheaderContainer);

	const dispatch = useAppDispatch();
	const trigger = useScrollTrigger({
		target: window,
	});


	useEffect(() => {
		if (isShowHeaderContainer) {
			dispatch(setShowHeader(!trigger));
		}

	}, [trigger, isShowHeaderContainer, dispatch]);


	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<StyledAppBar elevation={0} open={open}>
				{
					isShowHeaderContainer ? <HeaderWithSearch /> : <HeaderWithoutSearch />
				}
			</StyledAppBar>
		</Slide>
	);
}

export default function Header({ open }: { open?: boolean }) {
	return (
		<>
			<HideOnScroll open={open} />
		</>
	);
}

interface TAppBarProps extends AppBarProps {
	open?: boolean;
}

const StyledAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<TAppBarProps>(({ theme }) => ({
	backgroundColor: theme.palette.primaryGreen.lightshade,
	color: 'black',
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${getWindowWidth() > TABLET_SCREEN_MAX_WIDTH ? drawerWidth : 0}px)`,
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen * 5,
				}),
				marginRight: getWindowWidth() > TABLET_SCREEN_MAX_WIDTH ? drawerWidth : '0px',
			},
		},
	],
}));




