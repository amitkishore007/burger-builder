import React, { Component } from 'react'
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


export default class Checkout extends Component {
    
    state = {
        ingredients: null,
        price: 0
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        
        this.props.history.replace({
            pathname: this.props.match.url + '/contact-data'
        });
    }

    componentDidMount() {
        const queryParam  = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (const param of queryParam.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];            
            }
        }
        this.setState({ ingredients: ingredients, price: price })
    }

    render() {
        return (
            <div>
               { this.state.ingredients ? <CheckoutSummary 
                        ingredients={this.state.ingredients} 
                        checkoutCancel={this.checkoutCancelHandler} 
                        checkoutContinue={this.checkoutContinueHandler}/>: null}
                <Route path={this.props.match.url + '/contact-data'} component={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>
        )
    }
}
