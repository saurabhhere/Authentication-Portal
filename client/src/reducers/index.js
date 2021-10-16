import { combineReducers } from 'redux'
import userReducer from './user'

const rootReducers = combineReducers({
    user: userReducer
})

export default rootReducers