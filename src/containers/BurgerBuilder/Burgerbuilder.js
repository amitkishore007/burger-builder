import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Header from '../../components/Header/Header';

const PRICES = {
    meat: 0.2, 
    salad: 0.25,
    bacon: 1.2,
    cheese: 0.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients:{
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 0,
        show: false
    }

    addMorehandler = (type) => {
        const ingredients = {...this.state.ingredients};
        ingredients[type] += 1;
        const updatedPrice = PRICES[type] + this.state.totalPrice;

        this.setState({ ingredients: ingredients, totalPrice: updatedPrice });
    }

    removeHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        if(!ingredients[type]) {
            return;
        }

        ingredients[type] -= 1;
        const updatedPrice = this.state.totalPrice - PRICES[type];
        this.setState({ingredients: ingredients, totalPrice: updatedPrice});
    }
    
    closeModalHandler = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                show: false
            }
        });
    }

    showModalHandler = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                show: true
            }
        });
    }

    onPurchaseHandler = () => {
        alert('Item purchased');
    }

    render() {

        const disableInfo = {};

        Object.keys(this.state.ingredients).forEach((key) => {
            disableInfo[key] = this.state.ingredients[key] <= 0;
        });

        return (
            <Auxiliary>
                <Header />

                <Modal close={this.closeModalHandler} show={this.state.show}>
                    <OrderSummary 
                            close={this.closeModalHandler}
                            purchase={this.onPurchaseHandler}
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}/>
                </Modal>

                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                        addmore={this.addMorehandler} 
                        remove={this.removeHandler}
                        disableinfo={disableInfo}
                        price={this.state.totalPrice}
                        placeorder={this.showModalHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;