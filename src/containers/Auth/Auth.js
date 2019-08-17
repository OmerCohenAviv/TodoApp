import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValid } from '../../sharedFunctions/sharedFunctions';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Buttons/defaultButton/Button';
import Spinner from '../../components/UI/Spinner/Spinner';




class Auth extends Component {
    state = {
        authData: {
            userName: {
                elementType: 'input',
                elementConfig: {
                    label: 'User Name',
                    type: 'input',
                    placeholder: 'User Name',
                },
                value: '',
                rules: {
                    required: true
                },
                touched: false,
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter Password',
                },
                rules: {
                    required: true,
                    minLength: 7,
                },
                value: '',
                touched: false,
                valid: false,
            }
        }
    };
    changeHandler = (id, event) => {
        const valid = checkValid(this.state.authData[id].rules, event.target.value)
        const updateEl = updateObject(this.state.authData[id], { value: event.target.value, valid: valid, touched: true })
        const updateAuthData = updateObject(this.state.authData, {
            [id]: updateEl
        });
        this.setState({ authData: updateAuthData })
    }

    authHandler = (event) => {
        event.preventDefault();
        const authPayload = {
            email: this.state.authData.userName.value,
            password: this.state.authData.password.value,
            returnSecureToken: true
        }
        this.props.onAuthInit(authPayload);
    }

    render() {
        let disabled = this.state.authData['userName'].valid && this.state.authData['password'].valid
        let authFormArr = []
        for (let ele in this.state.authData) {
            authFormArr.push({
                id: ele,
                config: this.state.authData[ele]
            });
        };
        let authForm = '';
        authForm = (
            authFormArr.map(ele => (
                <Input
                    change={(event) => this.changeHandler(ele.id, event)}
                    elementType={ele.config.elementType}
                    key={ele.id}
                    valid={ele.config.valid}
                    touched={ele.config.touched}
                    value={ele.config.value}
                    elementConfig={ele.config.elementConfig}
                />
            ))
        )
        if (this.props.loading) {
            authForm = <Spinner />
        };
        if (this.props.token !== null) {
            authForm = <Redirect to='/' />
        }
        return (
            <form onSubmit={this.authHandler} >
                {this.props.error ? <p>{this.props.error}</p> : null}
                {authForm}
                <Button
                    clicked={this.authHandler}
                    disable={disabled}
                    btnType='Success'>Sign up</Button>
            </form >

        );
    };
};


const mapStateToProps = state => {
    return {
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = disaptch => {
    return {
        onAuthInit: (event) => disaptch(actions.authInit(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);