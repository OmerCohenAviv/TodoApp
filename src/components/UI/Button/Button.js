import React from 'react';
import Radium from 'radium'

import classes from './Button.module.css';

const button = (props) => (
        <button
        disabled={!props.disable}
        style={props.style}
        onClick={props.clicked}
        className={[classes.Button, classes[props.btnType]].join(' ')}>   
        {props.children}
        </button>
)

export default Radium(button);