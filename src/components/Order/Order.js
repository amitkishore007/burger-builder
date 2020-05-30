import React from 'react'
import classes from './Order.module.css';

export default function Order(props) {

    const ingredients = [];

    Object.keys(props.ingredients).forEach((key, index) => {
        ingredients.push((<span 
                            key={index}
                            style={{
                                textTransform: 'capitalize',
                                display: 'inline-block',
                                margin: '0 5px',
                                border: '1px solid #ccc',
                                padding: '5px'
                            }}
                            > {key}({props.ingredients[key]})</span>))
    });


    return (
        <div className={classes.Order}>
            <p>Ingredient: {ingredients}</p>
            <p>Price: < strong>USD: {props.price ? props.price.toFixed(2) :0}</strong></p>
        </div>
    )
}
