import React from 'react';

import classes from './Card.module.css'

const card = (props) => {
    return (
        <form className={classes.Card}>
            {props.children}
        </form>
    )
};


export default card