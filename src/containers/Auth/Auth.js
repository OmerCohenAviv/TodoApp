import React, { Component } from 'react';

import { connect } from 'react-redux'
import {updateObject} from '../../sharedFunctions/updateObject';
import Input from '../../components/UI/Input/Input';


class Auth extends Component {
    state = {
        authData: {
            userName: {
                elementType: 'text',
                elementConfig: {
                    label: 'User Name ',
                    type: 'text',
                    placeholder: 'User Name',
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter Password',
                },
                value: ''
            }
        }
    };
    changeHandler = (id,event) => {
        const updateEl = updateObject(this.state.authData[id].value , {value: event.target.value} )
        const updateAuthData = updateObject(this.state.authData, {
            [id]: updateEl
        });
        this.setState({authData: updateAuthData})
    }

    render() {
        let authForm = []
        for (let ele in this.state.authData) {
            authForm.push(
                < Input
                    change= {() => this.changeHandler(ele)}
                    type={this.state.authData[ele].elementConfig.type}
                    placeholder={this.state.authData[ele].placeholder}
                    value={this.state.authData[ele].value}
                    elementConfig={this.state.authData[ele].elementConfig}
                />
            )
        }
        return (
            <div>
                {authForm}
            </div>
        );
    };
};


const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = disaptch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);