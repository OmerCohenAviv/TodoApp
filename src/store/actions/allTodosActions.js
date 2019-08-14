import * as actionTypes from './actionTypes';
import axios from '../../axios';


const fetchTodosStart = () => {
    return {
        type: actionTypes.FETCH_TODOS_START
    };
};


const fetchTodosSuccess = (allTodos) => {
    return {
        type: actionTypes.FETCH_TODOS_SUCCESS,
        allTodos: allTodos
    };
};


const fetchTodosFail = (error) => {
    return {
        type: actionTypes.FETCH_TODOS_FAIL,
        error: error
    };
};


export const fetchTodosInit = (data) => {
    return dispatch => {
        dispatch(fetchTodosStart());
        const queryParams = '?auth=' + data.token + '&orderBy="userId"&equalTo"' + data.id + '"';
        axios.get('/todoList.json' + queryParams)
            .then(response => {
                let allTodos = [];
                for (let el in response.data) {
                    allTodos.push({
                        ...response.data[el]
                    })
                }
                dispatch(fetchTodosSuccess(allTodos))
            })
            .catch(error => {
                dispatch(fetchTodosFail(error))
            })

        };
    };