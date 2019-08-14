import * as actionTypes from './actionTypes';
import axios from '../../axios';


const fetchTodosStart = () => {
    return {
        type: actionTypes.FETCH_TODOS_START
    };
};


const fetchTodosSuccess = (response) => {
    return {
        type: actionTypes.FETCH_TODOS_SUCCESS,
        response: response
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
        axios.get('/todoList.json' + queryParams  )
        .then(response => dispatch( fetchTodosSuccess(response) ) )
        .catch(error => dispatch( fetchTodosFail(error) ) )
    }
}

