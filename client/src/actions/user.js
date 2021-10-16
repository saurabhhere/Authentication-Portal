import axios from 'axios'
import url from '../misc/url'
import {
    UPDATE_USER,
    UPDATE_TOKEN,
} from './types'

export const updateUser = (user) => async dispatch => {
    try {
        const res = await axios.get(`${url.serverURL}/user/profile/${user.id}`)
        dispatch ({
            type: UPDATE_USER,
            payload: res.data
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