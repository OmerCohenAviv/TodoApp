import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton';
import classes from './infoForm.module.css'


const infoForm = ( props ) => {
    let errors = ''
    if(props.error) {
         errors = [...props.error]
         errors =  errors.map(el => {
            if (el === '_') {
                el = ' '
            };
            return el
        })
       errors =  errors.join('')    
    }

    return (    
        <form  className={classes.infoForm}>
            {props.textFields}
            <SendButton
            type={props.type}
            clicked = {props.clicked}
            disabled={props.disabled}>{props.actionType}</SendButton>
            <p style={{color:'red', textTransform:'lowercase',fontSize:'1.8em'}}>{errors}</p>
        </form>
    )
};


export default infoForm;