import { CUSTOM_893_WIDTH, SMALL_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { styled, Stack, Accordion, AccordionSummary, AccordionDetails, Typography, Box, Stepper, Step, StepLabel, Button, } from "@mui/material";
import { TNewOrder, TOrderItem } from "./types";
import { CheckCircle, ExpandMore } from "@mui/icons-material";
import { ProductAvatar } from "./CommonViews";
import { SavedAddress } from "./ShippingAddress";
import { appCurrencySymbol, calculateOnlyItemTotal } from "#utils/index.ts";



const orderItemsStub: TOrderItem = {
	id: '1',
	name: 'White Shoe',
	price: 22,
	image: '',
	quantity: 3,
	weight: '1kg'
};

type TNewOrderHistory = TNewOrder & { id: string };
export const order: TNewOrderHistory = {
	id: '123823287',
	items: Array(Math.ceil(Math.random() * 6)).fill(orderItemsStub),
	orderDate: new Date(),
	status: 0,
	shippingFee: 60,
	userId: 'someuser@gmail.com',
	settlementCurrency: 'CAD',
	shippingAddress: {
		id: '12343423',
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

const ORDER_STAGE = ['Order placed', 'Processing', 'Order shipped', 'Order Delivered'];
const STAGE_LABEL = [
	'We have received your order on ',
	'We are processing your order',
	'Your order has been shipped and will be delivered in 5 - 10 business days',
	'Your order has been delivered'
];


export default function NewOrder() {
	return (
		<>
			<ContainerSection gap={2}>
				<NewOrderStack>
					<NewOrderItemContainer order={order} />
					<NewOrderItemContainer order={{ ...order, status: 1 }} />
					<NewOrderItemContainer order={order} />
					<NewOrderItemContainer order={{ ...order, status: 2 }} />
					<NewOrderItemContainer order={order} />
				</NewOrderStack>
			</ContainerSection>
		</>
	);
}

export const NewOrderItemContainer = ({ order, isExpanded = false }: { order: TNewOrderHistory, isExpanded?: boolean }) => {
	const code = order.settlementCurrency;
	const symbol = appCurrencySymbol[code];
	const itemTotalOnly = calculateOnlyItemTotal(order.items);
	const totalAmount = itemTotalOnly + order.shippingFee;

	return (
		<>
			<StyledAccordion defaultExpanded={isExpanded}>
				<AccordionSummary expandIcon={<ExpandMore fontSize="large" />}>
					<Stack gap={.5}>
						<Typography fontWeight={'500'}>
							Order number {"#" + order.id}
						</Typography>
						<Typography color="text.secondary" fontSize={'14px'}>
							Total: {code} {symbol}{totalAmount}
						</Typography>
						<Stack direction={'row'} gap={.5} alignItems={'center'}>
							<IndicatorSpan />
							<Typography color="text.secondary" fontSize={'14px'}>
								{ORDER_STAGE[order.status]}
							</Typography>
						</Stack>
					</Stack>
				</AccordionSummary>
				<AccordionDetails sx={{ borderTop: '1px solid #BDBDBD' }}>
					<Stack gap={3}>
						<Box>
							<WebStepper
								alternativeLabel
								activeStep={order.status}
								orientation="horizontal">
								{
									ORDER_STAGE.map((stage, index) => (
										<Step key={stage}>
											<StepLabel icon={<StyledCheckCircle $status={order.status >= index} color={'disabled'} />}>
												{stage}
												{
													order.status >= index &&
													<Typography fontSize={'12px'} color="text.secondary">
														{STAGE_LABEL[index]} {index == 0 && order.orderDate.toUTCString()}
													</Typography>
												}
											</StepLabel>
										</Step>
									))
								}
							</WebStepper>
							<MobileStepper
								activeStep={order.status}
								orientation='vertical'>
								{
									ORDER_STAGE.map((stage, index) => (
										<Step key={stage}>
											<StepLabel icon={<StyledCheckCircle $status={order.status >= index} color={'disabled'} />}>
												{stage}
												{
													order.status >= index &&
													<Typography fontSize={'12px'} color="text.secondary">
														{STAGE_LABEL[index]} {index == 0 && order.orderDate.toUTCString()}
													</Typography>
												}
											</StepLabel>
										</Step>
									))
								}
							</MobileStepper>
						</Box>
						<Stack gap={2} maxWidth={'450px'}>
							{
								order.items.map((item, index) => (
									<OrderItem key={index} item={item} currenyInfo={{ code, symbol }} />
								))
							}
						</Stack>
						<Stack gap={1} maxWidth={'450px'}>
							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography color="text.secondary" fontSize={'14px'}>
									Subtotal ({order.items.length} items)
								</Typography>
								<Typography color="text.secondary" fontSize={'14px'}>
									{code} {symbol} {itemTotalOnly}
								</Typography>
							</Stack>
							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography color="text.secondary" fontSize={'14px'}>
									Shipping fee
								</Typography>
								<Typography color="text.secondary" fontSize={'14px'}>
									{code} {symbol} {order.shippingFee}
								</Typography>
							</Stack>

							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography fontWeight={'600'} fontSize={'18px'}>
									Total
								</Typography>
								<Typography fontWeight={'600'} fontSize={'18px'}>
									{code} {symbol} {totalAmount}
								</Typography>
							</Stack>
						</Stack>
						<Stack gap={1} maxWidth={'450px'}>
							<Typography fontWeight={'500'}>
								Delivery Address
							</Typography>
							<SavedAddress {...order.shippingAddress} fontWeight="normal" fontSize="14px" />
						</Stack>
						<Stack maxWidth={'450px'}>
							{
								order.status == 0 ? (
									<Stack gap={1}>
										<Typography fontSize={'14px'}>
											You can cancel your order before processing begins.
										</Typography>
										<Button variant="contained" sx={{ bgcolor: 'black', textTransform: 'inherit' }}>
											Cancel Order
										</Button>
									</Stack>
								)
									:
									<Typography fontSize={'14px'}>
										You can not cancel your order because your order has been processed.
									</Typography>
							}
						</Stack>
					</Stack>
				</AccordionDetails>
			</StyledAccordion>
		</>
	);
};

const OrderItem = ({ item, currenyInfo }: { item: TOrderItem, currenyInfo: { code: string, symbol: string } }) => {
	return (
		<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
			<Stack direction={'row'} gap={1} alignItems={'center'}>
				<Stack overflow={'hidden'} borderRadius={3}>
					<ProductAvatar variant="rounded" src="" $size={{ height: '100px', width: '80px' }} />
				</Stack>
				<Box>
					<Typography fontWeight={'500'} noWrap>
						{item.name}
					</Typography>
					<Typography fontSize={'14px'}>
						{item.weight}
					</Typography>
				</Box>
			</Stack>
			<Box>
				<Typography fontSize={'14px'}>
					Quantity: {item.quantity}
				</Typography>
				<Typography fontWeight={'500'}>
					{currenyInfo.code} {currenyInfo.symbol}{item.price}
				</Typography>
			</Box>
		</Stack>
	);
};

const WebStepper = styled(Stepper)(({ theme }) => ({
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		display: 'none'
	}
}));

const MobileStepper = styled(Stepper)(({ theme }) => ({
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		display: 'none'
	}
}));

const NewOrderStack = styled('div')(({ theme }) => ({
	display: 'grid',
	paddingTop: theme.spacing(2),
	margin: '0 auto',
	rowGap: theme.spacing(2),
	gridTemplateColumns: 'repeat(1, minmax(auto, 850px))',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		gridTemplateColumns: 'repeat(1, auto)',
	},
}));

const StyledCheckCircle = styled(CheckCircle, {
	shouldForwardProp: prop => prop !== '$status'
})<{ $status?: boolean }>(({ $status }) => ({
	...($status && {
		fill: '#52991F'
	})
}));
const IndicatorSpan = styled('span')({
	'width': '8px',
	'height': '8px',
	borderRadius: '50%',
	background: 'linear-gradient(180deg, #F74C25 8.7%, #FFF700 165.22%)'
});

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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
	boxShadow: 'none',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		'::before': {
			backgroundColor: 'transparent'
		},
		border: '1px solid #F2F2F7',
	}
}));