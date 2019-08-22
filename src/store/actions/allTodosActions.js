import * as actionTypes from './actionTypes';
import axios from '../../axios';


const fetchTodosStart = () => {
    return { type: actionTypes.FETCH_TODOS_START } };

const fetchTodosSuccess = (allTodos) => {
    return {  type: actionTypes.FETCH_TODOS_SUCCESS, allTodos: allTodos } };

const fetchTodosFail = (error) => {
    return { type: actionTypes.FETCH_TODOS_FAIL, error: error } };

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









const removeTodoStart = () => {
    return { type: actionTypes.REMOVE_TODO_START } };


const removeTodoSuccess = ( index ) => {
    return { type: actionTypes.REMOVE_TODO_SUCCESS, index: index } };

const removeTodoFail = () => {
    return { type: actionTypes.REMOVE_TODO_FAIL } };

export const removeTodoInit = (el, index, token) => {
    return dispatch => {
        dispatch(removeTodoStart())
        axios.delete('/todoList/' + el + '.json?auth=' + token)
            .then (res => { dispatch( removeTodoSuccess( index ) ) })
            .catch(err => { dispatch( removeTodoFail( err ) )      })
    };
};







const editTodoStart = () => {
    return { type: actionTypes.EDIT_TODO_START } };
    
const editTodoFail = ( err ) => {
    return {  type: actionTypes.EDIT_TODO_FAIL,  err: err } };

export const editTodoInit = (index, data, token, id, editShowF) => {
    return dispatch => {
        dispatch(editTodoStart())
        axios.patch('/todoList/' + index + '.json?auth=' + token, data)
            .then(res => {
                //fetching the data after updating it ( Everything ... Need to be more efficent)
                const data = { token: token, id: id }
                dispatch(fetchTodosInit(data))
                editShowF()
            })
            .catch(err => { dispatch(editTodoFail( err )) })              
    };
};