import { combineReducers } from 'redux'
import reducerRightWeb from './futures/rightWeb/reducer'
import reducerHome from './futures/home/reducer'
import reducerBid from './futures/Bid/reducer'

const rootReducers = () =>
	combineReducers({
		reducerRightWeb: reducerRightWeb,
		homeReducer: reducerHome,
		bid: reducerBid
	})

export default rootReducers
