import React from 'react';

import SendButton from '../UI/Buttons/sendButton/sendButton'

const allTodos = (props) => {
    //important -> Coloring title by importantcy
    let important = 'green'
    if (props.important === 'high') {
        important = 'red';
    }
    if (props.important === 'medium') {
        important = 'yellow';
    }
    return <div>
        <strong style={{color: important}}>{props.title} -</strong>
        <SendButton
            size='small'
            clicked={props.removeClicked}
            type="secondary"
            disabled={true}>
            Delete
                    </SendButton>
        <SendButton
            size='small'
            type="primary"
            disabled={true}>
            Edit
            </SendButton>
    </div>
}

export default allTodos