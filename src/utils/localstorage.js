export function setData(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key) {
	try {
		const data = localStorage.getItem(key);
		return data && JSON.parse(data);
	} catch (ex) {
		return undefined;
	}
}
