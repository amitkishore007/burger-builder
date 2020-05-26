import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
    state = {
        name: '',
        email :'',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderBurger = () => {
        console.log(this.state);

        this.setState({ loading: true });
        const dataTosave = {
            ingredients : {...this.props.ingredients},
            price: this.props.price,
            user: {
                name: "Max",
                email: "jetha@gmail.com",
                address: {
                    street: "123 XYX",
                    postalCode: 11092,
                    country: 'Canada'
                }
            }
        }

        axiosInstance.post('orders.json', dataTosave)
            .then((result) => {
                this.setState({loading: false});
                this.props.history.replace('/');
            })
            .catch((error) => {
                this.setState({loading: false});
            });
    }

    render() {


        let form = <form>
                <input className={classes.Input} type="text" placeholder="Enter Name" />
                <input className={classes.Input} type="email" placeholder="Enter Email address" />
                <input className={classes.Input} type="text" placeholder="Enter Steet" />
                <input className={classes.Input} type="text" placeholder="Enter Postal code" />
                <Button type="Success" clicked={this.orderBurger}>ORDER</Button>
            </form>;
        if(this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Hey! Last step to get your Burger</h4>
                {form}
            </div>
        )
    }
}
