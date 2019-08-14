import React, { Component } from 'react';

import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';

class AllTodos extends Component {

    componentDidMount() {
        const data = {
            id: this.props.id,
            token: this.props.token
        }
        this.props.onFetchOrders(data)
    }
    render() {
        return (
            <div>

            </div>
        );
    };
};



const mapStateToProps = state => {
    return {
        id: state.authReducer.id,
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (data) => dispatch(actions.fetchTodosInit(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTodos)