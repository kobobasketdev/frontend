import { TItem, TReview } from "./component/types";

export const items: TItem[] = [
	{
		productId: 1, 
		name: 'Ofada Rice1', 
		weight: { value: 2, measurement: 'kg' }, 
		isWishListItem: false,
		category: 'flour',
		price: 22, 
		productDetails: `<b>Discover the rich</b>, authentic flavor of traditional pounded yam with Kobobasket Poundo Yam Flour. Perfect for busy families and food lovers, this premium flour ensures quick and easy preparation while delivering unmatched taste and quality.`,
		productDescription: 'Lorem ipsum dolor sit amet consectetur. Commodo morbi diam mauris nibh nibh vitae vestibulum pellentesque euismod. Curabitur pellentesque consequat elementum blandit euismod. Placerat faucibus dignissim porta sodales.',
		locationPrice: 35, 
		images: ["", "", ''],
		rating: 4.8,
		reviewCount: 18,
		soldCount: 23,
		likeCount: 23,
		bestSellerCategory: 'Flour',
		variations: [
			{
				price: 22,
				locationPrice: 35,
				weight: { value: 2, measurement: 'kg' },
			},
			{
				locationPrice: 56,
				price: 50,
				weight: { value: 5, measurement: 'kg' },
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
		productId: 2, 
		name: 'Smoked Panla Fish', 
		weight: { value: 3, measurement: 'kg' }, 
		price: 15, 
		isWishListItem: false,
		category: '',
		locationPrice: 30, 
		images: [""], 
		promotion: { 
			promoName: "Valentine's Deals", 
			promoPrice: 10 
		},
		variations: [
			{
				price: 15,
				weight: { value: 3, measurement: 'kg' },
			}
		],
	},
	{
		productId: 24, 
		name: 'Ijebu Garri', 
		weight: { value: 3, measurement: 'kg' }, 
		price: 15, 
		isWishListItem: false,
		category: '',
		locationPrice: 30, 
		images: [""], 
		variations: [
			{
				price: 15,
				weight: { value: 3, measurement: 'kg' },
			}
		],
	},
	{
		productId: 5, 
		name: 'Dried Ugwu Leaf', 
		weight: { value: 3, measurement: 'kg' },
		price: 15, 
		isWishListItem: false,
		category: '',
		locationPrice: 20, 
		images: [""], 
		variations: [
			{
				price: 15,
				weight: { value: 3, measurement: 'kg' },
			}
		],
	},
	{
		productId: 3, 
		name: 'Cameroon Pepper',  
		weight: { value: 500, measurement: 'g' },
		isWishListItem: false,
		category: '',
		price: 29, 
		locationPrice: 35, 
		images: [""], 
		promotion: { 
			promoName: 'Kobo Specials', 
			promoPrice: 10 
		},
		variations: [
			{
				price: 29,
				weight: { value: 500, measurement: 'g' },
			}
		],
	},
	{
		productId: 6, 
		name: 'Periwinkle', 
		weight: { value: 500, measurement: 'g' },
		isWishListItem: true,
		category: '',
		price: 29, 
		locationPrice: 35, 
		images: [""], 
		variations: [
			{
				price: 29,
				weight: { value: 500, measurement: 'g' },
			}
		],
	},
	{
		productId: 7, 
		name: 'Locust Beans (Iru)', 
		weight: { value: 800, measurement: 'g' },
		isWishListItem: false,
		category: '',
		price: 24, 
		locationPrice: 30, 
		images: [""], 
		variations: [
			{
				price: 24,
				weight: { value: 800, measurement: 'g' },
			}
		],
	},
	{
		productId: 9, 
		name: 'Orijin Bitter', 
		weight: { value: 0.1, measurement: 'kg' },
		isWishListItem: false,
		category: '',
		price: 9, 
		locationPrice: 15, 
		images: [""], 
		promotion: { 
			promoName: 'Kobo Specials', 
			promoPrice: 7 
		},
		variations: [
			{
				price: 9,
				weight: { value: 0.1, measurement: 'kg' },
			}
		],
	},
	{
		productId: 10, 
		name: 'Yellow Garri', 
		weight: { value: 1, measurement: 'kg' },
		isWishListItem: false,
		category: '',
		price: 24, 
		locationPrice: 30, 
		images: [""], 
		variations: [
			{
				price: 24,
				weight: { value: 1, measurement: 'kg' },
			}
		],
	},
	{
		productId: 11, 
		name: 'Beans Flour',
		weight: { value: 700, measurement: 'g' },
		isWishListItem: false,
		category: '',
		price: 22, 
		locationPrice: 28, 
		images: [""], 
		variations: [
			{
				price: 22,
				weight: { value: 700, measurement: 'g' },
			}
		],
	},
	{
		productId: 12, 
		name: 'Palm Oil', 
		weight: { value: 5, measurement: 'kg' },
		isWishListItem: false,
		category: '',
		price: 26, 
		locationPrice: 30, 
		images: [""], 
		promotion: { 
			promoName: 'Black friday', 
			promoPrice: 20 
		},
		variations: [
			{
				price: 26,
				weight: { value: 5, measurement: 'kg' },
			}
		],
	},
	{
		productId: 13, 
		name: 'Local Spice', 
		weight: { value: 2, measurement: 'kg' },
		isWishListItem: false,
		category: '',
		price: 15, 
		locationPrice: 24, 
		images: [""], 
		variations: [
			{
				price: 15,
				weight: { value: 2, measurement: 'kg' },
			}
		],
	},
	{
		productId: 14, 
		name: 'Water Leaf', 
		weight: { value: 500, measurement: 'g' },
		isWishListItem: false,
		category: '',
		price: 24, 
		locationPrice: 32, 
		images: [""], 
		variations: [
			{
				price: 24,
				weight: { value: 500, measurement: 'g' },
			}
		],
	},
	{
		productId: 15, 
		name: 'Cray Fish', 
		weight: { value: 5, measurement: 'kg' },
		isWishListItem: false,
		category: '',
		price: 30, 
		locationPrice: 35, 
		images: [""], 
		promotion: { 
			promoName: 'Kobo Specials', 
			promoPrice: 25 
		},
		variations: [
			{
				price: 30,
				weight: { value: 5, measurement: 'kg' },
			}
		],
	},
	{
		productId: 16, 
		name: 'Kilishi', 
		weight: { value: 500, measurement: 'g' },
		isWishListItem: false,
		category: '',
		price: 20, 
		locationPrice: 28, 
		images: [""], 
		variations: [
			{
				price: 20,
				weight: { value: 500, measurement: 'g' },
			}
		],
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