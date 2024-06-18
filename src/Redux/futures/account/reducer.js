import { GET_CURRENT_USER, LOGIN_PASSWORD } from './contants'

const initState = {
	userInfo: null,
	token: null,
}
const reducerAccount = (state = initState, actions) => {
	switch (actions.type) {
		case GET_CURRENT_USER:
			return {
				...state,
				userInfo: actions.payload.data
			}
		case LOGIN_PASSWORD:
			return {
				...state,
				token: actions.payload.data
			}
		default:
			return state
	}
}
export default reducerAccount
