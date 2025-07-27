import { AllMobileOnlyView, FilterItem } from "#component/CommonViews.tsx";
import { useAppSelector } from "#state-management/hooks.ts";
import { selectProductCategories } from "#state-management/slices/active-menu.slice.ts";
import { Stack, Grid, List, ListItem, ListItemButton, Typography, Divider } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

const hambugerMenu = [
	{ title: 'Create Account', route: '/signup' },
	{ title: 'Track Order', route: '/track' },
	{ title: 'Shipping and Delivery', route: '/' },
	{ title: 'Chat with us', route: '/' },
	{ title: 'Support and safety', route: '/' },
	{ title: 'About Kobobasket', route: '/' }
];
export default function MobileFilterContent() {
	const categories = useAppSelector(selectProductCategories).slice(1);
	const navigate = useNavigate();
	return (
		<AllMobileOnlyView>
			<Stack pt={4} width={'290px'} gap={5}>
				<Grid container spacing={4}>
					{/* <Grid>
						<FilterItem title="New products" imageSrc="N" href="/category/new-products" />
					</Grid> */}
					{
						categories.map((category, index) => <Grid key={index}> <FilterItem title={category.name} imageSrc={category.image} href={`/category/${category.name}`} /> </Grid>)
					}
				</Grid>

				<Stack gap={2}>
					<Divider />
					<List disablePadding>
						{
							hambugerMenu.map((menu, index) => <ListItem key={index} disablePadding>
								<ListItemButton onClick={() => {
									navigate({
										to: menu.route
									});
								}}>
									<Typography fontFamily={'Roboto'} fontSize={'16px'}>{menu.title}</Typography>
								</ListItemButton>
							</ListItem>)
						}
					</List>
				</Stack>
			</Stack>
		</AllMobileOnlyView>
	);
}