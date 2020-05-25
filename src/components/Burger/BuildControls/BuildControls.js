import React, { Component } from 'react'
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const CONTROLS = [
    {type: 'cheese', label: 'Cheese'},
    {type: 'meat', label: 'Meat'},
    {type: 'salad', label: 'Salad'},
    {type: 'bacon', label: 'Bacon'},
]

export default class BuildControls extends Component {
    render() {
        return (
            <div className={classes.BuildControls}>
    
                <p>Price: <strong>${ this.props.price.toFixed(2) }</strong></p>
    
                {CONTROLS.map((control, index) => {
                    return <BuildControl 
                                    control={control} 
                                    key={control.type + index} 
                                    add={() => this.props.addmore(control.type)}
                                    remove={() => this.props.remove(control.type)}
                                    disabled={this.props.disableinfo[control.type]}/>
                })}
    
    
                <button className={classes.OrderButton} disabled={this.props.price <= 0} onClick={this.props.placeorder}>ORDER NOW</button>
            </div>
        );
    }
}
