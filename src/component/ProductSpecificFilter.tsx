import { FilterList } from "@mui/icons-material";
import { Stack, Chip, Button, Typography, styled, Checkbox, FormGroup, FormControlLabel, Divider } from "@mui/material";
import _ from "lodash";
import { AllMobileOnlyView, DropDownView, WebOnlyView } from "./CommonViews";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectActiveMenu, selectIsShowHeader } from "#state-management/slices/active-menu.slice.ts";
import { menus } from "#state-management/utils/index.ts";

export default function ProductSpecificFilter() {
	const isShowHeader = useAppSelector(selectIsShowHeader);
	const activeMenu = useAppSelector(selectActiveMenu);
	const weigthFilters = ['500g', '2kg', '5kg', '7kg'];
	const priceFilters = ['20$ to 50$', '51$ to 100$', '101$ to 200$', '200$ and above'];
	let appliedFilters: string[] = [];

	const handleRemoveFilter = (filter: string) => () => {
		appliedFilters = appliedFilters.filter(appliedFilter => appliedFilter !== filter);
	};
	return (
		<ProductFilterStack $isShowHeader={isShowHeader} gap={2}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
				<CategoryTitle>
					{menus[activeMenu]}
				</CategoryTitle>
				<StyledMobileFilter>
					<StyledFilterButton variant="text" endIcon={<FilterList />} color="inherit">
						Filter 
					</StyledFilterButton>
				</StyledMobileFilter>
			</Stack>
			<AllMobileOnlyView>
				<Stack direction={'row'} flexWrap={"wrap"}>
					{appliedFilters.map( filter => <Chip label={_.upperFirst(filter)} onDelete={handleRemoveFilter(filter)}/>)}
				</Stack>
			</AllMobileOnlyView>
			<WebOnlyView>
				<Divider />
				<Stack pb={2.5} pt={2.5} gap={2}>
					<DropDownView title="Weight">
						<FormGroup>
							{
								weigthFilters.map((weight, index) => 
									<StyledFormControlLabel key={index} control={<Checkbox size="small" />} label={weight} 
									/>
								)
							}
						</FormGroup>
					</DropDownView>

					<DropDownView title="Price">
						<FormGroup>
							{
								priceFilters.map((price, index) => 
									<StyledFormControlLabel key={index} control={<Checkbox size="small" />} label={price} 
									/>
								)
							}
						</FormGroup>
					</DropDownView>
				</Stack>
			</WebOnlyView>
		</ProductFilterStack>
	);
}

const ProductFilterStack = styled(Stack, {
	shouldForwardProp: prop => prop !== '$isShowHeader'
})<{ $isShowHeader: boolean }>(({ theme, $isShowHeader }) => ({
	margin: 'auto',
	position: 'fixed',
	top: $isShowHeader ? 'unset' : '10px',
	height: '100vmax',
	width: '220px',
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(),
	[theme.breakpoints.down(955)]: {
		position: 'relative',
		height: 'unset',
		width: '92%',
		paddingLeft: '0px',
		paddingRight: '0px',
	},
	[theme.breakpoints.down(599)]: {
		margin: 'auto',
		width: '98%',
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
	color: theme.palette.primaryBlack.main,
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	'.MuiTypography-root': {
		color: theme.palette.primaryBlack.main,
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: '16px',
		letterSpacing: '0.15px'
	}
}));