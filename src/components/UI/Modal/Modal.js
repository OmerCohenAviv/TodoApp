import React, { Fragment } from 'react';
import classes from './Modal.module.css'

const Modal = (props) => (

    <Fragment>
        <div className={classes.Modal}
            style={{
                transform: true ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: true ? '1' : '0'
            }}
        >{props.children}
        </div>
    </Fragment>
)


export default Modal;