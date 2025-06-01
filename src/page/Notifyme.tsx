import ProfileHeading from "#component/ProfileHeading.tsx";
import KoboBundleSvg from "#component/svg/KoboBundleSvg.tsx";
import KobodealSvg from "#component/svg/KobodealSvg.tsx";
import NotificationOffSvg from "#component/svg/NotificationOffSvg.tsx";
import NotificationOilSvg from "#component/svg/NotificationOilSvg.tsx";
import NotificationOnSvg from "#component/svg/NotificationOnSvg.tsx";
import NotificationStaplesSvg from "#component/svg/NotificationStaplesSvg.tsx";
import { NotificationTagSvg } from "#component/svg/NotificationTagSvg.tsx";
import { INotificationList } from "#component/types/index.js";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH } from "#constants.tsx";
import { useAuthMutation } from "#hooks/mutations/auth";
import { getAppNotifications, getUserNotificationList } from "#hooks/query/notification";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectLoginUserId } from "#state-management/slices/user.slice.ts";
import { RoutePath } from "#utils/route.ts";
import { ArrowBackIos, Cached } from "@mui/icons-material";
import { Alert, Box, Button, IconButton, List, ListItem, Skeleton, Stack, styled, SvgIcon, Typography } from "@mui/material";
import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { JSX, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


const APP_NOTIFICATION_TARGET: { [x: string]: { title: string, icon: JSX.Element } } = {
	'beauty': { title: 'BEAUTY', icon: <NotificationTagSvg /> },
	'staples': { title: 'STAPLES', icon: <NotificationStaplesSvg /> },
	'oil': { title: 'OIL', icon: <NotificationOilSvg /> },
	'flour': { title: 'FLOUR', icon: <NotificationTagSvg /> },
	'spices': { title: 'SPICES', icon: <NotificationTagSvg /> },
	'snacks': { title: 'SNACKS', icon: <NotificationTagSvg /> },
	'discounts': { title: 'DISCOUNTS', icon: <NotificationTagSvg /> },
	'kobodeals': { title: 'KOBO DEALS', icon: <KobodealSvg /> },
	'kobobundles': { title: 'KOBO BUNDLES', icon: <KoboBundleSvg /> }
};

export default function Notifyme() {
	const userId = useAppSelector(selectLoginUserId);
	const queryClient = useQueryClient();
	const handleRefetch = async () => {
		await Promise.all([
			queryClient.refetchQueries({
				queryKey: ['user-notifications', userId]
			}),
			queryClient.refetchQueries({
				queryKey: ['notifications']
			})
		]);
	};
	return (
		<Stack>
			<StyledStackContent>
				<WrapperStyledStack>
					<ProfileHeading activeMenu={3} />
					<PageContainerStack>
						<NavStack gap={2.5} >
							<Box pl={.5}>
								<Link to={RoutePath.PROFILE} style={{ color: 'black', display: "inline-flex", }}>
									<ArrowBackIos /> <Typography >My Profile</Typography>
								</Link>
							</Box>
							<Typography fontFamily={'Alata'} pl={.5}>
								NOTIFY ME
							</Typography>
							<Typography pl={.5} fontSize={'14px'}>
								Enable notifications to stay updated on discounts, exclusive bundles, and the latest products.
							</Typography>
						</NavStack>
						<ErrorBoundary
							fallbackRender={NotificationErrorFallback}
							onReset={() => {
								handleRefetch();
							}}
						>
							<Suspense fallback={<NotificationListSuspense />}>
								<NotificationList />
							</Suspense>
						</ErrorBoundary>
						<NavStack>
							<Typography pl={.5} fontSize={'14px'} className="bottom-text">
								By enabling notifications, you agree to receive updates, promotions, and other communications from Kobobasket regarding your orders and our products.
							</Typography>
						</NavStack>
					</PageContainerStack>
				</WrapperStyledStack>
			</StyledStackContent>
		</Stack>
	);
}

const NotificationErrorFallback = ({ resetErrorBoundary }: { resetErrorBoundary: () => void }) => {
	return (
		<Stack minHeight={'500px'} alignItems={'center'} justifyContent={'center'} gap={1.5} pt={1}>
			<Typography>Error Loading Subscription List</Typography>
			<Button variant="outlined" onClick={() => resetErrorBoundary()} color="inherit" startIcon={<Cached />}
				sx={{ textTransform: 'inherit' }}>
				Reload
			</Button>
		</Stack>
	);
};

const NotificationListSuspense = () => {
	return (
		<StyledList>
			{
				Array(9).fill('').map((_, index) => <Skeleton key={index} height={'70px'}></Skeleton>)
			}
		</StyledList>
	);
};

const NotificationList = () => {
	const { addUserNotificationList, removeUserNotificationList } = useAuthMutation();
	const { enqueueSnackbar } = useSnackbar();
	const [appNotification, userNotification] = useSuspenseQueries({
		queries: [
			getAppNotifications(),
			getUserNotificationList()
		]
	});

	const userSubscribeSet = new Set((userNotification?.data.data as { notificationId: string }[])?.map(userlist => userlist.notificationId) || []);
	const targetAppNotification: INotificationList[] = appNotification?.data.data || [];
	console.log(appNotification, userNotification);
	const handledToggleNotification = (notificationId: string) => async () => {
		try {
			if (userSubscribeSet.has(notificationId)) {
				await removeUserNotificationList.mutateAsync(notificationId);
			}
			else {
				await addUserNotificationList.mutateAsync(notificationId);
			}
		}
		catch {
			enqueueSnackbar(<Alert severity="error">
				Could not update notification list. try again
			</Alert>, {
				anchorOrigin: { horizontal: 'center', vertical: 'top' },
				style: { backgroundColor: '#fdeded', padding: '0px 0px', }
			});
		}
	};
	return (
		<StyledList>
			{
				targetAppNotification.map((availableNotification, index) => (
					<ListItem key={index} divider >
						<StyledStack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pb={1} pt={1}>
							<Stack direction={'row'} alignItems={'center'} gap={1}>
								<SvgIcon viewBox="-4 -4 20 20" sx={{ bgcolor: '#E7FFD6', borderRadius: '50%', width: '35px', height: '34px' }}>
									{APP_NOTIFICATION_TARGET[availableNotification.title].icon}
								</SvgIcon>
								{APP_NOTIFICATION_TARGET[availableNotification.title].title}
							</Stack>
							<IconButton onClick={handledToggleNotification(availableNotification.id)}>
								<SvgIcon viewBox="4 0 12 12" sx={{ width: '40px' }}>
									{
										userSubscribeSet.has(availableNotification.id) ?
											<NotificationOnSvg />
											:
											<NotificationOffSvg />
									}
								</SvgIcon>
							</IconButton>
						</StyledStack>
					</ListItem>
				))
			}
		</StyledList>
	);
};
const PageContainerStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingTop: theme.spacing(9),
		'& > div:last-of-type': {
			paddingTop: theme.spacing(),
			paddingBottom: theme.spacing()
		}
	}
}));

const WrapperStyledStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	gap: theme.spacing(),
	maxWidth: '1000px',
	margin: '0 auto',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		'& .profile-nav': {
			display: 'none',
		},
		flexDirection: 'column',
		gap: theme.spacing(2),
		margin: '0 0',
	}
}));

const StyledList = styled(List)(({ theme }) => ({
	width: '90%',
	maxWidth: '700px',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		margin: '0 auto',
	},
}));
const StyledStack = styled(Stack)(() => ({
	width: '100%',
	maxWidth: '700px',
}));

const NavStack = styled(Stack)(({ theme }) => ({
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(2.5),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingLeft: theme.spacing(2.5),
		'& > div:first-of-type': {
			display: 'none'
		},
		'& p:first-of-type:not(.bottom-text)': {
			fontSize: '20px'
		},
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(15),
	gap: theme.spacing(4),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(24)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(20)
	},
}));