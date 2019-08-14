

import { updateObject } from '../../sharedFunctions/sharedFunctions';
import * as actionTypes from '../actions/actionTypes';

const initalState = {
    loading: false,
    error: false,
    token: '',
    id: ''
};

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START): {
            return updateObject(state, { loading: true })
        }

        case (actionTypes.AUTH_SUCCESS): {
            console.log('success')
            return updateObject(state, {loading: false, error: false})
        }
        case (actionTypes.AUTH_FAIL): {
           return  updateObject(state,{error: action.error})

        }

        case (actionTypes.LOGOUT): {
            console.log('logged out')
            return updateObject(state, {token: '', id: ''})
        }
        default: {
          return  state
        }
    };
};

export default authReducer;