import React from 'react'

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

export default function NavigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/checkout">Checkout</NavigationItem>
        </ul>
    )
}
