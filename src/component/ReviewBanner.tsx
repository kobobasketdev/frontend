import { theme } from "#customtheme.ts";
import { Stack, Typography, Rating } from "@mui/material";
import RatingDisplay from "./RatingDisplay";
import { TItem } from "./types";

type TAlignment = 'left' | 'center';
export default function ReviewBanner({ item, align = 'center'  }: { item: TItem, align?: TAlignment }) {
	return (
		<Stack>
			<Stack pt={1}>
				<Typography fontWeight={'600'} fontSize={'28px'} color="rgba(27, 31, 38, 0.72)" textAlign={align}>
					{item.reviewCount} Reviews
				</Typography>
				<Typography color='#625B71' textAlign={align}>
					Average rating
				</Typography>
				<Stack alignItems={align} justifyContent={align} direction={'row'} gap={1}>
					<Typography fontSize={'24px'} color={theme.palette.primaryGreen.moreDeeper} fontWeight={'600'}>
						{item.rating}
					</Typography> 
					<Rating readOnly value={Math.floor(item.rating!) + .5} size="large" precision={.5}/>
				</Stack>
			</Stack>
			<Stack>
				<RatingDisplay 
					ratingBank={item.ratingBank!}
				/>
			</Stack>
		</Stack>
	);
}