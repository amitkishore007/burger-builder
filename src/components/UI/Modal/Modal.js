import React from 'react'
import classes from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

export default function Modal(props) {

    if(!props.show) {
        return null;
    }

    return (
        <Auxiliary>
            <Backdrop close={props.close}/>
            <div className={classes.Modal}>
                {props.children}
            </div>
        </Auxiliary>
    )
}
