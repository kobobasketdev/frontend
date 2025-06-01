import ProductItem from "#component/ProductItem.tsx";
import ProductSpecificFilter from "#component/ProductSpecificFilter.tsx";
import { TItem } from "#component/types/index.js";
import { LARGED_DESKTOP_SCREEN_MAX_WIDTH, TABLET_SCREEN_MAX_WIDTH, CUSTOM_893_WIDTH, MEDIUM_SCREEN_MAX_WIDTH, DESKTOP_SCREEN_MAX_WIDTH } from "#constants.tsx";
import fetcher from "#hooks/fetcher.ts";
import { Button, Pagination, Stack, styled } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type TFilters = {
	[x: string]: string
};

export default function ProductCategory({ categoryId }: { categoryId: number }) {
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<TFilters>({});
	const { data: productsCategoryData } = useQuery({
		queryKey: ['product', page, categoryId, { price: filters.price, weight: filters.weight }],
		queryFn: async () => fetcher.get(`v1/products?page=${page}&limit=40&productCategory=${categoryId}&price=${filters.price}&weight=${filters.weight}`),
		staleTime: 5400000,
		placeholderData: keepPreviousData
	});

	const products: TItem[] = productsCategoryData?.data || [];
	console.log(categoryId, 'is the Id');

	const onFilterChange = (key: string, value: string, type: 'add' | 'remove') => {
		let newValue = '';
		if (type === 'add') {
			newValue = filters[key] ? filters[key] + ',' + value : value;
		}
		else {
			newValue = filters[key]?.replace(',' + value, '').replace(value + ',', '').replace(value, '');
		}
		setFilters({
			...filters,
			[key]: newValue
		});
	};

	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<StyledStackContent>
			<StyledStack>
				<ProductSpecificFilter onFilterChange={onFilterChange} />
				<ProductCategoryStack width={1} gap={6} pt={4} pb={4}>
					<ContentStack>
						<ProductItemGrid>
							{products.map((item, index) => (
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
					</ContentStack>
					<StyledViewMoreStack alignItems={'center'} >
						{/* <StyledButton variant="outlined" color="inherit" size="small" >VIEW MORE PRODUCTS</StyledButton> */}
						<Pagination count={4} size="large" shape="rounded" onChange={handleChange} />
					</StyledViewMoreStack>
				</ProductCategoryStack>
			</StyledStack>
		</StyledStackContent>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	// paddingTop: theme.spacing(17),
	paddingTop: theme.spacing(15),
	[theme.breakpoints.down(1346)]: {
		paddingTop: theme.spacing(16.4),
	},
	[theme.breakpoints.down(1300)]: {
		paddingTop: theme.spacing(16),
	},
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23.5)
	},
	[theme.breakpoints.down(TABLET_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(22)
	},
	[theme.breakpoints.down(955)]: {
		paddingTop: theme.spacing(22.5)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(19)
	},
}));

const StyledStack = styled('div')(({ theme }) => ({
	flexDirection: 'row',
	display: 'flex',
	marginTop: theme.spacing(),
	[theme.breakpoints.down(955)]: {
		flexDirection: 'column',
	}
}));

const StyledViewMoreStack = styled(Stack)(({ theme }) => ({
	// width: 'calc(100% - 220px)',
	width: '100%',
	alignSelf: 'end',
	[theme.breakpoints.down(955)]: {
		alignSelf: 'unset'
	}
}));


const ProductCategoryStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(955)]: {
		width: '100%'
	}
}));



const ContentStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down(955)]: {
		width: 'fit-content',
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	[theme.breakpoints.down(447)]: {
		width: '100%',
	}
}));

const ProductItemGrid = styled('div')(({ theme }) => ({
	display: 'grid',
	rowGap: theme.spacing(3),
	columnGap: theme.spacing(3),
	gridAutoFlow: 'row dense',
	width: 'calc(100% - 220px)',
	gridTemplateColumns: "repeat(5, minmax(190px, 220px))",
	justifyContent: 'center',
	// alignSelf: 'end',
	alignSelf: 'center',
	[theme.breakpoints.down(1540)]: {
		gridTemplateColumns: "repeat(5, 210px)",
	},
	[theme.breakpoints.down(LARGED_DESKTOP_SCREEN_MAX_WIDTH)]: {
		gridTemplateColumns: "repeat(4, minmax(210px, auto))",
	},
	[theme.breakpoints.down(1114)]: {
		gridTemplateColumns: "repeat(3, minmax(220px, 250px))",
	},
	[theme.breakpoints.down(955)]: {
		alignSelf: 'unset',
		width: '100%',
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

const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover
}));