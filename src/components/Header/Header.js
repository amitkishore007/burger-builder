import React, { PureComponent } from 'react'
import classes from './Header.module.css';
import Logo from '../UI/Logo/Logo';
import NavigationItems from '../UI/NavigationItems/NavigationItems';

export default class Header extends PureComponent {

    componentDidMount() {
        console.log('[Header] componentDidMount');
    }

    componentDidUpdate() {
        console.log('[Header] ComponentDidUpdate');
    }

    render() {
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
}
