import React from 'react'

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary';

export default function NavigationItems(props) {

    let items = (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
    );

    if(props.isAuth) {
        items = (
            <Auxiliary>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">logout</NavigationItem>
            </Auxiliary>
        );
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {items}
        </ul>
    )
}
