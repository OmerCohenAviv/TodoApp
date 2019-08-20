import axios from '../../axios';
import * as actionTypes from '../actions/actionTypes';

//Authenticating... +++++++++++++++++++
//Start - Loading: true
const authStart = () => {
    return { type: actionTypes.AUTH_START } };
//Success - Loading: false, error: false 
const authSuccess = ( response ) => {
    return {  type: actionTypes.AUTH_SUCCESS, res: response } }; 
//Fail - Loading: false, error: true (Display?)
const authFail = ( error ) => {
    return { type: actionTypes.AUTH_FAIL, error: error } };
//Async Authenticating... Sendin Email,Password to firebase to register 
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
//Authenticating...  ------------------------------




//Setting a timer to Logout after expireTime for token
const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => { dispatch( logout() ) }, expireTime * 1000)
    };
};
//Logging out (Removing localStorage Data )
export const logout = () => {
    localStorage.removeItem('expireDate')
    localStorage.removeItem('Token')
    localStorage.removeItem('Id')
    return {  type: actionTypes.LOGOUT } };


//Sign In Actions ++++++++++++++++++++++
//Start - Loading: true
const signInStart = () => {
    return { type: actionTypes.SIGN_IN_START} };
//Success - Setting up  token,id. Loading: false  
const signInSuccess = ( data ) => {
    return { type: actionTypes.SIGN_IN_SUCCESS,    res: data } };
const signInFail = ( error ) => {
//Faliure - Loading: false
    return { type: actionTypes.SIGN_IN_FAIL,  error: error } };
//Async for signing in sending email,password 
export const signInInit = (signInProp) => {
    console.log(signInProp)
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
                dispatch(signInFail(err)) })
    };
};
//Checks if there's  storage.token/expireTime(not outDated) -> Logs in
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
//Sign In Actions -------------------------