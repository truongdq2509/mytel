
import API_PATH from '../../../config/API_PATH'
import { GET_CURRENT_USER, LOGIN_PASSWORD } from './contants'


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
