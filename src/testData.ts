import { TItem, TReview } from "./component/types";

export const items: TItem[] = [
	{
		id: 1, 
		name: 'Ofada Rice1', 

		productDetails: `<b>Discover the rich</b>, authentic flavor of traditional pounded yam with Kobobasket Poundo Yam Flour. Perfect for busy families and food lovers, this premium flour ensures quick and easy preparation while delivering unmatched taste and quality.`,
		images: [{ id: 1, url: '' }, { id: 2, url: '' }, { id: 3, url: '' }],
		rating: 4.8,
		reviewCount: 18,
		soldCount: 23,
		likeCount: 23,
		category: {
			name: 'Staples'
		},
		variations: [
			{
				price: {
					converted: 22,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 35,
					currency: 'CAD',
					default: 35
				},
				weight: 2,
			},
			{
				marketPrice: {
					converted: 56,
					currency: 'CAD',
					default: 28
				},
				price: {
					converted: 50,
					currency: 'CAD',
					default: 28
				},
				weight: 5
			}
		],
		ratingBank: {
			5: {
				percent: 27.78,
				reviewCount: 5
			},
			4: {
				percent: 50,
				reviewCount: 9
			},
			3: {
				percent: 11.11,
				reviewCount: 2
			},
			1: {
				percent: 11.11,
				reviewCount: 2
			},
		}
	},
	{
		id: 2,
		name: 'Smoked Panla Fish',
		images: [{ id: 1, url: '' }],
		promotion: {
			promotionName: "Valentine's Deals",
			id: 1
		},
		variations: [
			{
				price: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 28,
					currency: 'CAD',
					default: 28
				},
				weight: 3
			}
		],
		category: {
			name: ""
		}
	},
	{
		id: 24,
		name: 'Ijebu Garri',
		images: [{ id: 1, url: '' }],
		variations: [
			{
				price: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				weight: 3
			}
		],
		category: {
			name: ""
		}
	},
	{
		id: 5,
		name: 'Dried Ugwu Leaf',


		images: [{ id: 1, url: '' }],
		variations: [
			{
				price: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				weight: 3
			}
		],
		category: {
			name: ""
		}
	},
	{
		id: 3,
		name: 'Cameroon Pepper',

		images: [{ id: 1, url: '' }],
		promotion: {
			promotionName: 'Kobo Specials',
			id: 2
		},
		variations: [
			{
				price: {
					converted: 29,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				weight: 0.5
			}
		],
		category: {
			name: ""
		}
	},
	{
		id: 6,
		name: 'Periwinkle',
		images: [{ id: 1, url: '' }],
		variations: [
			{
				price: {
					converted: 29,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 35,
					currency: 'CAD',
					default: 28
				},
				weight: 0.5
			}
		],
		category: {
			name: ""
		}
	},
	{
		id: 7,
		name: 'Locust Beans (Iru)',
		images: [{ id: 1, url: "" }],
		variations: [
			{
				price: {
					converted: 24,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				weight: 0.8
			}
		],
		category: {
			name: ""
		}
	},
	{
		id: 16,
		name: 'Kilishi',
		images: [{ id: 1, url: '' }],
		variations: [
			{
				price: {
					converted: 20,
					currency: 'CAD',
					default: 28
				},
				marketPrice: {
					converted: 15,
					currency: 'CAD',
					default: 28
				},
				weight: 0.5
			}
		],
		category: {
			name: ""
		}
	}
]; 

export const reviews: TReview[] = [
	{
		id: '1',
		name: 'Peter Doe',
		content: 'Lorem ipsum dolor sit amet consectetur. er Vitae vestibulum amet ac nibh sed aliquam. Mattis enim augue odio tellus tincidunt ede ',
		date: '2024-10-28',
		heading: 'Tasty Flavour',
		rating: 4,
	},
	{
		id: '2',
		name: 'John Doe',
		content: 'Lorem ipsum dolor sit amet consectetur. er Vitae vestibulum amet ac nibh sed aliquam. Mattis enim augue odio tellus tincidunt ede',
		date: '2024-10-28',
		heading: 'Fast Delivery',
		rating: 5,
		images: ['', '', '', ''],
		helpfulCount: 2
	},
	{
		id: '3',
		name: 'Owen Mike',
		content: 'Lorem ipsum dolor sit amet consectetur. er Vitae vestibulum amet ac nibh sed aliquam. Mattis enim augue odio tellus tincidunt ede ',
		date: '2024-10-28',
		heading: 'Tasty Flavour',
		rating: 3,
		images: ['', '', '', ''],
	},
	{
		id: '4',
		name: 'Jame Thomas',
		content: 'Lorem ipsum dolor sit amet consectetur. er Vitae vestibulum amet ac nibh sed aliquam. Mattis enim augue odio tellus tincidunt ede',
		date: '2024-10-28',
		heading: 'Fast Delivery',
		rating: 2,
		helpfulCount: 2
	},
	{
		id: '5',
		name: 'Vlad Tara',
		content: 'Lorem ipsum dolor sit amet consectetur. er Vitae vestibulum amet ac nibh sed aliquam. Mattis enim augue odio tellus tincidunt ede ',
		date: '2024-10-28',
		heading: 'Tasty Flavour',
		rating: 4,
		images: ['', ''],
	},
	{
		id: '6',
		name: 'Kate J.',
		content: 'Lorem ipsum dolor sit amet consectetur. er Vitae vestibulum amet ac nibh sed aliquam. Mattis enim augue odio tellus tincidunt ede',
		date: '2024-10-28',
		heading: 'Fast Delivery',
		rating: 2,
		
		helpfulCount: 2
	}
];