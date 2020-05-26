import React from 'react';
import classes from './Layout.module.css';
import Auxiliary from '../../hoc/Auxiliary';
import Header from '../Header/Header';

const Layout = (props) => {
    return (
        <Auxiliary>
            <Header />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )
};

export default Layout;
