import { combineReducers } from 'redux'
import authReducers from './authReducers'
import errorReducer from "./errorReducers";

const rootReducers = combineReducers({
    auth: authReducers,
    errors: errorReducer
})

export default rootReducers