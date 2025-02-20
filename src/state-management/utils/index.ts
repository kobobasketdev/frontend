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

export const menus = ['ALL','STAPLES', 'FLOUR', 'OILS', 'BEAUTY', 'SPICES', 'SNACKS', 'DEALS'];