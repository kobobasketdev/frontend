import { Button, Stack, styled, Typography } from "@mui/material";
import { BuyagainButton, ProductAvatar } from "./CommonViews";
import { CUSTOM_893_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { TDeliveredOrder, TOrderItem } from "./types";
import { useNavigate } from "@tanstack/react-router";
import { RoutePath } from "#utils/route.ts";
import dayjs from "dayjs";
import { appCurrencySymbol, calculateOnlyItemTotal } from "#utils/index.ts";


const orderItemsStub: TOrderItem = {
	id: '1',
	name: 'White Shoe',
	price: 22,
	image: '',
	quantity: 3,
	weight: '1kg'
};

const order: TDeliveredOrder = {
	id: '123823287',
	items: Array(Math.ceil(Math.random() * 6)).fill(orderItemsStub),
	deliveryDate: new Date(),
	status: 0,
	userId: 'someuser@gmail.com',
	shippingFee: 60,
	settlementCurrency: 'CAD',
	shippingAddress: {
		id: '2342342342',
		firstName: 'John',
		address: '12 Westheight Drive',
		city: 'Kitchener',
		country: 'Canada',
		lastName: 'Doe',
		phone: '123-234-5634',
		postalCode: 'N4L 0E3',
		province: 'Ontario'
	}
};

export default function DeliveredOrder() {
	const navigate = useNavigate();
	const handleViewItem = (id: string) => () => {
		navigate({
			to: RoutePath.DELIVERED_ORDER_ITEM,
			params: { orderId: id }
		});
	};
	return (
		<>
			<ContainerSection gap={2}>
				<StyledGrid>
					<OrderItemContainer order={order} onClickViewItem={handleViewItem} />
					<OrderItemContainer order={order} onClickViewItem={handleViewItem} />
					<OrderItemContainer order={order} onClickViewItem={handleViewItem} />
					<OrderItemContainer order={order} onClickViewItem={handleViewItem} />
				</StyledGrid>
			</ContainerSection>
		</>
	);
}

const OrderItemContainer = ({ order, onClickViewItem }: { order: TDeliveredOrder, onClickViewItem: (id: string) => () => void }) => {
	const code = order.settlementCurrency;
	const symbol = appCurrencySymbol[code];
	const itemTotalOnly = calculateOnlyItemTotal(order.items);
	const totalAmount = itemTotalOnly + order.shippingFee;
	const stubItem = Array(Math.ceil(Math.random() * 9)).fill(orderItemsStub);
	return (
		<Stack p={1} pt={2} pb={2} gap={2} bgcolor={'#EBEDF0'} minWidth={'300px'} width={1} maxWidth={'430px'} >
			<Stack gap={1.5}>
				<Stack>
					<Typography fontWeight={'500'} fontSize={'15px'}>
						Delivered {dayjs(order.deliveryDate).format('MMMM D/YYYY')}
					</Typography>
					<Typography fontSize={'13px'}>
						Total: {code} {symbol}{totalAmount}
					</Typography>
					<Typography fontSize={'13px'}>
						Order number #{order.id}
					</Typography>
				</Stack>
				<OrderItemsAvatarGroup items={stubItem.slice(0, 4)} count={stubItem.length} />
			</Stack>
			<Button variant="contained" sx={{ bgcolor: 'white', color: 'black', textTransform: 'inherit' }}
				onClick={onClickViewItem(order.id)}>
				View all items
			</Button>
			<BuyagainButton>
				Add all to cart
			</BuyagainButton>
		</Stack>
	);
};
const OrderItemsAvatarGroup = ({ items, count }: { items: TOrderItem[], count: number }) => {
	const remainder = count - items.length;

	return (
		<Stack direction={'row'} alignItems={'center'} gap={1}>
			<OrderItemGrid>
				{
					items.map((item, index) => (
						<Stack key={index} height={1} borderRadius={2.5} overflow={'hidden'}>
							<ProductAvatar src={item.image} variant="rounded" />
						</Stack>
					))
				}
			</OrderItemGrid>
			{
				remainder > 0 && <Typography fontSize={'12px'} fontWeight={'500'}>+ {remainder} more</Typography>
			}
		</Stack>
	);
};

const ContainerSection = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(),
	paddingBottom: theme.spacing(1),

	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		'& > *': {
			maxWidth: '400px'
		},
	}
}));

const StyledGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	paddingTop: theme.spacing(2),
	rowGap: theme.spacing(4),
	columnGap: theme.spacing(3),
	gridTemplateColumns: 'repeat(2, minmax(auto, 440px))',
	alignSelf: 'center',
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: 'repeat(2, 1fr)',
	},
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		gridTemplateColumns: 'repeat(1, auto)',
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		maxWidth: '360px',
	}
}));

const OrderItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	gap: theme.spacing(),
	gridTemplate: '70px / repeat(4, minmax(auto, 65px))',
}));

