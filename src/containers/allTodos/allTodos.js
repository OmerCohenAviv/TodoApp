import React, { Component,Fragment} from 'react';

import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import AllTodo from '../../components/allTodos/allTodos';
import Spinner from '../../components/UI/Spinner/Spinner';

class AllTodos extends Component {

    componentDidMount() {
        const data = {
            id: this.props.id,
            token: this.props.token
        }
        this.props.onFetchOrders(data)
    }



    render() {
        let allTodos = <Spinner />
        if (!this.props.loading)
            allTodos = this.props.allTodos.map((el, index) => (
                <AllTodo
                    removeClicked={() => this.props.onRemoveTodoInit(el.key, index)}
                    key={el.key}
                    test={el.key}
                    title={el.title}
                    important={el.importantcy} />
            ))
        if (this.props.token === null) {
            allTodos = <Redirect to='/' />
        }

        return (
            <Fragment>
                {allTodos}
            </Fragment>
        );
    };
}



const mapStateToProps = state => {
    return {
        id: state.authReducer.id,
        token: state.authReducer.token,
        loading: state.allTodosReducer.loading,
        fetched: state.allTodosReducer.fetched,
        allTodos: state.allTodosReducer.allTodos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveTodoInit: (el, index) => dispatch(actions.removeTodoInit(el, index)),
        onFetchOrders: (data) => dispatch(actions.fetchTodosInit(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTodos)