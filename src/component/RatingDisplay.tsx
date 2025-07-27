import { theme } from "#customtheme.ts";
import { Star } from "@mui/icons-material";
import { LinearProgress, linearProgressClasses, Stack, styled, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import millify from "millify";
import pluralize from "pluralize";

const ratings = ['5', '4', '3', '2', '1'];
export default function RatingDisplay({ ratingBank }: {
	ratingBank: {
		[x: string]: {
			percent: number,
			reviewCount: number
		}
	}
}) {
	return (
		<>
			<TableContainer sx={{ mt: 1, pb: 2, }}>
				<Table aria-label="rating table">
					<TableBody >
						{
							ratings.map((rate, index) => (
								<TableRow
									key={index}
									sx={{ '& td': { border: 0, padding: .5 } }}
								>
									<TableCell size="small" width={1}>
										<Stack direction={'row'} color={theme.palette.primaryBlack.disabled}>
											<Typography >
												{rate}
											</Typography>
											<Star fontSize="inherit" sx={{ height: '8px', width: '8px' }} />
										</Stack>
									</TableCell>
									<TableCell size="small" width={1}>
										<Stack direction={'row'} gap={.4}>
											<span>
												{/* {millify(ratingBank[rate]?.reviewCount || 0, {
													units: ['', 'k', 'm', 'b'],
													precision: 3,
												})}  */}
												0
											</span>
											<span>
												0
												{/* {pluralize('review', ratingBank[rate]?.reviewCount || 0 )} */}
											</span>
										</Stack>
									</TableCell>
									<TableCell size="small">
										<ReviewLinearProgress variant="determinate"
											value={0}
										// value={ratingBank[rate]?.percent || 0} 
										/>
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

const ReviewLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 5,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: '#D9D9D9',
		...theme.applyStyles('dark', {
			backgroundColor: '#D9D9D9',
		}),
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.primaryYellow.moreDeeper,
		...theme.applyStyles('dark', {
			backgroundColor: theme.palette.primaryYellow.moreDeeper,
		}),
	},
}));