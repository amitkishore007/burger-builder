import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Header from '../../components/Header/Header';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const PRICES = {
    meat: 0.2, 
    salad: 0.25,
    bacon: 1.2,
    cheese: 0.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        show: false,
        loading: false,
        error: null
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

        this.setState({ loading: true });
        const dataTosave = {
            ingredients : {...this.state.ingredients},
            price: this.state.totalPrice,
        }

        axiosInstance.post('orders.json', dataTosave)
            .then((result) => {
                console.log(result,'Result');
                this.setState({loading: false, show: false});
                this.resetState();
            })
            .catch((error) => {
                console.log(error, 'Error');
                this.setState({loading: false});
            });
    }

    resetState = () => {
        const ingredients = {...this.state.ingredients};
        const updatedIngredient = {};
        Object.keys(ingredients).forEach((key) => {
            updatedIngredient[key] = 0;
        });

        this.setState({ ingredients: updatedIngredient, totalPrice: 0 });
    }

    componentDidMount = () => {
        this.setState({ error: null });
        axiosInstance.get('ingredients.json')
                .then((response) => {
                    console.log(response);
                    if(response) {
                        this.setState({ ingredients: {...response.data} });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ error: error.message});
                });
    } 

    render() {

        const disableInfo = {};
        let orderSummary = null;
        let burger = <Spinner />;

        if(this.state.ingredients) {
            Object.keys(this.state.ingredients).forEach((key) => {
                disableInfo[key] = this.state.ingredients[key] <= 0;
            });
    
            orderSummary = <OrderSummary 
                                    close={this.closeModalHandler}
                                    purchase={this.onPurchaseHandler}
                                    ingredients={this.state.ingredients}
                                    price={this.state.totalPrice}/>;
            if(this.state.loading) {
                orderSummary = <Spinner />;
            } 



            burger = (
                        <Auxiliary>
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

        if(this.state.error) {
            burger = <p style={{textAlign:'center'}}>{this.state.error} : Unable to perform the action.</p>
        }


        return (
            <Auxiliary>
                <Header />
                <Modal close={this.closeModalHandler} show={this.state.show}>
                    {orderSummary}
                </Modal>
                { burger }
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);