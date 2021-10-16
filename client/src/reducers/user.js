import {
    UPDATE_USER,
    UPDATE_TOKEN
} from '../actions/types';

const initialState = {
    user: null,
    token: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
            console.log('Updating User', action.payload);
            return {
                ...state,
                user: action.payload
            }
        case UPDATE_TOKEN:
            console.log('Updating Token', action.payload);
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}

export default userReducer;