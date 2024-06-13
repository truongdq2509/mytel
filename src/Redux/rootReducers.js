import { combineReducers } from 'redux'
import reducerRightWeb from './futures/rightWeb/reducer'
import reducerHome from './futures/home/reducer'
import reducerBid from './futures/Bid/reducer'
import reducerAccount from './futures/account/reducer'

const rootReducers = () =>
	combineReducers({
		reducerRightWeb: reducerRightWeb,
		reducerHome: reducerHome,
		bid: reducerBid,
		reducerAccount: reducerAccount,
	})

export default rootReducers
