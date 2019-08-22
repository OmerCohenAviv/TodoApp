import React, { Fragment } from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let navigation = ''
    if (props.auth) {
        navigation = (
            <Fragment >
                <NavigationItem styling={{marginRight:'auto'}}  link='/' >Home</NavigationItem>
                <NavigationItem styling={{marginRight: 'auto'}} link='/alltodos' >Completed Todo </NavigationItem>
                <NavigationItem  link='logout' >Logout!</NavigationItem>
            </Fragment>
        )
    }
    else {
        navigation = (
            <Fragment >
                <NavigationItem  styling={{marginRight:'auto'}} link='/' > Home  </NavigationItem>
                <NavigationItem  styling={{marginRight: '20px'}} link='/register'> Sign up! </NavigationItem>
                <NavigationItem   link='/login'> Login! </NavigationItem>
            </Fragment>
        );
    }
    return <ul className={classes.NavigationItems}>
        {navigation}
    </ul>

};


export default navigationItems;