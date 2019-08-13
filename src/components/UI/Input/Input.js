import React from 'react';

import classes from './Input.module.css';

let inputElement = null;
let inputClasses = [classes.InputElement]

const input = (props) => {
    switch (props.elementType) {
        case ('input'):
            inputElement =
                <input
                    {...props.elementConfig}
                    className={inputClasses.join(' ')}
                    placeholder={props.elementConfig.placeholder}
                    onChange={props.change}
                    value={props.value}
                />
            break;
        case ('textarea'):
            inputElement =
                <textarea
                    {...props.elementConfig}
                    className={inputClasses}
                    value={props.value}
                    onChange={props.change}
                    placeholder={props.elementConfig.placeholder} />;
            break;
        case ('select'):
            inputElement =
                <select
                    className={inputClasses}
                    onChange={props.change}>
                    {props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input className={inputClasses} {...props.elementConfig} placeholder={props.value} />
    };

    return (
        <p>
            <label>{props.elementConfig.label}</label>
            {inputElement}
        </p>

    )
};


export default input;