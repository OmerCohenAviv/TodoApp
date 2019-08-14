import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../sharedFunctions/sharedFunctions'

const initalState = {
    allTodos: [],
    loading: false
};

const homeReducer = (state = initalState, action) => {
    switch (action.type) {
        //Start Case
        case (actionTypes.POST_TODO_DATA_START): {
          return  updateObject(state, { loading: true })
        }

          //Success Case
        case (actionTypes.POST_TODO_DATA_SUCCESS): {
            const updateState = {
                allTodos: state.allTodos.concat(action.todoData),
                loading: false
            }
            return updateObject(state, updateState)
        }
        case (actionTypes.POST_TODO_DATA_FAIL): {
            return updateObject(state, {loading: false})
        }
        default:
            return state;
    };

};


export default homeReducer;