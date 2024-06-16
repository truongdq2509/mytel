import API_PATH from '../../../config/API_PATH'
import { GET_BANNER_HOME, GET_BID_PRODUCT, GET_TOTAL_USER_BID, GET_UP_NEXT_PRODUCT } from './contants'


export const getBidProduct = data => {
	return {
		type: GET_BID_PRODUCT,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.bidProduct,
			query: data.query || {},

		},
	}
}
export const getUpNextProduct = data => {
	return {
		type: GET_UP_NEXT_PRODUCT,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.upNextProduct,
			query: data.query || {},

		},
	}
}
export const getBannerHome = data => {
	return {
		type: GET_BANNER_HOME,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.banner,
			query: data.query || {},

		},
	}
}
