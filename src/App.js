import React, { Component } from 'react';

import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import SignIn from './containers/Auth/SignIn/SignIn';

import { Route, Switch } from 'react-router-dom'

import './App.css';


import Layout from './hoc/Layout/Layout';


class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/register' component={Auth} />
        <Route path='/logout' component={Logout} />
        <Route path='/login' component={SignIn} />
        <Route path='/'  exact component={Home} />
      </Switch>
    )
    return (
      <Layout>
        {routes}
      </Layout>
    );
  };
};


export default App