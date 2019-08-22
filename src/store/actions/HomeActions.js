import * as actionTypes from './actionTypes'
import axios from '../../axios';


//Starting to send data 
const postTodoDataStart = () => {
        return {
                type: actionTypes.POST_TODO_DATA_START
        }
}

//Successfuly sending data 
const postTodoDataSuccess = (todoData) => {
        return { type: actionTypes.POST_TODO_DATA_SUCCESS, todoData: todoData } }

//Failure - loading -> false 
const postTodoDataFail = () => {
        return {  type: actionTypes.POST_TODO_DATA_FAIL } };

//Async action for sending data.
export const postTodoDataInit = ( todoData, token ) => {
        return dispatch => {
                dispatch(postTodoDataStart())
                axios.post('/todoList.json?auth=' + token, todoData)
                        .then(res => {   dispatch(postTodoDataSuccess( todoData) ) })
                        .catch(err => dispatch( postTodoDataFail) )
        };
};