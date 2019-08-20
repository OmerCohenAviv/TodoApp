import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton';


const todoForm = (props) => {
    //Form for editing.
    return (
        <div style={{ width: '50%', float: 'right'}}>
            {props.textFields}
            <SendButton
                clicked={props.editSend}
                type={'primary'}
                disabled={props.disabled}>
                {props.editText}
            </SendButton>
            <SendButton
                clicked={props.cancelClicked}
                type={'primary'}
                disabled={props.disabled}>
                {props.cancelText}
            </SendButton>
        </div>
    );
};



export default todoForm;