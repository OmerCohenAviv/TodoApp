import * as actionTypes from './actionTypes'
import axios from '../../axios';

 
const postTodoDataStart = () => {
        return {
                type: actionTypes.POST_TODO_DATA_START
        };
};

const postTodoDataSuccess = (todoData) => {
        return { type: actionTypes.POST_TODO_DATA_SUCCESS, todoData: todoData } }

const postTodoDataFail = () => {
        return {  type: actionTypes.POST_TODO_DATA_FAIL } };

export const postTodoDataInit = ( todoData, token ) => {
        return dispatch => {
                dispatch(postTodoDataStart())
                axios.post('/todoList.json?auth=' + token, todoData)
                        .then(res => {   dispatch(postTodoDataSuccess( todoData) ) })
                        .catch(err => dispatch( postTodoDataFail) )
        };
};