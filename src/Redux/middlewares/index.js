import { getDataApi, postDataApi } from "../../config/service";

const serviceMiddleware = (store) => (next) => async (action) => {
	if (action?.meta) {
		const { method, url, query, callback } = action.meta;
		let res = null
		if (callback && typeof callback === 'function') {
			callback(null, true)
		}
		if (method === "GET") {
			res = await getDataApi(url, query);
		} else if (method === "POST") {
			res = await postDataApi(url, action.data, query)
		}
		const isCheckSuccess = res?.success === true;
		if (action.type === "UPLOAD_FILE") {
			if (callback && typeof callback === 'function') {
				callback(res, false)
			}
		}
		if (isCheckSuccess) {
			action.payload = res;
			if (callback && typeof callback === 'function') {
				callback(res, false)
			}
			next(action);
		} else {
			if (callback && typeof callback === 'function') {
				callback(null, false, res)
			}
		}
		return;
	}
	next(action);
};
export { serviceMiddleware };
