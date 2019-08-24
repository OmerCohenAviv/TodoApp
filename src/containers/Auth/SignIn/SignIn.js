import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authForm } from '../../../utility/Configs/Configs';
import { updateObject, checkValid, updateElementAuth} from '../../../utility/sharedFunctions/sharedFunctions';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import TextField from '@material-ui/core/TextField';
import InfoForm from '../../../components/infoForm/infoForm';




class SignIn extends Component {
    state = {...authForm};

    
    changeHandler = (id, event) => {
        console.log(this.state)
        const valid = checkValid(this.state.authData[id].rules, event.target.value)
        console.log(id)
        const updatedEl = updateElementAuth(event, id, valid, this)
        const updateAuthData = updateObject(this.state.authData, { [id]: updatedEl } );
        this.setState({ authData: updateAuthData })
    };

    authHandler = (event) => {
        event.preventDefault();
        const authPayload = {
            email: this.state.authData.userName.value,
            password: this.state.authData.password.value,
            returnSecureToken: true
        }
        this.props.onSignInInit(authPayload);
    }

    render() {

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
                <TextField style={{ marginRight: '20px', marginLeft: '30px' }}
                    label={ele.config.elementConfig.label}
                    onChange={(event) => this.changeHandler(ele.id, event)}
                    key={ele.id}
                    type={ele.config.elementConfig.type}
                    valid={ele.config.valid.toString()}
                    touched={ele.config.touched.toString()}
                    value={ele.config.value}
                    elementconfig={ele.config.elementConfig}
                />
            ))
        );
        if (this.props.loading) {
            authForm = <Spinner />
        };
        if (this.props.token !== null) {
            authForm = <Redirect to='/' />
        }
        let disabled = this.state.authData['userName'].valid && this.state.authData['password'].valid

        return (
            this.props.loading ? <Spinner /> :
                <InfoForm
                    error={this.props.error}
                    actionType='Login!'
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
    return { onSignInInit: (event) => disaptch(actions.signInInit(event)) }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);