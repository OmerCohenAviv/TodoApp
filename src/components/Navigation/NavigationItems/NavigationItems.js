import React, {  } from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' >        Home             </NavigationItem>
        <NavigationItem link='/orders' >  Completed Todo   </NavigationItem>
        <NavigationItem link='/register'> Sign up!         </NavigationItem>
        <NavigationItem link='login'>     Login!           </NavigationItem>
        <NavigationItem link='logout' >   Logout!          </NavigationItem>
    </ul> 

);


export default navigationItems;