import axios from 'axios'
import url from '../utils/url';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types'
import { toast } from 'react-toastify';

// Register User
export const registerUser = (userData, history, callback) => dispatch => {
  axios
    .post(`${url.serverURL}/api/users/register`, userData)
    .then(res => {
      toast.info('Please check your mail', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      callback();
    })
    .catch(err =>{
      console.log("error", err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post(`${url.serverURL}/api/users/login`, userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const activateUser = (token,history, setStatus) => dispatch => {
  axios
    .post(`${url.serverURL}/api/users/email-activate`, token)
    .then((res) => {
      toast.success('Account activated successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
        setStatus(true);
        setTimeout(() => {
          history.push('/user/login');
      }, 2000);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = (history) => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  history.push('/user/login');
  dispatch(setCurrentUser({}));
};

export const forgotpassword = resetEmail => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  })
  axios
    .post(`${url.serverURL}/api/users/forgot-password`, resetEmail)
    .then(res => {
      toast.info(`Reset link sent on mail`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
}

export const resetpassword = (password, history) => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  })
  axios
    .post(`${url.serverURL}/api/users/reset-password`, password)
    .then(res => {
      toast.success('Password Updated!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        history.push('/user/login');
    }, 2000);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })    
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
}

export const cleanErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  }
}