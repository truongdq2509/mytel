import { combineReducers } from 'redux'
import reducerRightWeb from './futures/rightWeb/reducer'
import reducerHome from './futures/home/reducer'
import reducerBid from './futures/Bid/reducer'
import reducerAccount from './futures/account/reducer'
import reducerResult from './futures/result/reducer'
import reducerEvent from './futures/event/reducer'

const rootReducers = () =>
	combineReducers({
		reducerRightWeb: reducerRightWeb,
		reducerHome: reducerHome,
		bid: reducerBid,
		reducerAccount: reducerAccount,
		reducerResult: reducerResult,
		reducerEvent,
	})

export default rootReducers
