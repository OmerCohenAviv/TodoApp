import * as actionTypes from './actionTypes'
import axios from '../../axios';



const successPost = (todoData) => {
        return {
                type: actionTypes.POST_TODO_DATA,
                todoData: todoData
        }
}

export const postTodoData = (todoData) => {
       return dispatch => {
                axios.post('/todoList.json', todoData)
                        .then(res => {
                                dispatch(successPost(todoData))
                        })
                        .catch(err => console.log('error ' + err))
        };
};