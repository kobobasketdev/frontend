import { TProductCategory } from "#component/types/index.js";

export const getFromLocalStorage = (key: string) : { [x: string]: unknown } => {
	try{
		const data = localStorage.getItem(key);
		return data ? { ...JSON.parse(data) } : {};
	}
	catch {
		return {};
	}
};

export const saveToLocalStorage = (key: string, value: unknown) => {
	try {
		const data = JSON.stringify(value);
		localStorage.setItem(key, data);
	}
	catch {
		//TODO: Add metric collection here
		console.log('fail silently');
	}
};

export const productCategories: TProductCategory[] = [
	{ description: '', id: 0, name: 'all', status: 'active' },
	// { description: '', id: 1, name: 'staples', status: 'active' },
	// { description: '', id: 2, name: 'flour', status: 'active' },
	// { description: '', id: 3, name: 'oils', status: 'active' },
	// { description: '', id: 4, name: 'beauty', status: 'active' },
	// { description: '', id: 5, name: 'spices', status: 'active' },
	// { description: '', id: 6, name: 'snacks', status: 'active' },
	// { description: '', id: 7, name: 'deals', status: 'active' }
];