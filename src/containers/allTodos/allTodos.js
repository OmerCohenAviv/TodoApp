import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import { updateObject, changeValueHandler } from '../../sharedFunctions/sharedFunctions';
import AllTodo from '../../components/allTodos/allTodos';
import TodoForm from '../../components/todoForm/todoForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/'

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
                select: false,
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
                select: false,
                value: '',
                touched: false,
                valid: false,
            },
            importantcy: {
                elementType: 'checkbox',
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
                select: true,
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

    openEditHandler = (el) => {
        let titleUpdate =             { ...this.state.cardData.title }
        let contextUpdate =           { ...this.state.cardData.context }
        let importantUpdate =         { ...this.state.cardData.importantcy }
        titleUpdate.value =           this.props.allTodos[el].title
        contextUpdate.value =         this.props.allTodos[el].context
        importantUpdate.value =       this.props.allTodos[el].importantcy
        const updateState = updateObject(this.state.cardData, { title: titleUpdate, context: contextUpdate, importantcy: importantUpdate })
        this.setState({ cardData: updateState, editShow: true })
    };
    cancelEditHandler = () => {
        this.setState({ editShow: false });
    };
    changeHandler = (updating) => {
        this.setState({ cardData: updating })
    };

    render() {
        let allTodos = <Spinner />
        if (!this.props.loading)
            allTodos = this.props.allTodos.map((el, index) => (
                <AllTodo
                    editClicked={() => this.openEditHandler(index)}
                    removeClicked={() => this.props.onRemoveTodoInit(el.key, index)}
                    key={el.key}
                    context={el.context}
                    title={el.title}
                    important={el.importantcy} />
            ))
        if (this.props.token === null) {
            allTodos = <Redirect to='/' />
        };

        const editInputsArr = []
        for (let ele in this.state.cardData) {
            editInputsArr.push({
                id: ele,
                config: this.state.cardData[ele]
            })
        }
        const that = {
            ...this
        }
        const editInputs = editInputsArr.map((ele) => {
            return <TextField
                key={ele.id}
                select={ele.config.select}
                touched={ele.config.touched.toString()}
                valid={ele.config.valid.toString()}
                label={ele.config.elementConfig.label}
                type={ele.config.elementConfig.type}
                value={ele.config.value}
                onChange={(event) => this.changeHandler(changeValueHandler(event, ele.id, that))}>

                {ele.id === 'importantcy' ? ele.config.elementConfig.options.map(opt => {
                    console.log(opt)
                   return <MenuItem key={opt.value} value={opt.value}>{opt.displayValue}</MenuItem>
        }) : null}
            </TextField>
        });

        return (
            <Fragment>
                <div >
                    {this.state.editShow ?
                        <TodoForm
                            textFields={editInputs}
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