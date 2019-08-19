import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton';


const todoForm = (props) => {
    return (
        <div style={{ textAlign: 'right' }}>
            {props.textFields}
            <SendButton
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