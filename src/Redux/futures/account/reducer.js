import { GET_CURRENT_USER, GET_TURN_REMAIN, LOGIN_OTP, LOGIN_PASSWORD } from './contants'

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
		default:
			return state
	}
}
export default reducerAccount
