import { CURRENT_PRODUCT, GET_BID_HISTORY, GET_BID_HISTORY_ALL } from './contants'

const initState = {
	idCurrentProduct: null,
	bidHistory: {
		current: 1,
		pageSize: 10,
		data: [],
		total: 0,
	},
	bidHistoryAll: {
		current: 1,
		pageSize: 10,
		data: [],
		total: 0,
	},

}
const reducerRightWeb = (state = initState, actions) => {
	switch (actions.type) {
		case CURRENT_PRODUCT:
			return {
				...state,
				idCurrentProduct: actions.data
			}
		case GET_BID_HISTORY:
			return {
				...state,
				bidHistory: actions.payload
			}
		case GET_BID_HISTORY_ALL:
			return {
				...state,
				bidHistoryAll: actions.payload
			}
		default:
			return state
	}
}
export default reducerRightWeb
