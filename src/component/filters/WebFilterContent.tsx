import { FilterItem, WebOnlyView } from "#component/CommonViews.tsx";
import { ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { Stack, List, Typography, Grid2 as Grid, styled, Link, ListItem, ListItemButton } from "@mui/material";

export default function WebFilterContent() {
	const [selectedFilterProduct, setSelectedFilterProduct] = useState<string>('New products');
	const productFilters = ['New products', 'Kobo specials', 'Flours', 'Staples', 'Oil'];
	const handleSelectFilterProduct = (filterProduct: string) => () => {
		setSelectedFilterProduct(filterProduct);
	};
	return (
		<WebOnlyView>
			<Stack direction={'row'} flexGrow={1}>
				<Stack borderRight={1} borderColor={'divider'}>
					<Stack  borderColor={'divider'} pb={1} pt={2}>
						<List>
							{productFilters.map((filter, index) => (
								<ProductFilterListItem key={index}>
									<ProductFilterListItemButton $isActive={selectedFilterProduct === filter} onClick={handleSelectFilterProduct(filter)}>
										{filter}
									</ProductFilterListItemButton>
								</ProductFilterListItem>
							))}
						</List>
					</Stack>
				</Stack>
				<Stack width={'500px'} p={3.5} pt={2}>
					<StyledFilterLink underline="none" href="">
						<Stack direction={'row'} alignItems={'center'}>
							<Typography fontFamily={'Roboto'} fontSize={'16px'} fontWeight={'600'}>
								{selectedFilterProduct} 
							</Typography>
							<ChevronRight />
						</Stack>
					</StyledFilterLink>
					<Stack pt={4}>
						<Grid container spacing={4}>
							<Grid>
								<FilterItem title={"Kilishi"} imageSrc={""} />
							</Grid>
							<Grid >
								<FilterItem title={"Cameroon Pepper"} imageSrc={""} />
							</Grid>
							<Grid >
								<FilterItem title={"Cray Fish"} />
							</Grid>
							<Grid >
								<FilterItem title={"Water Leaf"}  />
							</Grid>
							<Grid >
								<FilterItem title={"Local Spice"}  />
							</Grid>
							<Grid >
								<FilterItem title={"Palm Oil"} />
							</Grid>
							<Grid >
								<FilterItem title={"Beans Flour"} />
							</Grid>
							<Grid >
								<FilterItem title={"Cocoyam Flour"} />
							</Grid>
							<Grid >
								<FilterItem title={"Yellow Garri"} />
							</Grid>
							<Grid >
								<FilterItem title={"Ijebu White Garri"} />
							</Grid>
							<Grid >
								<FilterItem title={"Ofada Rice"}  />
							</Grid>
							<Grid >
								<FilterItem title={"Dried Panla fish"}  />
							</Grid>
							<Grid >
								<FilterItem title={"Orijin Bitter"} />
							</Grid>
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
	backgroundColor: $isActive ? theme.palette.menuBackground.main : 'inherit',
	fontWeight: $isActive ? '600' : '400',
	fontFamily: 'Roboto',
	fontSize: '14px',
	paddingLeft: theme.spacing(1)
}));


const StyledFilterLink= styled(Link)(({ theme }) => ({
	color: theme.palette.primaryBlack.main
}));