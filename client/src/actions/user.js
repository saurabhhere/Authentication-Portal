import {
    UPDATE_USER,
    UPDATE_TOKEN,
} from './types'

export const updateUser = (user) => async dispatch => {
    try {
        dispatch ({
            type: UPDATE_USER,
            payload: user
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateToken = (token) => async dispatch => {
    try {
        dispatch ({
            type: UPDATE_TOKEN,
            payload: token
        })
    } catch (error) {
        console.log(error);
    }
}