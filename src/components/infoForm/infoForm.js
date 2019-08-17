import React from 'react';

import TextField from '@material-ui/core/TextField';
import SendButton from '../UI/Buttons/sendButton/sendButton';

const infoForm = (props) => {
    return (
        <form>
            <TextField
                label="Email"
                value={props.name}
                onChange={props.handleChange}
                margin="normal"
            />
            <TextField
                label="Password"
                value={props.name}
                onChange={props.handleChange}
                margin="normal"
            />
            <SendButton
            disabled={props.disabled}>Login!</SendButton>
        </form>
    )
};


export default infoForm;