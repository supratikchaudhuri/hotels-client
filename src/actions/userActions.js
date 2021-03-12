import axios from "axios";
import { USER_SIGNIN_FAILURE, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from "../constants/userConstants"

export const signin = (email, password) => async(dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {email, password}
    });
    try {
        const {data} = await axios.post('/api/users/signin', {email, password});

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(err) {
        dispatch({
            type: USER_SIGNIN_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const signout = () => async(dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('billingDetails');
    dispatch({
        type: USER_SIGNOUT,
    });
}

export const register = (name, email, password) => async(dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {name, email, password}
    });
    try {
        const {data} = await axios.post('/api/users/register', {name, email, password});

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(err) {
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}