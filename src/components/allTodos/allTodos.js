import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton'
import Modal from '../UI/Modal/Modal';

const allTodos = (props) => {
    //important -> Coloring title by importantcy
    let important = 'green'
    if (props.important === 'high') {
        important = 'red';
    }
    if (props.important === 'medium') {
        important = 'yellow';
    }
    return <div  >
        <strong style={{ color: important }}>{props.title} -</strong>
        <div style={{ wordWrap: "break-word" }}>{props.context}</div>
        <ul style={{ textAlign: 'end' }}>
            <Modal>Click</Modal>
            <SendButton
                clicked={props.editClicked}
                size='small'
                type="primary"
                disabled={true}>
                Edit
            </SendButton>
        </ul>
        <hr />
    </div>
}

export default allTodos