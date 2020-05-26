import React from 'react'
import classes from './CheckoutSummary.module.css'
import Burger  from '../Burger';
import Button from '../../UI/Button/Button';

export default function CheckoutSummary(props) {
   
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Yeah! Your Burger is ready.</h1>
            <div>
                <Burger ingredients={props.ingredients}/>
            </div>

            <Button type="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button type="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
}
