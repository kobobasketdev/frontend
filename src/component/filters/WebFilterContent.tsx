import { FilterItem, WebOnlyView } from "#component/CommonViews.tsx";
import { ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { Stack, List, Typography, Grid, styled, Link, ListItem, ListItemButton } from "@mui/material";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectProductCategories } from "#state-management/slices/active-menu.slice.ts";
import { capitalize } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getCategoryItems, TFilterSelect } from ".";
import { TItem } from "../types";

export default function WebFilterContent() {
	const categories = useAppSelector(selectProductCategories).slice(1);
	const [selectedFilterProduct, setSelectedFilterProduct] = useState<TFilterSelect>({ name: categories[0].name, id: categories[0].id });
	const { data } = useQuery(getCategoryItems(selectedFilterProduct.id));
	const previewItems: TItem[] = data?.data.data;
	const handleSelectFilterProduct = (filterProduct: TFilterSelect) => () => {
		setSelectedFilterProduct(filterProduct);
	};
	return (
		<WebOnlyView>
			<Stack direction={'row'} flexGrow={1}>
				<Stack borderRight={1} borderColor={'divider'}>
					<Stack borderColor={'divider'} pb={1} pt={2}>
						<List>
							{/* <ProductFilterListItem key={'new-products'}>
								<ProductFilterListItemButton $isActive={selectedFilterProduct.name.toLowerCase() === 'new-products'} onClick={handleSelectFilterProduct({ name: 'new-products' })}>
									{capitalize('new products')}
								</ProductFilterListItemButton>
							</ProductFilterListItem> */}
							{categories.map(category => (
								<ProductFilterListItem key={category.id}>
									<ProductFilterListItemButton $isActive={selectedFilterProduct.id === category.id} onClick={handleSelectFilterProduct({ id: category.id, name: category.name })}>
										{capitalize(category.name)}
									</ProductFilterListItemButton>
								</ProductFilterListItem>
							))}
						</List>
					</Stack>
				</Stack>
				<Stack width={'500px'} p={3.5} pt={2}>
					<StyledFilterLink underline="none" href={`/category/${selectedFilterProduct.name}`}>
						<Stack direction={'row'} alignItems={'center'}>
							<Typography fontFamily={'Roboto'} fontSize={'16px'} fontWeight={'600'}>
								{capitalize(selectedFilterProduct.id ? selectedFilterProduct.name : '')}
							</Typography>
							<ChevronRight />
						</Stack>
					</StyledFilterLink>
					<Stack pt={4}>
						<Grid container spacing={4}>
							{
								previewItems && previewItems.slice(0, 20).map(item => <Grid key={item.id}>
									<FilterItem title={item.name} imageSrc={item.images[0]?.url || ''} href={`/products/${item.id}`} />
								</Grid>)
							}
						</Grid>
					</Stack>
				</Stack>
			</Stack>
		</WebOnlyView>
	);
}

const ProductFilterListItem = styled(ListItem)(({ theme }) => ({
	padding: '0px',
	width: '200px',
	marginBottom: theme.spacing(1)
}));

const ProductFilterListItemButton = styled(ListItemButton, {
	shouldForwardProp: prop => prop !== '$isActive'
})<{ $isActive: boolean }>(({ theme, $isActive }) => ({
	backgroundColor: $isActive ? theme.palette.primaryGreen.light : 'inherit',
	fontWeight: $isActive ? '600' : '400',
	fontFamily: 'Roboto',
	fontSize: '14px',
	paddingLeft: theme.spacing(1)
}));


const StyledFilterLink = styled(Link)(({ theme }) => ({
	color: theme.palette.primaryBlack.main
}));