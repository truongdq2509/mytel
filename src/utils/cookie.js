import Cookies from "universal-cookie";

const cookies = new Cookies();


export function getItemCookie(name) {
	return cookies.get(name);
}
export function getWinnerPopup() {
	return cookies.get("winner-popup");
}
export function setWinnerPopup(status, timeExpired = 3600) {
	cookies.set("winner-popup", status, {
		path: "/",
		maxAge: timeExpired,
	});
	window.localStorage.setItem("winner-popup", JSON.stringify(status));
}