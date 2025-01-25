import { AllMobileOnlyView, FilterItem } from "#component/CommonViews.tsx";
import { Stack, Grid2 as Grid } from "@mui/material";

export default function MobileFilterContent() {
	const productFilters = ['New products', 'Kobo specials', 'Flours', 'Staples', 'Oil'];

	return (
		<AllMobileOnlyView>
			<Stack pt={4} width={'290px'} >
				<Grid container spacing={4}>
					{
						productFilters.map((product, index) => <Grid key={index}> <FilterItem title={product} imageSrc="" /> </Grid> )
					}
				</Grid>
			</Stack>
		</AllMobileOnlyView>
	);
}