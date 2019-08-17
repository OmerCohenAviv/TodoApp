import React from 'react';


const todoForm = (props) => {


    return (
        <div>

            <SendButton
                type={'primary'}
                disable={disable}
                clicked={this.postingDataHandler}
                clicking='clicking'>
                {this.props.token ? 'Submit' : 'Login First '}
            </SendButton>
        </div>
    );
};



export default todoForm;