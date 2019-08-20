import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton';


const infoForm = ( props ) => {

    return (    
        <form  >
            {props.textFields}
            <SendButton
            type={props.type}
            clicked = {props.clicked}
            disabled={props.disabled}>{props.actionType}</SendButton>
        </form>
    )
};


export default infoForm;