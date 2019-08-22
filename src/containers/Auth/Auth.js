import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValid } from '../../sharedFunctions/sharedFunctions';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../store/actions/index';
import InfoForm from '../../components/infoForm/infoForm';
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
    };

    authHandler = (event) => {
        event.preventDefault();
        const authPayload = {
            email: this.state.authData.userName.value,
            password: this.state.authData.password.value,
            returnSecureToken: true
        };
        this.props.onAuthInit(authPayload);
    };

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
            authFormArr.map(ele => {
                return <TextField style={{marginRight: '20px',marginLeft: '30px' }}
                    label={ele.config.elementConfig.label}
                    onChange={(event) => this.changeHandler(ele.id, event)}
                    key={ele.id}
                    type={ele.config.elementConfig.type}
                    valid={ele.config.valid.toString()}
                    value={ele.config.value}
                    elementconfig={ele.config.elementConfig}
                />
            }) );

        if (this.props.loading) {
            authForm = <Spinner />
        };
        if (this.props.token !== null) {
            authForm = <Redirect to='/' />
        };
        return (
            this.props.loading ? <Spinner /> :         
            <InfoForm
                error={this.props.error}
                actionType='Sign Up'
                textFields={authForm}
                clicked={this.authHandler}
                disabled={disabled}
                type={'primary'} />
            
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
    return {  onAuthInit: (event) => disaptch(actions.authInit(event)) }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);