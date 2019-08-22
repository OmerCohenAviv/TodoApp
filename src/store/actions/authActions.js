import axios from '../../axios';
import * as actionTypes from '../actions/actionTypes';


const authStart = () => {
    return { type: actionTypes.AUTH_START } };


const authSuccess = ( response ) => {
    return {  type: actionTypes.AUTH_SUCCESS, res: response } }; 


const authFail = ( error ) => {
    return { type: actionTypes.AUTH_FAIL, error: error } };
    

    export const authInit = ( data ) => {
        return dispatch => {
            dispatch( authStart() )
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlvd9c1t0h231S80WRMDeibvNPWxtZwx0', data)
                .then(res => {
                    dispatch(authSuccess( res ) )
                    dispatch(signInInit( data ) ) 
                })
                .catch(err => { dispatch(authFail(err.response.data.error.message))  });
        };
    };






const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => { dispatch( logout() ) }, expireTime * 1000)
    };
};

export const logout = () => {
    localStorage.removeItem('expireDate')
    localStorage.removeItem('Token')
    localStorage.removeItem('Id')
    return {  type: actionTypes.LOGOUT } };




const signInStart = () => {
    return { type: actionTypes.SIGN_IN_START} };

const signInSuccess = ( data ) => {
    return { type: actionTypes.SIGN_IN_SUCCESS,    res: data } };

const signInFail = ( error ) => {

    return { type: actionTypes.SIGN_IN_FAIL,  error: error } };

export const signInInit = (signInProp) => {
    return dispatch => {
        dispatch(signInStart())
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlvd9c1t0h231S80WRMDeibvNPWxtZwx0', signInProp)
            .then(res => {
                const expireDate = new Date(new Date().getTime() + Number(res.data.expiresIn * 1000)) 
                //Setting LocalStorage
                localStorage.setItem('Token', res.data.idToken);
                localStorage.setItem('Id', res.data.localId);
                localStorage.setItem('expireDate', expireDate);
                dispatch(signInSuccess(res))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(signInFail(err.response.data.error.message)) })
    };
};

export const signInAuto = () => {
   return dispatch => {
        const token = localStorage.getItem('Token')
        const id = localStorage.getItem('Id')
        if (!token) {
           return dispatch(logout())
        }
        else {
            const expireDate = new Date(localStorage.getItem('expireDate'));
            if ( expireDate > new Date() ) {
                const signInData = { 
                    data: { idToken: token, localId: id } };   
                dispatch(signInSuccess(signInData))
                dispatch(checkAuthTimeout((expireDate.getTime() - new Date().getTime())/ 1000 ) )
            }
            else {
                return dispatch( logout() )
            }
        };
    };
};
