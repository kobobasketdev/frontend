import { Button, Stack, styled } from "@mui/material";
import { DESKTOP_SCREEN_MAX_WIDTH, MEDIUM_SCREEN_MAX_WIDTH } from "#constants.tsx";

import InitialMarketPlace from "#component/InitialMarketPlace.tsx";
import MoreMarketPlace from "#component/MoreMarketPlace.tsx";
import { memo, useState } from "react";

const MemoInitialMarketPlace = memo(InitialMarketPlace);
const MemoMoreMarketPlace = memo(MoreMarketPlace);
export default function MarketPlace() {
	const [page, setPage] = useState<number>(1);
	const handleLoadMore = () => {
		setPage(prev => prev + 1);
	};
	return (
		<StyledStackContent>
			<Stack width={1}>
				<Banner>
				</Banner>
				<div>
					<MemoInitialMarketPlace key={'inital'} />
					{
						Array(page).fill('').map((_, index) => (
							<MemoMoreMarketPlace key={index} page={(index + 1)} />
						))
					}
				</div>
				<Stack alignItems={'center'}>
					<StyledButton onClick={handleLoadMore} variant="outlined" color="inherit" size="small" >VIEW MORE PRODUCTS</StyledButton>
				</Stack>
			</Stack>
		</StyledStackContent>
	);
}

const StyledStackContent = styled(Stack)(({ theme }) => ({
	paddingTop: theme.spacing(16),
	[theme.breakpoints.down(DESKTOP_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(23.5)
	},
	[theme.breakpoints.down(MEDIUM_SCREEN_MAX_WIDTH)]: {
		paddingTop: theme.spacing(20)
	},
}));

const Banner = styled('div')(({ theme }) => ({
	width: '100%',
	backgroundColor: theme.palette.divider,
	height: '279px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.action.hover
}));

