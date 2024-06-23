import { GET_CURRENT_USER, GET_TURN_REMAIN, LOGIN_OTP, LOGIN_PASSWORD, LOGOUT_USER } from './contants'

const initState = {
	userInfo: null,
	token: null,
	remainTurn: []
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
		default:
			return state
	}
}
export default reducerAccount
