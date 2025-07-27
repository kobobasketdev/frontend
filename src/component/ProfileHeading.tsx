import { CUSTOM_893_WIDTH } from "#constants.tsx";
import { useAppSelector, useAppDispatch } from "#state-management/hooks.ts";
import { selectLoginUserFirstname, signOut } from "#state-management/slices/user.slice.ts";
import { RoutePath } from "#utils/route.ts";
import { Typography, SvgIcon, styled, Stack } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import BuyagainSvg from "./svg/BuyagainSvg";
import HelpCenterSvg from "./svg/HelpCenterSvg";
import MyorderSvg from "./svg/MyorderSvg";
import NotificationList from "./svg/NotificationListSvg";
import SettingSvg from "./svg/SettingSvg";
import SignoutSvg from "./svg/SignoutSvg";
import { StyledProfileButton, StyledProfileNavContent } from "./CommonViews";

const profileItem = [
	{ title: 'My Orders', icon: <MyorderSvg />, route: RoutePath.ORDERS },
	{ title: 'Buy Again', icon: <BuyagainSvg />, route: RoutePath.BUYAGAIN },
	{ title: 'Help Center', icon: <HelpCenterSvg />, route: RoutePath.HELP_CENTER },
	{ title: 'Notify me list', icon: <NotificationList />, route: RoutePath.NOTIFICATION },
	{ title: 'Settings', icon: <SettingSvg />, route: RoutePath.SETTINGS },
	{ title: 'Sign Out', icon: <SignoutSvg />, route: '' }
];


export default function ProfileHeading({ activeMenu = -1 }: { activeMenu?: number }) {
	const currentUserFullname = useAppSelector(selectLoginUserFirstname);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	return (
		<TopStack className="profile-nav">
			<AvatarStack direction={'row'} alignItems={'center'} gap={1} pt={2}>
				<Typography fontFamily={'Alata'} fontSize={'24px'} border={1} noWrap>Hi {currentUserFullname}</Typography>
			</AvatarStack>
			<StyledGrid>
				{
					profileItem.map((item, index) => (
						<StyledProfileButton key={index} $isActive={activeMenu === index} variant="text" sx={{ textTransform: 'inherit', color: 'black', minWidth: '100px' }}
							onClick={() => {
								if (item.title === 'Sign Out') {
									dispatch(signOut());
									navigate({
										to: RoutePath.LOGIN
									});
									return;
								}
								navigate({
									to: item.route
								});
							}}>
							<StyledProfileNavContent>
								<SvgIcon viewBox="0 2 14 14">
									{item.icon}
								</SvgIcon>
								<Typography>
									{item.title}
								</Typography>
							</StyledProfileNavContent>
						</StyledProfileButton>
					))
				}
			</StyledGrid>
		</TopStack>
	);
}

const AvatarStack = styled(Stack)(({ theme }) => ({
	paddingLeft: theme.spacing(2.5),
}));

const TopStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	maxWidth: '220px',
	width: '100%',
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2),
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		flexDirection: 'column',
		paddingLeft: 'inherit',
		paddingRight: 'inherit',
		maxWidth: '700px',
		margin: '0 auto',
	},
	[theme.breakpoints.down(690)]: {
		maxWidth: '500px',
	},
}));

const StyledGrid = styled('div')(({ theme }) => ({
	flexDirection: 'column',
	flexWrap: 'wrap',
	width: '100%',
	rowGap: theme.spacing(2),
	padding: theme.spacing(0),
	paddingTop: theme.spacing(),
	alignItems: 'left',
	display: 'flex',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	[theme.breakpoints.down(690)]: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, minmax(auto, 120px))',
		justifyContent: 'space-between',
		margin: '0 auto',
	},
}));