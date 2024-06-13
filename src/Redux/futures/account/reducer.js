import { GET_CURRENT_USER } from './contants'

const initState = {
	userInfo: null
}
const reducerAccount = (state = initState, actions) => {
	switch (actions.type) {
		case GET_CURRENT_USER:
			return {
				...state,
				userInfo: actions.payload.data
			}
		default:
			return state
	}
}
export default reducerAccount
