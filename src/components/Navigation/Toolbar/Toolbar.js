import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.css'

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <NavigationItems />
    </div>
)


export default toolbar;