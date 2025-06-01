import TrackFaqContent from "#component/TrackFaqContent.tsx";
import { Box, Divider, Skeleton, Stack, styled, Typography } from "@mui/material";
import { HelpCenterContent } from "./HelpCenter";
import { NewOrderItemContainer } from "#component/NewOrder.tsx";
import { DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import HeaderSearch from "#component/HeaderSearch.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import fetcher from "#hooks/fetcher.ts";
import { TDeliveredOrder, TNewOrder } from "#component/types/index.js";

export default function TrackOrder() {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	let trackedOrder: TDeliveredOrder | TNewOrder | null = null;
	const queryClient = useQueryClient();
	const onSearch = async ({ searchString }: { searchString: string }) => {
		console.log(searchString, 'in here');
		setIsSearching(true);
		try {
			const { data } = await queryClient.fetchQuery({
				queryKey: ['track-order', searchString],
				queryFn: () => fetcher.get('v1/orders/' + searchString)
			});
			const order = data.order as TDeliveredOrder | TNewOrder;
			trackedOrder = order;
			setIsSearching(false);
		}
		catch (e) {
			console.log(e, 'tracking order error');
			setIsSearching(false);
		}
	};

	let content = null;
	if (isSearching) {
		content = (
			<Stack border={'1px solid #F2F2F7'} borderRadius={1} >
				<Box p={1} pl={2} pr={2}>
					<CustomSkeleton height={'100px'} />
				</Box>
				<Divider />
				<Stack gap={2} pl={2} pr={2} pt={1}>
					<CustomSkeleton />
					<CustomSkeleton />
					<CustomSkeleton />
				</Stack>
				<Stack pl={2} pr={2} gap={0} >
					<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={'-20px'}>
						<CustomSkeleton width={'100px'} height={'200px'} />
						<CustomSkeleton width={'60px'} />
					</Stack>
					<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={'-20px'}>
						<CustomSkeleton width={'100px'} height={'200px'} />
						<CustomSkeleton width={'60px'} />
					</Stack>
					<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={'-20px'}>
						<CustomSkeleton width={'100px'} height={'200px'} />
						<CustomSkeleton width={'60px'} />
					</Stack>
				</Stack>
			</Stack >
		);
	}
	else if (trackedOrder) {
		content = <NewOrderItemContainer order={trackedOrder} isExpanded />;
	}
	return (
		<StyledStackContent alignItems={'center'}>
			<Stack direction={'row'} gap={2.5} width={'auto'}>
				<TrackFaqContent highlight='track' />
				<Stack p={1} pt={3} gap={3}>
					<Stack gap={2}>
						<Typography fontFamily={'Alata'} fontSize={'24px'} pt={2}>Track Order</Typography>
						<Stack borderRadius={2} bgcolor={'#E7FFD6'} gap={3} p={1} pb={1.5}>
							<Stack gap={1}>
								<Typography fontFamily={'Alata'} pl={.5}>
									TRACK YOUR PACKAGE
								</Typography>
								<Typography pl={.5} fontSize={'14px'} sx={{ color: 'rgba(27, 31, 38, 0.72)' }}>
									Enter your Tracking number
								</Typography>
							</Stack>
							<Stack>
								<HeaderSearch placeholder="Tracking number" onSearch={onSearch} showAdornment />
							</Stack>
						</Stack>
					</Stack>
					<Stack gap={3}>
						<CustomGrid>
							{
								content
							}
						</CustomGrid>

						<Stack className="mobile-help">
							<Stack>
								<Typography fontFamily={'Alata'} pl={.5}>
									HELP CENTER
								</Typography>
								<Typography pl={.5} fontSize={'14px'}>
									Need help with something, We're here to help with all your Questions.
								</Typography>
							</Stack>
							<HelpCenterContent />
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</StyledStackContent>
	);
}

const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
	paddingTop: 0
}));

const CustomGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '500px',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: 'auto'
	}
}));
const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	'& .mobile-help': {
		display: 'none',
	},
	paddingTop: theme.spacing(15),
	[theme.breakpoints.down(1346)]: {
		paddingTop: theme.spacing(16.4),
	},
	[theme.breakpoints.down(1300)]: {
		paddingTop: theme.spacing(16),
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23.5),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(22),
		'& .mobile-help': {
			display: 'inline'
		},
		'& .track-faq': {
			display: 'none'
		}
	},
	[theme.breakpoints.down(955)]: {
		paddingTop: theme.spacing(22.5)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(19)
	},

}));