import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import { updateObject } from '../../sharedFunctions/sharedFunctions';
import AllTodo from '../../components/allTodos/allTodos';
import TodoForm from '../../components/todoForm/todoForm';
import Spinner from '../../components/UI/Spinner/Spinner';

class AllTodos extends Component {
    state = {
        cardData: {
            title: {
                elementType: 'input',
                elementConfig: {
                    label: 'Title',
                    type: 'text',
                    placeholder: 'Title'
                },
                rules: {
                    maxLength: 20,
                    required: true
                },
                value: '',
                valid: false,
                touched: false,
            },
            context: {
                elementType: 'textarea',
                elementConfig: {
                    label: 'Context',
                    type: 'textarea',
                    placeholder: 'context'
                },
                rules: {
                    maxLength: 100,
                    required: true
                },
                value: '',
                touched: false,
                valid: false,
            },
            importantcy: {
                elementType: 'select',
                elementConfig: {
                    label: 'Important',
                    options: [
                        { value: 'high', displayValue: 'High' },
                        { value: 'medium', displayValue: 'Medium' },
                        { value: 'low', displayValue: 'Low' }
                    ]

                },
                rules: {
                    required: null
                },
                touched: false,
                value: 'high',
                valid: true,
            },
        },
        progressTodo: false,
        cardValdiation: false,
        editShow: false
    };

    componentDidMount() {
        const data = {
            id: this.props.id,
            token: this.props.token
        }
        this.props.onFetchOrders(data)
    }
    // changeValueHandler(event, elType)

    openEditHandler = (el) => {

        let titleUpdate =               {...this.state.cardData.title}
        let contextUpdate =             {...this.state.cardData.context}
        let importantUpdate =           {...this.state.cardData.importantcy}
        titleUpdate.value =             this.props.allTodos[el].title
        contextUpdate.value =           this.props.allTodos[el].context
        importantUpdate.value =         this.props.allTodos[el].importantcy
        const updateState = updateObject(this.state.cardData, {title: titleUpdate, context: contextUpdate, importantcy: importantUpdate} )
        this.setState({
            cardData: updateState
        })

    }
    cancelEditHandler = () => {
        this.setState({ editShow: false });
    }

    render() {
        let allTodos = <Spinner />
        if (!this.props.loading)
            allTodos = this.props.allTodos.map((el, index) => (
                <AllTodo
                    editClicked={(el) => this.openEditHandler(index)}
                    removeClicked={() => this.props.onRemoveTodoInit(el.key, index)}
                    key={el.key}
                    test={el.key}
                    context={el.context}
                    title={el.title}
                    important={el.importantcy} />
            ))
        if (this.props.token === null) {
            allTodos = <Redirect to='/' />
        };

        //creating an array -> for creating 2 inputs fields dynamic

        // const editInputs = editInputsArr.map(ele => {
        //     return <TextField
        //         key={ele.id}
        //         label={ele.config.elementConfig.label}
        //         type={ele.config.elementConfig.type}
        //         onChange={(event) => this.changeValueHandler(event, ele.id)}
        //         value={ele.config.value}
        //     />
        // });

        return (
            <Fragment>
                <div >
                    {this.state.editShow ?
                        <TodoForm
                            // textFields={editInputs}
                            cancelClicked={this.cancelEditHandler}
                            editText='Edit'
                            disabled={true}
                            cancelText='Cancel'
                        />
                        : null}
                    {allTodos}
                </div>
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