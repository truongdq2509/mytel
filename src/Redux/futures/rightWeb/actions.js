
import API_PATH from '../../../config/API_PATH'
import { CURRENT_PRODUCT, GET_BID_HISTORY, GET_BID_HISTORY_ALL } from './contants'


export const setIdCurrentProduct = data => {
	return {
		type: CURRENT_PRODUCT,
		data
	}
}

export const getHistoryBid = data => {
	return {
		type: GET_BID_HISTORY,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.bidHistory,
			query: data.query || {},
		},
	}
}
export const getHistoryBidAll = data => {
	return {
		type: GET_BID_HISTORY_ALL,
		data,
		meta: {
			method: 'GET',
			url: API_PATH.bidHistoryAll,
			query: data.query || {},
		},
	}
}
