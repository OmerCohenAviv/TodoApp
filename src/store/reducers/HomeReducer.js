import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../sharedFunctions/sharedFunctions'

const initalState = {
    loading: false
};

const homeReducer = (state = initalState, action) => {
    switch (action.type) {
        case (actionTypes.POST_TODO_DATA_START): {
          return  updateObject(state, { loading: true }) }
        
        case (actionTypes.POST_TODO_DATA_SUCCESS): {
            return updateObject(state, { loading: false}) }

        case (actionTypes.POST_TODO_DATA_FAIL): {
            return updateObject(state, { loading: false}) }
        
        default: { return state}
    };
};


export default homeReducer;