import React from 'react';
import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const Burger = (props) => {

    let ingredients = Object.keys(props.ingredients).map((key) => {
        return [...Array(props.ingredients[key]).fill(key)].map((_, iKey) => {
            return <Ingredient type={key} key={key + '' +  iKey}/>;
        });
    }).reduce((prev, current) => {
        return [...prev, ...current];
    }, []);

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {ingredients.length ? ingredients : <p>Please Select Ingredient</p>}
            <Ingredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;