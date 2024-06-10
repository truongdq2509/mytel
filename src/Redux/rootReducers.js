import { combineReducers } from 'redux'
import reducerRightWeb from './futures/rightWeb/reducer'
import reducerHome from './futures/home/reducer'

const rootReducers = () =>
	combineReducers({
		reducerRightWeb: reducerRightWeb,
		homeReducer: reducerHome
	})

export default rootReducers
