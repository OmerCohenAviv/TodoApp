import React from 'react';

const allTodos = (props) => (
    <div>
        <p>{props.title}
            <button >edit</button>
            somting {props.index}
            <button onClick={props.removeClicked}>remove</button>
        </p>
    </div>
)

export default allTodos