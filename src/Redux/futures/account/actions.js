
import API_PATH from '../../../config/API_PATH'
import { GET_CURRENT_USER } from './contants'


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
