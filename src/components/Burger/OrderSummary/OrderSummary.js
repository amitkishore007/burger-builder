import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    
    let items = Object.keys(props.ingredients).filter((key) => props.ingredients[key] > 0).map((key, index) => {
        return <li key={key+''+index}>{key}: {props.ingredients[key]}</li>;
    });
    
    return (
        <div>
            <p>Ingredients</p>
            <ul>
                {items}
            </ul>

            <p>Total Price: ${props.price.toFixed(2)}</p>
            <Button type="Danger" clicked={props.close}>Cancel</Button>
            <Button type="Success" clicked={props.purchase}>Continue</Button>
        </div>
    )
}

export default OrderSummary;