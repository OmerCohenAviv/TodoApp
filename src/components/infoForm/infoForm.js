import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton';


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
        <form style={{textAlign:'center'}} >
            {props.textFields}
            <SendButton
            type={props.type}
            clicked = {props.clicked}
            disabled={props.disabled}>{props.actionType}</SendButton>
            <p style={{color:'red', textTransform:'lowercase'}}>{errors}</p>
        </form>
    )
};


export default infoForm;