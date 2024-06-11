import { GET_BANNER_HOME, GET_BID_PRODUCT, GET_TOTAL_USER_BID, GET_UP_NEXT_PRODUCT } from './contants'

const initState = {
	bidProduct: [],
	upNextProduct: [],
	banner: [],
	totalUserBid: 0,
}
const reducerHome = (state = initState, actions) => {
	switch (actions.type) {
		case GET_BID_PRODUCT:
			return {
				...state,
				bidProduct: actions.payload.data,
			}
		case GET_UP_NEXT_PRODUCT:
			return {
				...state,
				upNextProduct: actions.payload.data,
			}
		case GET_BANNER_HOME:
			return {
				...state,
				banner: actions.payload.data,
			}
		case GET_TOTAL_USER_BID:
			return {
				...state,
				totalUserBid: actions.payload.data,
			}
		default:
			return state
	}
}
export default reducerHome
