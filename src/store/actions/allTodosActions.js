import * as actionTypes from './actionTypes';
import axios from '../../axios';

// Fetching Actions+++++++++++++++++++++++
//Start - Loading -> true
const fetchTodosStart = () => {
    return { type: actionTypes.FETCH_TODOS_START } };
//Success -> Fetched Todos -> into an array, Loading -> false
const fetchTodosSuccess = (allTodos) => {
    return {  type: actionTypes.FETCH_TODOS_SUCCESS, allTodos: allTodos } };
//Failure - Loading -> false, error -> True(Display?)
const fetchTodosFail = (error) => {
    return { type: actionTypes.FETCH_TODOS_FAIL, error: error } };
   ///Async fetching (Fetching only Todo's that match current user Id)
    export const fetchTodosInit = ( data ) => {
        return dispatch => {
            dispatch( fetchTodosStart() );
            const queryParams = '?auth=' + data.token + '&orderBy="id"&equalTo="' + data.id + '"';
            axios.get('/todoList.json' + queryParams)
                .then(response => {
                    let allTodos = [];
                    for (let el in response.data) {
                        allTodos.push({ ...response.data[el],  key: el  }) }
                        dispatch( fetchTodosSuccess( allTodos ) ) })
                .catch(error => {
                    dispatch ( fetchTodosFail( error ) )  })
        };
    };
//Fetching Actions--------------------------------------------








//Deleting Todos Action's +++++++++++++++++++
//Start - Loading -> true
const removeTodoStart = () => {
    return { type: actionTypes.REMOVE_TODO_START } };
 //Success -> Fetched Todos -> Remove from array By Index, Loading -> false
const removeTodoSuccess = ( index ) => {
    return { type: actionTypes.REMOVE_TODO_SUCCESS, index: index } };
//Failure - Loading -> false, error -> true(Display?)
const removeTodoFail = () => {
    return { type: actionTypes.REMOVE_TODO_FAIL } };
//Async Deleting Todo's  
export const removeTodoInit = (el, index, token) => {
    return dispatch => {
        dispatch(removeTodoStart())
        axios.delete('/todoList/' + el + '.json?auth=' + token)
            .then (res => { dispatch( removeTodoSuccess( index ) ) })
            .catch(err => { dispatch( removeTodoFail( err ) )      })
    };
};
//Deleting Todos Action's ----------------------






//Start  - Loading -> true
const editTodoStart = () => {
    return { type: actionTypes.EDIT_TODO_START } };
//Failure -> Loading -> false, error : true (Display?)
const editTodoFail = ( err ) => {
    return {  type: actionTypes.EDIT_TODO_FAIL,  err: err } };
export const editTodoInit = (index, data, token, id) => {
    return dispatch => {
        dispatch(editTodoStart())
        axios.patch('/todoList/' + index + '.json?auth=' + token, data)
            .then(res => {
                //fetching the data after updating it ( Everything ... Need to be more efficent)
                const data = { token: token, id: id }
                dispatch(fetchTodosInit(data))
            })
            .catch(err => { dispatch(editTodoFail( err )) })              
    };
};