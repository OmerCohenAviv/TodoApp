import axios from '../../axios';
import * as actionTypes from '../actions/actionTypes';


const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

const authSuccess = (response) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        res: response
    }
}


const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const authInit = (data) => {
    return dispatch => {
        dispatch(authStart)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlvd9c1t0h231S80WRMDeibvNPWxtZwx0', data)
        .then(res => {
            dispatch(authSuccess(res))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error.message))
        });
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}