import { http, HttpResponse } from 'msw';

export const mutationHandlers = [
	http.post(
		/v1\/(forgot-password|reset-password)/, 
		() => {
			return HttpResponse.json();
		}),

	// http.post(/v1\/(verify-email|login)/, async ({ request }) => {
	// 	const body = await request.json() as { email: string };
		
	// 	return HttpResponse.json({
	// 		token: { type: 'bearer', token: '<AUTH_TOKEN>' },
	// 		user: {
	// 			email: body.email,
	// 			firstName: 'Mike',
	// 			lastName: 'John',
	// 			// residentialAddresses: [
					
	// 			// 	{
	// 			// 		province: '',
	// 			// 		city: 'London',
	// 			// 		postalCode: 'EC1Y 8SY',
	// 			// 		phone: '+44 230-948-9829',
	// 			// 		address: '49 Featherstone Street',
	// 			// 		country: 'United Kingdom', 
	// 			// 		firstName: 'Walter',
	// 			// 		lastName: 'Brown',
	// 			// 	},
	// 			// 	{
	// 			// 		province: 'Ontario',
	// 			// 		city: 'Kitchener',
	// 			// 		postalCode: 'N5L 1S3',
	// 			// 		phone: '+1 230-948-9829',
	// 			// 		address: '119 Lorem Ipsum street',
	// 			// 		country: 'Canada', 
	// 			// 		firstName: 'John',
	// 			// 		lastName: 'Doe',
	// 			// 		isDefault: true
	// 			// 	},
	// 			// ]
	// 		}
	// 	});
	// }),

	http.put(/v1\/user\/profile/, async({ request }) => {
		const body = await request.json() as { firstName: string, lastName: string };
		return HttpResponse.json({
			...body
		});
	}),

	http.post(/v1\/address/, () => {
		return HttpResponse.json({
			id: `asdf${Math.round(Math.random() * 90)}`,
			defaultAddressId: 'asdf88'
		});
	}),

	// http.get(/v1\/products\/search/, () => {
	// 	return HttpResponse.json({
	// 		items: [
	// 			{
	// 				id: 1,
	// 				name: 'Oil'
	// 			}
	// 		]
	// 	});
	// })
];