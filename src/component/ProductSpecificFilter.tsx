import { FilterList } from "@mui/icons-material";
import { Stack, Chip, Button, Typography, styled, Divider, Box, Dialog, DialogContent } from "@mui/material";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu, selectProductCategories, selectIsShowHeader } from "#state-management/slices/active-menu.slice.ts";
import { useState } from "react";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { CheckBoxFilters } from "./GeneralFilter";
import { upperFirst } from 'lodash';

export default function ProductSpecificFilter({ onFilterChange }: { onFilterChange: (key: string, value: string, type: 'add' | 'remove') => void }) {
	const isShowHeader = useAppSelector(selectIsShowHeader);
	const activeMenu = useAppSelector(selectActiveMenu);
	const productCategories = useAppSelector(selectProductCategories);
	const [openMobileFilter, setOpenMobileFilter] = useState<boolean>(false);
	const filtersGroup = {
		weight: ['500g', '2kg', '5kg', '7kg'],
		price: ['20$ to 50$', '51$ to 100$', '101$ to 200$', '200$ and above']
	};

	const [appliedFilters, setAppliedFilters] = useState<Set<string>>(new Set());

	const handleRemoveFilter = (filter: string) => () => {
		const [value, key] = filter.split('=>');
		appliedFilters.delete(filter);
		setAppliedFilters(new Set(appliedFilters));
		onFilterChange(key, value, 'remove');

	};

	const handleUpdateFilter = (key: string, filter: string) => () => {
		const filterWithKey = filter + '=>' + key;
		if (appliedFilters.has(filterWithKey)) {
			handleRemoveFilter(filterWithKey)();
			return;
		}
		appliedFilters.add(filterWithKey);
		setAppliedFilters(new Set(appliedFilters));
		onFilterChange(key, filter, 'add');
	};

	const handleOpenMobileFilter = () => {
		setOpenMobileFilter(true);
	};

	const handleCancel = () => {
		setOpenMobileFilter(false);
	};

	return (
		<ProductFilterStack $isShowHeader={isShowHeader} gap={2}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
				<CategoryTitle>
					{upperFirst(productCategories[activeMenu]?.name || '')}
				</CategoryTitle>
				<StyledMobileFilter>
					<StyledFilterButton variant="text" endIcon={<FilterList />} color="inherit" onClick={handleOpenMobileFilter}>
						Filter
					</StyledFilterButton>
				</StyledMobileFilter>
			</Stack>
			<Custom_Under_955_View>
				<Stack direction={'row'} flexWrap={"wrap"} gap={2}>
					{Array.from(appliedFilters).map(filter => {
						const indexOf = filter.indexOf('=>');
						return <Chip key={"chip_" + filter} label={upperFirst(filter.slice(0, indexOf))} onDelete={handleRemoveFilter(filter)} />;
					})}
				</Stack>
			</Custom_Under_955_View>
			<Custom_955_View>
				<Divider />
				<CheckBoxFilters filtersGroup={filtersGroup} handleUpdateFilter={handleUpdateFilter} appliedFilters={appliedFilters} />
			</Custom_955_View>
			<Dialog open={openMobileFilter} onClose={handleCancel}>
				<DialogContent sx={{ width: '300px', height: '500px' }}>
					<CheckBoxFilters filtersGroup={filtersGroup} handleUpdateFilter={handleUpdateFilter} appliedFilters={appliedFilters} />
				</DialogContent>
			</Dialog>
		</ProductFilterStack>
	);
}


const ProductFilterStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$isShowHeader'
})<{ $isShowHeader: boolean }>(({ theme, $isShowHeader }) => ({
	top: $isShowHeader ? 'unset' : '0px',
	backgroundColor: 'white',
	width: '250px',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(),
	paddingTop: theme.spacing(),
	[theme.breakpoints.down(955)]: {
		margin: 'auto',
		paddingLeft: '2px',
		paddingRight: '0px',
		...($isShowHeader ? { position: 'relative', width: '92%', backgroundColor: 'transparent', zIndex: '0' } :
			{
				position: 'fixed',
				top: '0px',
				zIndex: theme.zIndex.appBar,
				backgroundColor: 'white',
				paddingLeft: theme.spacing(2),
				paddingRight: theme.spacing(2),
				paddingBottom: theme.spacing(),
				boxShadow: theme.shadows[4],
				width: '100%',
			}
		),
		height: 'unset',


	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(2.5),
	},
	[theme.breakpoints.down(599)]: {
		margin: 'auto',

		...($isShowHeader ? { position: 'relative', width: '98%' } :
			{
				width: '100%',
			}
		),
	}
}));

const Custom_955_View = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down(955)]: {
		display: 'none'
	}
}));

const Custom_Under_955_View = styled(Box)(({ theme }) => ({
	[theme.breakpoints.up(955)]: {
		display: 'none'
	}
}));

const StyledMobileFilter = styled('span')(({ theme }) => ({
	display: 'none',
	[theme.breakpoints.down(955)]: {
		display: 'inline'
	}
}));

const StyledFilterButton = styled(Button)(() => ({
	textTransform: 'capitalize',
	fontSize: '16px',
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
	fontFamily: 'Alata',
	fontWeight: '400',
	fontSize: '24px',
	lineHeight: '133.4%',
	textAlign: 'center',
	letterSpacing: '1px',
	color: theme.palette.primaryGreen.main,
}));

