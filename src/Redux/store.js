import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './rootReducers'
import { serviceMiddleware } from './middlewares'


const store = createStore(rootReducers(), applyMiddleware(thunk, serviceMiddleware))
export default store
