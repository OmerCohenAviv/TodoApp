import React from 'react';

import classes from './Input.module.css';


const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement]
    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid)
    }
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
            inputClasses = []
            inputClasses.push(classes.Textarea)
            if (!props.valid && props.touched) {
                inputClasses.push(classes.Invalid)
            }
            inputElement =
                <textarea
                    {...props.elementConfig}
                    className={inputClasses.join(' ')}
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