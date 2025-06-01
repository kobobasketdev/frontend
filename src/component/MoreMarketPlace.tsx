import { Stack, styled } from "@mui/material";
import { ContentStack } from "./CommonViews";
import ProductItem from "./ProductItem";
import { LARGED_DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import fetcher from "#hooks/fetcher.ts";
import { TItem } from "./types";

export default function MoreMarketPlace({ page }: { page: number }) {
	const { data: productsData } = useQuery({
		queryKey: ['all-product', page],
		queryFn: async () => {
			return fetcher.get(`v1/products?page=${page}&limit=40`);
		},
		staleTime: 5400000,
		placeholderData: keepPreviousData
	});
	const products: TItem[] = productsData?.data || [];

	console.log('rendering ', page);
	return (
		<>
			{
				products.length > 0 &&
				<Stack width={1} pt={4} pb={4}>
					<ContentStack>
						<Stack gap={2} >
							<ProductItemGrid>
								{products.slice(21).map((item, index) => (
									<ProductItem
										key={index}
										item={item}
										showPrice={true}
										isCircularImage={false}
										fullDetails
										fontSize="24px"
										fontWeight="600"
									/>
								))}
							</ProductItemGrid>
						</Stack>
					</ContentStack>
				</Stack>
			}
		</>
	);
}

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	width: '100%',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(4),
	padding: `0px ${theme.spacing(.3)}`,
	gridAutoFlow: 'row dense',
	gridTemplateColumns: "repeat(5,220PX)",
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(4,220PX)",
		columnGap: theme.spacing(1.5),
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		padding: `0px ${theme.spacing()}`,
		gridTemplateColumns: "repeat(4,minmax(185px, 220px))",
	},
	[theme.breakpoints.down(CUSTOM_893_WIDTH)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(1.5),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(3,minmax(185px, 220px))",
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(1.5),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(3,minmax(155px, 220px))",
	},
	[theme.breakpoints.down(690)]: {
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(2),
		padding: `0px ${theme.spacing(.3)}`,
		gridTemplateColumns: "repeat(2,minmax(155px, 220px))",
	},
	[theme.breakpoints.down(447)]: {
		columnGap: theme.spacing(1),
		justifyContent: 'space-around',
		gridTemplateColumns: "repeat(2, minmax(150px, auto))",
	}
}));