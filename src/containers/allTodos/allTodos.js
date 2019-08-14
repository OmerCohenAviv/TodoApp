import React, { Component } from 'react';

import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import AllTodo from '../../components/allTodos/allTodos';

class AllTodos extends Component {

    componentDidMount() {
        const data = {
            id: this.props.id,
            token: this.props.token
        }
        this.props.onFetchOrders(data)
    }
    render() {
        let allTodos = ''
        console.log(this.props.allTodos)
        allTodos = this.props.allTodos.map(el => (
            <AllTodo title={el.title}/>
        ))

        return (
            <div>
                {allTodos}
            </div>
        );
    };
}



const mapStateToProps = state => {
    return {
        id: state.authReducer.id,
        token: state.authReducer.token,
        allTodos: state.allTodosReducer.allTodos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (data) => dispatch(actions.fetchTodosInit(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTodos)