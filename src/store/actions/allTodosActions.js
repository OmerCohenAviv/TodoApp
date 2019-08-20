import * as actionTypes from './actionTypes';
import axios from '../../axios';

//Fetch todos actions ----->>>>>
const fetchTodosStart = () => {
    return {
        type: actionTypes.FETCH_TODOS_START
    };
};
const fetchTodosSuccess = ( allTodos ) => {
    return {
        type: actionTypes.FETCH_TODOS_SUCCESS,
        allTodos: allTodos
    };
};
const fetchTodosFail = ( error ) => {
    return {
        type: actionTypes.FETCH_TODOS_FAIL,
        error: error
    };
};
export const fetchTodosInit = ( data ) => {
    return dispatch => {
        dispatch (fetchTodosStart() );
        const queryParams = '?auth=' + data.token + '&orderBy="id"&equalTo="' + data.id + '"';
        axios.get('/todoList.json' + queryParams)
            .then(response => {
                let allTodos = [];
                for (let el in response.data) {
                    allTodos.push({
                        ...response.data[el],
                        key: el
                    })
                }
                dispatch( fetchTodosSuccess( allTodos ) )
            })
            .catch(error => {
                dispatch( fetchTodosFail( error ) )
            })
    };
};
//Fetch todos actions ----- <<<<<

//Remove Todos actions --- >>>>>
const removeTodoStart = () => {
    return {
        type: actionTypes.REMOVE_TODO_START
    };
};

const removeTodoSuccess = ( index ) => {
    return {
        type: actionTypes.REMOVE_TODO_SUCCESS,
        index: index
    };
};
const removeTodoFail = () => {
    return {
        type: actionTypes.REMOVE_TODO_FAIL
    };
};
export const removeTodoInit = ( el, index ) => {
    return dispatch => {
        dispatch( removeTodoStart() )
        axios.delete('/todoList/' + el + '.json')
            .then(res => {
                dispatch(removeTodoSuccess( index ))
            })
            .catch(err => {
                dispatch(removeTodoFail())
            })
    };
};
//Remove Todos actions <<<<<<---


const editTodoStart =  () => {
    return {
        type: actionTypes.EDIT_TODO_START
    };
};

const editTodoSuccess = (res) => {
    return {
        type: actionTypes.EDIT_TODO_SUCCESS,
        res: res
    };
};

const editTodoFail = () => {
    return {
        etype: actionTypes.EDIT_TODO_FAIL
    };
};


export const editTodoInit = (el, index) => {
   return dispatch => {
        dispatch ( editTodoStart() )
        axios.patch('/todoList' + el + '.json')
        .then( res => {
            dispatch (editTodoSuccess(res) ) 
        })
        .catch ( err => {
            dispatch (editTodoFail( err ) )
        })
    }
}