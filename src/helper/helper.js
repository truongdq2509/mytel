export const getUrlParamsFromJson = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&");
};
export async function checkImage(url) {

	const res = await fetch(url);
	const buff = await res.blob();
	return buff.type.startsWith('image/')
}