import { Stack, SvgIcon, Typography } from "@mui/material";
import { StyledProfileButton, StyledProfileNavContent } from "./CommonViews";
import TrackOrderSvg from "./svg/TrackOrderSvg";
import HelpCenterSvg from "./svg/HelpCenterSvg";
import { useNavigate } from "@tanstack/react-router";

export default function TrackFaqContent({ highlight }: { highlight: string }) {
	const navigate = useNavigate();
	return (
		<Stack gap={2} pt={2} className="track-faq">
			<StyledProfileButton onClick={() => {
				navigate({
					to: '/track'
				});
			}} $isActive={highlight === 'track'} variant="text" sx={{ textTransform: 'inherit', color: 'black', minWidth: '100px' }}>
				<StyledProfileNavContent>
					<SvgIcon viewBox="0 2 22 22">
						<TrackOrderSvg />
					</SvgIcon>
					<Typography>
						Track Order
					</Typography>
				</StyledProfileNavContent>
			</StyledProfileButton>
			<StyledProfileButton onClick={() => {
				navigate({
					to: '/faq'
				});
			}} $isActive={highlight === 'faq'} variant="text" sx={{ textTransform: 'inherit', color: 'black', minWidth: '100px' }}>
				<StyledProfileNavContent>
					<SvgIcon viewBox="0 2 14 14">
						<HelpCenterSvg />
					</SvgIcon>
					<Typography>
						Help Cener
					</Typography>
				</StyledProfileNavContent>
			</StyledProfileButton>
		</Stack>
	);
}