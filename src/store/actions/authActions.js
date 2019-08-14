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
        dispatch(authStart())
        console.log(data)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlvd9c1t0h231S80WRMDeibvNPWxtZwx0', data)
            .then(res => {
                dispatch(authSuccess(res))
                dispatch(signInInit(data))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message))
            });
    };
};

export const logout = () => {
    localStorage.removeItem('Token')
    localStorage.removeItem('Id')
    return {
        type: actionTypes.LOGOUT
    };
};

const signInStart = () => {
    return {
        type: actionTypes.SIGN_IN_START
    }
}

const signInSuccess = (data) => {
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        res: data
    }
};

const signInFail = (error) => {
    return {
        type: actionTypes.SIGN_IN_FAIL,
        error: error
    }
};

export const signInInit = (signInProp) => {
    return dispatch => {
        dispatch(signInStart())
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlvd9c1t0h231S80WRMDeibvNPWxtZwx0', signInProp)
            .then(res => {
                localStorage.setItem('Token', res.data.idToken)
                localStorage.setItem('Id', res.data.localId)
                dispatch(signInSuccess(res))
            })
            .catch(err => {
                dispatch(signInFail(err))
            })

    }

}