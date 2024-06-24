import { GET_CURRENT_USER, GET_LIST_PACKAGE, GET_TURN_REMAIN, LOGIN_OTP, LOGIN_PASSWORD, LOGOUT_USER } from './contants'

const initState = {
	userInfo: null,
	token: null,
	remainTurn: [],
	listPackage: []
}
const reducerAccount = (state = initState, actions) => {
	switch (actions.type) {
		case GET_CURRENT_USER:
			return {
				...state,
				userInfo: actions.payload.data
			}
		case GET_TURN_REMAIN:
			return {
				...state,
				remainTurn: actions.payload.data
			}
		case LOGIN_PASSWORD:
			return {
				...state,
				token: actions.payload.data.token.accessToken
			}
		case LOGIN_OTP:
			return {
				...state,
				token: actions.payload.data.token.accessToken
			}
		case LOGOUT_USER:
			return {
				...state,
				token: null,
				userInfo: null
			}
		case GET_LIST_PACKAGE:
			return {
				...state,
				listPackage: actions.payload.data
			}
		default:
			return state
	}
}
export default reducerAccount
