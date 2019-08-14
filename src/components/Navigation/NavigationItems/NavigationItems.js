import React, { Fragment } from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let navigation = ''
    if (props.auth) {
        navigation = (
            <Fragment >
                <NavigationItem link='/' >        Home             </NavigationItem>
                <NavigationItem link='/orders' >  Completed Todo   </NavigationItem>
                <NavigationItem link='logout' >   Logout!          </NavigationItem>
            </Fragment>
        )
    }
    else {
        navigation = (
            <Fragment >
                <NavigationItem link='/' >        Home             </NavigationItem>
                <NavigationItem link='/register'> Sign up!         </NavigationItem>
                <NavigationItem link='login'>     Login!           </NavigationItem>
            </Fragment>
        );
    }
    return <ul className={classes.NavigationItems}>
        {navigation}
    </ul>

};


export default navigationItems;