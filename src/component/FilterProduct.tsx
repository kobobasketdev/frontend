import { Button, Checkbox, Drawer, FormControlLabel, FormGroup, Grid2 as Grid, IconButton, List, ListItem, ListItemButton, Stack, Typography, styled } from "@mui/material";
import FilterSvg from "./svg/FilterSvg";
import { useState } from "react";
import { TABLET_BREAKPOINT, XTRA_SMALL_PHONE_BREAKPOINT } from "#constants.tsx";
import { ChevronRight, HighlightOff } from "@mui/icons-material";
import { DropDownView, FilterItem } from "./CommonViews";

export default function FilterProduct() {
	const [open, setOpen] = useState(false);
	const [selectedFilterProduct, setSelectedFilterProduct] = useState<string>('New products');
	const signedInUserName = 'Jessica';
	const productFilters = ['New products', 'Kobo specials', 'Flours', 'Staples', 'Oil'];
	const weigthFilters = ['500g', '2kg', '5kg', '7kg'];
	const priceFilters = ['20$ to 50$', '51$ to 100$', '101$ to 200$', '200$ and above'];
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};
	const handleSelectFilterProduct = (filterProduct: string) => () => {
		setSelectedFilterProduct(filterProduct);
	};
	
	return(
		<div>
			<FilterButton startIcon={<FilterSvg />} onClick={toggleDrawer(true)}>
				<Typography>
					Filter
				</Typography>
			</FilterButton>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<Stack p={3} pt={1} height={1}>
					<Stack alignItems={'end'}>
						<IconButton onClick={toggleDrawer(false)}>
							<HighlightOff />
						</IconButton>
					</Stack>
					<Stack gap={1} borderBottom={1} pb={1} borderColor={'divider'}>
						<Typography fontFamily={'Alata'} fontSize={'24px'}>
							Hello {signedInUserName  || ', sign in'}
						</Typography>
						<Typography fontFamily={'Roboto'} fontSize={'16px'}>Shop by</Typography>
					</Stack>
					<Stack direction={'row'} flexGrow={1}>
						<Stack borderRight={1} borderColor={'divider'}>
							<Stack borderBottom={1} borderColor={'divider'} pb={1} pt={2}>
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
						</Stack>
						<Stack width={'500px'} p={3.5} pt={2}>
							<Stack direction={'row'} alignItems={'center'}>
								<Typography fontFamily={'Roboto'} fontSize={'16px'} fontWeight={'600'}>
									{selectedFilterProduct} 
								</Typography>
								<ChevronRight />
							</Stack>
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
				</Stack>
			</Drawer>
		</div>
	);
}

const FilterButton = styled(Button)(({ theme }) => ({
	color: theme.palette.primaryBlack.lightshade,
	border: `1px solid ${theme.palette.primaryOrange.main}`,
	textTransform: 'inherit',
	borderRadius: theme.shape.borderRadius * 1.5,
	'& p': {
		fontFamily: 'Roboto',
		fontSize: '16px',
		letterSpacing: '0.15px'
	},
	[theme.breakpoints.between('xs', TABLET_BREAKPOINT)]: {
		'& p': {
			display: 'none',
		},
		borderRadius: theme.shape.borderRadius * 10,
		width: '38px',
		paddingLeft: theme.spacing(2.2),
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 'unset'
	},
	[theme.breakpoints.between('xs', XTRA_SMALL_PHONE_BREAKPOINT)]: {
		'& p': {
			display: 'inline',
			fontSize: '12px',
		},
		borderRadius: theme.shape.borderRadius * 10,
		width: 'auto',
		paddingLeft: theme.spacing(1.5),
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 'unset'
	}
}));

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

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	'.MuiTypography-root': {
		color: theme.palette.primaryBlack.main,
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: '16px',
		letterSpacing: '0.15px'
	}
}));