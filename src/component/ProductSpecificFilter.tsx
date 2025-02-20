import { FilterList } from "@mui/icons-material";
import { Stack, Chip, Button, Typography, styled, Divider, Box, Dialog, DialogContent } from "@mui/material";
import _ from "lodash";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu, selectIsShowHeader } from "#state-management/slices/active-menu.slice.ts";
import { menus } from "#state-management/utils/index.ts";
import { useState } from "react";
import { MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";
import { CheckBoxFilters } from "./GeneralFilter";

export default function ProductSpecificFilter() {
	const isShowHeader = useAppSelector(selectIsShowHeader);
	const activeMenu = useAppSelector(selectActiveMenu);
	const [openMobileFilter, setOpenMobileFilter] = useState<boolean>(false);
	const filtersGroup = {
		weight: ['500g', '2kg', '5kg', '7kg'],
		price:  ['20$ to 50$', '51$ to 100$', '101$ to 200$', '200$ and above']
	};

	const [appliedFilters, setAppliedFilters] = useState<Set<string>>(new Set());

	const handleRemoveFilter = (filter: string) => () => {
		appliedFilters.delete(filter);
		setAppliedFilters(new Set(appliedFilters));
	};

	const handleUpdateFilter = (filter: string) => () => {
		if(appliedFilters.has(filter)) {
			handleRemoveFilter(filter)();
			return;
		}
		appliedFilters.add(filter);
		setAppliedFilters(new Set(appliedFilters));
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
					{menus[activeMenu]}
				</CategoryTitle>
				<StyledMobileFilter>
					<StyledFilterButton variant="text" endIcon={<FilterList />} color="inherit" onClick={handleOpenMobileFilter}>
						Filter 
					</StyledFilterButton>
				</StyledMobileFilter>
			</Stack>
			<Custom_Under_955_View>
				<Stack direction={'row'} flexWrap={"wrap"} gap={2}>
					{Array.from(appliedFilters).map( filter => <Chip key={"chip_"+filter} label={_.upperFirst(filter)} onDelete={handleRemoveFilter(filter)}/>)}
				</Stack>
			</Custom_Under_955_View>
			<Custom_955_View>
				<Divider />
				<CheckBoxFilters filtersGroup={filtersGroup} handleUpdateFilter={handleUpdateFilter} appliedFilters={appliedFilters}/>
			</Custom_955_View>
			<Dialog open={openMobileFilter} onClose={handleCancel}>
				<DialogContent sx={{ width: '300px', height: '500px' }}>
					<CheckBoxFilters filtersGroup={filtersGroup} handleUpdateFilter={handleUpdateFilter} appliedFilters={appliedFilters}/>
				</DialogContent>
			</Dialog>
		</ProductFilterStack>
	);
}


const ProductFilterStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$isShowHeader'
})<{ $isShowHeader: boolean }>(({ theme, $isShowHeader }) => ({
	margin: 'auto',
	position: 'fixed',
	top: $isShowHeader ? 'unset' : '0px',
	height: '100vmax',
	backgroundColor: 'white',
	width: '220px',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(),
	paddingTop: theme.spacing(),
	zIndex: theme.zIndex.appBar, 
	[theme.breakpoints.down(955)]: {
		paddingLeft: '2px',
		paddingRight: '0px',
		...($isShowHeader ? { position: 'relative', width: '92%', backgroundColor: 'transparent', zIndex:'0' } : 
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

