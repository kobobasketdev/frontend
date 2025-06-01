import { BuyagainButton, ProductAvatar } from "#component/CommonViews.tsx";
import { UnderlineButton } from "#component/ContactDetails.tsx";
import ProfileHeading from "#component/ProfileHeading.tsx";
import { SavedAddress } from "#component/ShippingAddress.tsx";
import { TDeliveredOrder, TOrder, TOrderItem } from "#component/types/index.js";
import { CUSTOM_893_WIDTH, DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, SMALL_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH } from "#constants.tsx";

import { appCurrencySymbol, calculateOnlyItemTotal } from "#utils/index.ts";
import { RoutePath } from "#utils/route.ts";
import { ArrowBackIos, StarOutline, UploadFile } from "@mui/icons-material";
import { Stack, Box, Typography, styled, Collapse, Rating, TextField, Button, IconButton, Divider, SvgIcon, Chip } from "@mui/material";
import { Link, useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { ChangeEvent, useRef, useState } from "react";

const orderItemsStub: TOrderItem = {
	id: '1',
	name: 'White Shoe',
	price: 22,
	image: '',
	quantity: 3,
	weight: '1kg'
};

const order: TDeliveredOrder & { orderDate: Date } = {
	id: '123823287',
	items: Array(Math.ceil(Math.random() * 6)).fill(orderItemsStub),
	deliveryDate: new Date(),
	orderDate: new Date(),
	status: 0,
	userId: 'someemail@gmail.com',
	shippingFee: 60,
	settlementCurrency: 'CAD',
	shippingAddress: {
		id: '223412341',
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


export default function DeliveredOrderItem() {
	const { orderId } = useParams({ strict: false });
	const code = order.settlementCurrency;
	const symbol = appCurrencySymbol[code];
	const itemTotalOnly = calculateOnlyItemTotal(order.items);
	const totalAmount = itemTotalOnly + order.shippingFee;
	const fiveDaysAfterDelivery = order.deliveryDate.getTime() + (0 * 24 * 60 * 60 * 1000);
	const today = new Date();
	const shouldNotAllowReview = today.getTime() + (60 * 60 * 1000) < fiveDaysAfterDelivery;
	const remainingDays = Math.round((fiveDaysAfterDelivery - today.getTime()) / (24 * 60 * 60 * 1000));
	return (
		<Stack>
			<StyledStackContent>
				<WrapperStyledStack>
					<ProfileHeading activeMenu={0} />
					<PageContainerStack>
						<NavStack gap={2.5} >
							<Box pl={.5}>
								<Link to={RoutePath.ORDERS} style={{ color: 'black', display: "inline-flex" }}>
									<ArrowBackIos /> <Typography >My Orders</Typography>
								</Link>
							</Box>
						</NavStack>
						<StyledStack>
							<ContainerSection >
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
							</ContainerSection>
							<ContainerSection>
								<Stack gap={1}>
									{
										order.items.map((item, index) => <OrderItemWithReview
											item={item}
											key={index}
											shouldNotAllowReview={shouldNotAllowReview}
											remainingDays={remainingDays}
											currenyInfo={{ code, symbol }}
										/>)
									}
								</Stack>
								<Stack gap={3}>
									<Stack gap={1} pt={1}>
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
									<Stack gap={1} pt={1}>
										<Typography fontWeight={'500'}>
											Order number #{order.id}
										</Typography>
										<Stack gap={.5}>
											<Typography fontSize={'14px'}>
												Date of order: {dayjs(order.orderDate).format('MMMM D/YYYY, h:mm A')}
											</Typography>
											<Typography fontSize={'14px'}>
												Date of delivery: {dayjs(order.deliveryDate).format('MMMM D/YYYY')}
											</Typography>
											<Typography fontSize={'14px'}>
												Total: {code} {symbol}{totalAmount}
											</Typography>
										</Stack>
									</Stack>
									<Stack gap={1}>
										<Typography fontWeight={'500'}>
											Delivery Address
										</Typography>
										<SavedAddress {...order.shippingAddress} fontWeight="normal" fontSize="14px" />
									</Stack>
									<Stack gap={1}>
										<Typography fontSize={'13px'}>You can repeat this order</Typography>
										<BuyagainButton>
											Add all to cart
										</BuyagainButton>
									</Stack>
								</Stack>
							</ContainerSection>
						</StyledStack>
					</PageContainerStack>
				</WrapperStyledStack>
			</StyledStackContent>
		</Stack>
	);
}

const OrderItemWithReview = ({ item, shouldNotAllowReview, currenyInfo, remainingDays }: {
	item: TOrderItem, shouldNotAllowReview: boolean,
	remainingDays: number
	currenyInfo: { code: string, symbol: string }
}) => {
	const [showReviewBox, setShowReviewBox] = useState<boolean>(false);
	const pictureMapRef = useRef<{ [x: string]: File }>({});
	const [pictureCount, setPictureCount] = useState<number>(0);

	const handleShowAddReview = () => {
		setShowReviewBox(prev => !prev);
	};

	const handleChoosePicture = (e: ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;
		if (!fileList) {
			return;
		}

		const file = fileList.item(0);

		if (!file || pictureCount >= 3 || pictureMapRef.current[file.name]) {
			e.target.value = '';
			return;
		}

		pictureMapRef.current[file.name] = file;
		e.target.value = '';
		setPictureCount(pictureCount + 1);
	};

	const handleRemovePic = (key: string) => () => {
		delete pictureMapRef.current[key];
		const newPicsCount = pictureCount - 1;
		setPictureCount(newPicsCount);
	};
	return (
		<Stack gap={2} pb={2}>
			<Stack direction={'row'} justifyContent={'space-between'} >
				<Stack direction={'row'} gap={1} alignItems={'center'}>
					<Stack overflow={'hidden'} borderRadius={3}>
						<ProductAvatar variant="rounded" src="" $size={{ height: !showReviewBox ? '100px' : '70px', width: '80px' }} />
					</Stack>
					<Stack justifyContent={'space-between'} height={1} pb={1} pt={1}>
						<Box>
							<Typography fontWeight={'500'} noWrap>
								{item.name}
							</Typography>
							<Typography fontSize={'14px'}>
								{item.weight}
							</Typography>
						</Box>
						{
							shouldNotAllowReview ? <Typography fontSize={'12px'} maxWidth={'150px'}>You can review in {remainingDays} day{remainingDays > 1 && 's'}</Typography>
								: <Box>
									{
										item.isReviewed ? <Typography fontSize={'14px'} color="text.secondary">Review submitted</Typography>
											:
											(
												<UnderlineButton size="small" onClick={handleShowAddReview} sx={{ visibility: showReviewBox ? "hidden" : 'visible' }}>
													Add a Review
												</UnderlineButton>
											)
									}
								</Box>
						}
					</Stack>
				</Stack>
				<Box pt={1}>
					<Typography fontSize={'14px'}>
						Quantity: {item.quantity}
					</Typography>
					<Typography fontWeight={'500'}>
						{currenyInfo.code} {currenyInfo.symbol}{item.price}
					</Typography>
				</Box>
			</Stack>
			<Collapse in={showReviewBox}>
				<Stack boxShadow={1} gap={2.5} p={1} borderRadius={2} pb={2}>
					<Stack alignItems={'center'} position={'relative'} height={'46px'} pt={.5}>
						<StyledRating
							icon={<SvgIcon viewBox="0 0 12 16"><StarOutline /></SvgIcon>}
							emptyIcon={<SvgIcon viewBox="0 0 12 16"><StarOutline /></SvgIcon>}

						/>
					</Stack>
					<Stack gap={1}>
						<TextField label='Title' placeholder="Amazing item, I love it!" size="small"
							sx={{ bgcolor: '#F5F5F5', '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #D1D1D6', borderRadius: '6px' } }}
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}} />
						<ReviewContainerStack>
							<Stack direction={'row'} alignItems={'center'}>
								<Box overflow={'hidden'}>
									<IconButton color="inherit" disableRipple tabIndex={-1} sx={{ ':hover': { bgcolor: 'transparent' } }}>
										<UploadFile /> <Typography fontSize={'14px'}>{pictureCount} of 3</Typography>
										<VisuallyHiddenInput type="file" onChange={handleChoosePicture} accept="image/png, image/jpeg" />
									</IconButton>
								</Box>
								<Stack direction={'row'} flexWrap={'wrap'} gap={.5}>
									{
										Object.keys(pictureMapRef.current).map((pic) => <Chip key={pic} size="small" label={<Typography fontSize={'12px'} width={'45px'} noWrap>{pic}</Typography>} onDelete={handleRemovePic(pic)} />)
									}
								</Stack>
							</Stack>
							<Divider />
							<TextField placeholder="Add a comment..." multiline sx={{ '& .MuiOutlinedInput-notchedOutline': { display: 'none' } }} />
						</ReviewContainerStack>
					</Stack>
					<Stack direction={'row'} justifyContent={'space-between'}>
						<Button variant="outlined" color="inherit" sx={{ textTransform: 'inherit' }} onClick={handleShowAddReview}>
							Cancel
						</Button>

						<Button variant="contained" sx={{ bgcolor: 'black', textTransform: 'inherit' }} disabled>
							Submit Review
						</Button>
					</Stack>
				</Stack>
			</Collapse>
		</Stack>
	);
};

const PageContainerStack = styled(Stack)(({ theme }) => ({
	gap: theme.spacing(2),
	[theme.breakpoints.up(CUSTOM_893_WIDTH)]: {
		paddingTop: theme.spacing(9),
		'& > div:last-of-type': {
			border: '1px solid #F2F2F7',
			paddingTop: theme.spacing(),
			paddingBottom: theme.spacing()
		}
	}
}));

const WrapperStyledStack = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	gap: theme.spacing(),
	maxWidth: '1200px',
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

const StyledRating = styled(Rating)(({ theme }) => ({
	display: 'flex',
	gap: theme.spacing(3),
	'label:not(:last-child)': {
		position: 'relative',
		height: 'auto',
	},
	'& .MuiRating-icon': {
		borderRadius: theme.spacing(.4),
		backgroundColor: '#E5E5EA',
		'&.MuiRating-iconFilled': {
			backgroundColor: '#faaf00',
			'svg': {
				color: 'white',
			}
		},
		'& + .MuiRating-visuallyHidden': {
			clip: 'unset',
			overflow: 'unset',
			width: '100%',
			bottom: -5,
			left: -5,
			fontSize: '12px',
			color: 'rgba(27, 31, 38, 0.72)',
			margin: 0
		},
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		paddingLeft: theme.spacing()
	}
}));
const ReviewContainerStack = styled(Stack)(() => ({
	background: '#F5F5F5',
	border: '1px solid #D1D1D6',
	borderRadius: '6px'

}));
const VisuallyHiddenInput = styled('input')({
	overflow: 'hidden',
	position: 'absolute',
	bottom: '-10px',
	whiteSpace: 'nowrap',
	height: '200%',
	width: '100%',
});

const StyledStack = styled('div')(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(1, minmax(auto, 870px))',
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto',
		gap: theme.spacing(),
		width: '100%',
		minWidth: 'unset',
		maxWidth: '500px',
	},
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		maxWidth: '400px'
	}
}));

const ContainerSection = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(0),
	paddingBottom: theme.spacing(1),
	'& > *': {
		maxWidth: '500px'
	},

	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(1.5),
		paddingRight: theme.spacing(1.5),
		'& > *': {
			maxWidth: '400px'
		},
	}
}));

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(15),
	gap: theme.spacing(2),
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


const NavStack = styled(Stack)(({ theme }) => ({
	backgroundColor: 'white',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
	paddingTop: theme.spacing(2.5),
	paddingBottom: theme.spacing(1),
	[theme.breakpoints.down(SMALL_SCREEN_MAX_WIDTH)]: {
		width: '100%',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	}
}));