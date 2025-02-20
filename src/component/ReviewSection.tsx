import MobileReviewSection from "./MobileReviewSection";
import { TItem, TReview } from "./types";
import WebReviewSection from "./WebReviewSection";

export default function ReviewSection(props: { item: TItem, reviews: TReview[] }) {
	return (
		<>
			<MobileReviewSection {...props}/>
			<WebReviewSection {...props}/>
		</>
	);
}