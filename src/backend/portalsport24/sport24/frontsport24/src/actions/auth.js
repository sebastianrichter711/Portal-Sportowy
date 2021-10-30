// frontend/src/actions/auth.js

import axios from 'axios';
import { stopSubmit } from 'redux-form';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS, // added
    REGISTER_FAIL, // added
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
  } from './types';
  
  // LOGIN USER
export const login = ({ username, password }) => async dispatch => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request Body
    const body = JSON.stringify({ username, password });
  
    try {
      const res = await axios.post('login', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL
      });
      dispatch(stopSubmit('loginForm', err.response.data));
    }
  };
  
  // helper function
  export const tokenConfig = getState => {
    // Get token
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };

  // REGISTER USER
  export const register = ({ username, email, password }) => async dispatch => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request Body
    const body = JSON.stringify({ username, email, password });
  
    try {
      const res = await axios.post('register', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL
      });
      dispatch(stopSubmit('registerForm', err.response.data));
    }
  };