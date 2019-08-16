import React from 'react';


import List from '@material-ui/core/List';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'



function NavBar(props) {
    return (
        <List component="nav">
            <NavigationItems />
        </List>
    )
}


export default NavBar;