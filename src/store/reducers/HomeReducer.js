import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../sharedFunctions/updateObject'

const initalState = {
    allTodos: []
};

const homeReducer = (state = initalState, action) => {
    switch(action.type) {
        case (actionTypes.POST_TODO_DATA ): {
            console.log(action)
            const updateTodoList = {
                allTodos: state.allTodos.concat(action.todoData)
            }
            for (let i in state.allTodos) {
                console.log( state.allTodos[i])
            }
            return updateObject(state, updateTodoList)
        }
        default:
           return state;
    };

};


export default homeReducer;