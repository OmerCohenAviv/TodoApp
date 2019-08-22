import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton';


const todoForm = (props) => {
    //Form for editing.
    return (
        <div style={{marginLeft:'auto',width:'45%',marginRight:'auto'}} >
            {props.textFields}
            <SendButton
                clicked={props.editSend}
                type={'primary'}
                disabled={props.disabled}>
                {props.editText}
            </SendButton>
            <SendButton
                clicked={props.cancelClicked}
                type={'secondary'}
                disabled>
                {props.cancelText}
            </SendButton>
        </div>
    );
};



export default todoForm;