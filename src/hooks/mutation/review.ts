import fetcher from "#hooks/fetcher.ts";
import { useMutation } from "@tanstack/react-query";

export const useReviewMutation = () => {
	const markReviewHelpful = useMutation({
		mutationFn: (reviewId: string) => {
			return fetcher.post('v1/reviews/'+reviewId+'/helpful');
		},
		
	});

	return { markReviewHelpful };
};