import React from 'react';

import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classes from './NavigationItem.module.css'



const navigationItem = (props) => {
 
return <li style={props.styling}>
        <NavLink  activeClassName={classes.active} to={props.link} exact   style={{textDecoration:'none',color:'white'}}>
        <Button   variant='outlined' color="inherit" >{props.children}</Button>   
        </NavLink>
    </li>
};


export default navigationItem;