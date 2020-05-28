import React from 'react'
import classes from './Input.module.css';

export default function Input(props) {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case 'input':
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                                />
        break;
        case 'textarea':
            inputElement = <textarea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                onChange={props.changed}
                                >{props.value}</textarea>
        break;
        case 'select':
            inputElement = (
                <select 
                    value={props.value} 
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    >
                    { props.elementConfig.options.map((option) => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    }) }
                </select>
            )
        break;
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                            />
        break;
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
