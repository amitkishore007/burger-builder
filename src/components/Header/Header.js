import React from 'react'
import classes from './Header.module.css';
import Logo from '../UI/Logo/Logo';
import NavigationItems from '../UI/NavigationItems/NavigationItems';

export default function Header() {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav>
               <NavigationItems />
            </nav>
        </header>
    )
}
