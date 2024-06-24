
import API_PATH from '../../../config/API_PATH'
import { GET_AUCTION_RECORD, GET_CURRENT_USER, GET_LIST_PACKAGE, GET_PACKAGE_HISTORY, GET_TURN_REMAIN, LOGIN_OTP, LOGIN_PASSWORD, LOGOUT_USER, REGISTER_RETAIL_PACKAGE, REGISTER_SUB_PACKAGE, REQUEST_OTP, UPDATE_PASSWORD, VERIFY_OTP, VERIFY_OTP_PASSWORD } from './contants'


export const getCurrentUser = data => {
	return {
		type: GET_CURRENT_USER,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.getUser,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const getTurnRemain = data => {
	return {
		type: GET_TURN_REMAIN,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.getRemainTurn,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const loginWithPassword = data => {
	return {
		type: LOGIN_PASSWORD,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.login,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const requestOtp = data => {
	return {
		type: REQUEST_OTP,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.getOTP,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const loginWithOtp = data => {
	return {
		type: LOGIN_OTP,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.loginWithSMS,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const verifyOtp = data => {
	return {
		type: VERIFY_OTP,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.verify,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const getPackageHistory = data => {
	return {
		type: GET_PACKAGE_HISTORY,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.getPackageList,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const getAuctionRecord = data => {
	return {
		type: GET_AUCTION_RECORD,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.getBidHistory,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const verifyOtpPassword = data => {
	return {
		type: VERIFY_OTP_PASSWORD,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.verifyChangePass,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const updatePassword = data => {
	return {
		type: UPDATE_PASSWORD,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.updatePassword,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const logoutUser = data => {
	return {
		type: LOGOUT_USER,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.logout,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const getListPackage = data => {
	return {
		type: GET_LIST_PACKAGE,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.packs,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const registerSubPackage = data => {
	return {
		type: REGISTER_SUB_PACKAGE,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.registerPack,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}
export const registerRetailPackage = data => {
	return {
		type: REGISTER_RETAIL_PACKAGE,
		data,
		meta: {
			method: 'POST',
			url: API_PATH.registerMytelPack,
			query: data.query || {},
			callback: data.callback || null
		},
	}
}