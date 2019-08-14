import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../sharedFunctions/sharedFunctions';

const initialState = {
    allTodos: [],
    loading: false
}


const AllTodosReducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_TODOS_START): {
            return updateObject(state, { loading: true })
        }
        case (actionTypes.FETCH_TODOS_SUCCESS): {
            let updateTodoArr = [...state.allTodos];
            updateTodoArr.concat(action.orders)
            return updateObject(state, { allTodos: updateTodoArr, loading: false })
        }
        case (actionTypes.FETCH_TODOS_FAIL): {
            console.log(action.error)
            return updateObject(state, { loading: false })
        }
        default:
            return state
    };
};


export default AllTodosReducer;