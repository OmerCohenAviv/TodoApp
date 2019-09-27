import React, { Component } from 'react';

import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import SignIn from './containers/Auth/SignIn/SignIn';
import {connect} from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Layout from './hoc/Layout/Layout';
import AllTodos from './containers/allTodos/allTodos';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount () {
    return this.props.onAutoSignIn()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/alltodos' component={AllTodos} />
        <Route path='/register' component={Auth} />
        <Route path='/logout'   component={Logout} />
        <Route path='/login'    component={SignIn} />
        <Route path='/' exact   component={Home} />
      </Switch>
    )
    return (
      <Layout>
        {routes}
      </Layout>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return { onAutoSignIn: () => dispatch(actions.signInAuto()) } 
};

export default connect(null,mapDispatchToProps)(App);