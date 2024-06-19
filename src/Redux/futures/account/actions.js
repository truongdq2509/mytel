
import API_PATH from '../../../config/API_PATH'
import { GET_CURRENT_USER, GET_TURN_REMAIN, LOGIN_OTP, LOGIN_PASSWORD, REQUEST_OTP } from './contants'


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
