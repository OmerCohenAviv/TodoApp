import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'


class Layout extends Component {
    render() {
        return (
            <Fragment>
                <main className={classes.Layout}>
                    <Toolbar auth={this.props.token !== null}/>
                    {this.props.children}
                </main>
            </Fragment>

        );
    };
};

const mapStateToProps = state => {
    return {
        token : state.authReducer.token
    }
}


export default connect(mapStateToProps)(Layout);