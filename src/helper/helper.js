export const getUrlParamsFromJson = (data) => {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&");
};
export function checkImage(url) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send();
	request.onload = function () {
		if (request.status == 200) {
			return true;
		} else {
			return false;
		}
	}
}