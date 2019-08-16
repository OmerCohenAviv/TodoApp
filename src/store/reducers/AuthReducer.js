

import { updateObject } from '../../sharedFunctions/sharedFunctions';
import * as actionTypes from '../actions/actionTypes';

const initalState = {
    loading: false,
    error: false,
    token: null,
    id: null
};

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START): {
            return updateObject(state, { loading: true })
        }
        case (actionTypes.AUTH_SUCCESS): {
            return updateObject(state, {
            loading: false, 
            error: false})
        }
        case (actionTypes.AUTH_FAIL): {
           return  updateObject(state,{error: action.error, loading: false})

        }

        case (actionTypes.LOGOUT): {
            return updateObject(state, {token: null, id: null})
        }

        case(actionTypes.SIGN_IN_START): {
            return updateObject(state, {loading: true});
        }

        case(actionTypes.SIGN_IN_SUCCESS): {
            return updateObject(state, {loading: false, token: action.res.data.idToken, id: action.res.data.localId})
        }

        case(actionTypes.SIGN_IN_FAIL): {
            return updateObject(state, {loading: false, error: true})
        }
        default: {
          return  state
        }
    };
};

export default authReducer;