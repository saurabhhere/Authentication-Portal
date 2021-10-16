import {
    SET_CURRENT_USER,
    USER_LOADING
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    token: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
              ...state,
              isAuthenticated: action.payload.id ? true : false,
              user: action.payload
            };
          case USER_LOADING:
            return {
              ...state,
              loading: true
            };
        default:
            return state
    }
}

export default userReducer;