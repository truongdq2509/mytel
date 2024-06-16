import Cookies from "universal-cookie";

const cookies = new Cookies();


export function getItemCookie(name) {
	return cookies.get(name);
}