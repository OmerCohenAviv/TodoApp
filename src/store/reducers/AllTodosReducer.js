import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/sharedFunctions/sharedFunctions';

const initialState = {
    allTodos: [],
    loading: false
}


const AllTodosReducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_TODOS_START): {
            return updateObject(state, { loading: true })
        }
        //new Set to Remove Duplicates, spreadin fetchedData into the array.
        case (actionTypes.FETCH_TODOS_SUCCESS): {
            return updateObject(state, { allTodos: [...new Set([...action.allTodos])], loading: false }) }

        case (actionTypes.FETCH_TODOS_FAIL): {
            return updateObject(state, { loading: false }) }
            
        case (actionTypes.REMOVE_TODO_START): {
            return updateObject(state, { loading: true }) }

        case (actionTypes.REMOVE_TODO_SUCCESS): {
            //filter used to remove clicked data (Getting the value of it , return all values that dont match..(matched data is the one we want to delete)
            return updateObject(state, {
                allTodos: state.allTodos.filter(ind => {
                    return ind !== state.allTodos[action.index]
                }),
                loading: false
            })
        }
        case (actionTypes.REMOVE_TODO_FAIL): {
            return updateObject(state, { loading: false }) }

        case (actionTypes.EDIT_TODO_START) : {
            return updateObject(state, {loading: true}) }
        
        case (actionTypes.EDIT_TODO_SUCCESS) : {
            return updateObject(state, {loading: false}) }
        
        case (actionTypes.EDIT_TODO_FAIL) : {
            return updateObject(state, {loading: false}) }
        default:
            return state
    };
};


export default AllTodosReducer;