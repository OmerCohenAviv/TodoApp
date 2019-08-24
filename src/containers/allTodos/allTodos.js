import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import { cardDataAllTodos } from '../../utility/Configs/Configs'
import { updateObject, changeValueHandler, checkValid } from '../../utility/sharedFunctions/sharedFunctions';
import AllTodo from '../../components/allTodos/allTodos';
import TodoForm from '../../components/todoForm/todoForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/'

class AllTodos extends Component {
    state = { ...cardDataAllTodos }

    componentDidMount() {
        const data = {
            id: this.props.id,
            token: this.props.token
        }
        this.props.onFetchOrders(data)
    }

    openEditHandler = (index, el) => {
        let settingEditForm = { ...this.state.cardData }
        settingEditForm.title.valid = checkValid(settingEditForm.title.rules, this.props.allTodos[index].title)
        settingEditForm.title.value = this.props.allTodos[index].title
        settingEditForm.context.valid = checkValid(settingEditForm.context.rules, this.props.allTodos[index].context)
        settingEditForm.context.value = this.props.allTodos[index].context
        settingEditForm.importantcy.value = this.props.allTodos[index].importantcy
        const updateState = updateObject(this.state.cardData, settingEditForm)
        return this.setState({ cardData: updateState, editShow: true, currentEditIndex: el.key }, () => {
            const currentValuesEdit = {
                id: this.props.id,
                title: settingEditForm.context.value,
                context: settingEditForm.context.value,
                importantcy: settingEditForm.importantcy.value
            }
            return this.setState({ currentValuesEdit: currentValuesEdit })
        })
    };

    cancelEditHandler = () => {
        this.setState({ editShow: false });
    };

    changeHandler = (event, ele, that) => {
        let updated = () => changeValueHandler(event, ele.id, that)
        updated = updated()
        this.setState({ cardData: updated }, () => {
            if (true) {
                let updatingCurrent = { ...this.state.currentValuesEdit }
                let valid = true
                const accessToValidDeep = { ...this.state.cardData }
                for (let types in accessToValidDeep) {
                    updatingCurrent[types] = accessToValidDeep[types].value
                    valid = valid && accessToValidDeep[types].valid
                }
                this.setState({ cardValdiation: valid, currentValuesEdit: updatingCurrent })
            };
        });

    }
    render() {
        let allTodos = <Spinner />
        if (!this.props.loading)
            //displaying allTodos...
            allTodos = this.props.allTodos.map((el, index) => {
                return <AllTodo
                    editClicked={() => this.openEditHandler(index, el)}
                    removeClicked={() => this.props.onRemoveTodoInit(el.key, index, this.props.token)}
                    key={el.key}
                    context={el.context}
                    title={el.title}
                    important={el.importantcy} />
            })
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
        const editInputs = editInputsArr.map((ele) => {
            //TextFields for edit form
            return <TextField
                style={{ display: 'flex', }}
                key={ele.id}
                select={ele.config.select}
                touched={ele.config.touched.toString()}
                label={ele.config.elementConfig.label}
                type={ele.config.elementConfig.type}
                value={ele.config.value}
                onChange={(event) => this.changeHandler(event, ele, this)}>

                {ele.id === 'importantcy' ? ele.config.elementConfig.options.map(opt => {
                    return <MenuItem key={opt.value} value={opt.value}>{opt.displayValue}</MenuItem>
                }) : null}
            </TextField>
        });
        let edit = null
        if (this.state.editShow) {
            edit = <TodoForm
                textFields={editInputs}
                editSend={() => this.props.onEditTodoInit(this.state.currentEditIndex, this.state.currentValuesEdit, this.props.token, this.props.id, this.cancelEditHandler)}
                cancelClicked={this.cancelEditHandler}
                editText='Finish'
                disabled={this.state.cardValdiation}
                cancelText='Cancel'
            />
        }
        const styles = {
            mainD: {  display: 'flex', flexDirection: ' row' },
            seconD: { flexDirection: 'column', width: '45%', marginLeft: '30px' }
        }
        return (
            <div style={styles.mainD}>
                <div style={styles.seconD}>
                    {allTodos}
                </div>
                {edit}
            </div>
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
        onEditTodoInit: (index, objectValues, token, id, editShowF) => dispatch(actions.editTodoInit(index, objectValues, token, id, editShowF)), //Editing
        onRemoveTodoInit: (el, index, token) => dispatch(actions.removeTodoInit(el, index, token)),                         //Removing
        onFetchOrders: (data) => dispatch(actions.fetchTodosInit(data))                                                     //Fetching
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AllTodos ) 