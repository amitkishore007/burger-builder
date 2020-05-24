import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const CONTROLS = [
    {type: 'cheese', label: 'Cheese'},
    {type: 'meat', label: 'Meat'},
    {type: 'salad', label: 'Salad'},
    {type: 'bacon', label: 'Bacon'},
]

export default function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>

            <p>Price: <strong>${ props.price.toFixed(2) }</strong></p>

            {CONTROLS.map((control, index) => {
                return <BuildControl 
                                control={control} 
                                key={control.type + index} 
                                add={() => props.addmore(control.type)}
                                remove={() => props.remove(control.type)}
                                disabled={props.disableinfo[control.type]}/>
            })}


            <button className={classes.OrderButton} disabled={props.price <= 0} onClick={props.placeorder}>ORDER NOW</button>
        </div>
    );
}
