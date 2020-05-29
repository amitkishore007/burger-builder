import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import { addIngredient, removeIngredient } from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        show: false,
        loading: false,
        error: null
    }

    // addMorehandler = (type) => {
    //     const ingredients = {...this.props.ingredients};
    //     ingredients[type] += 1;
    //     const updatedPrice = PRICES[type] + this.props.price;

    //     this.setState({ ingredients: ingredients, totalPrice: updatedPrice });
    // }

    // removeHandler = (type) => {
    //     const ingredients = {...this.props.ingredients};
    //     if(!ingredients[type]) {
    //         return;
    //     }

    //     ingredients[type] -= 1;
    //     const updatedPrice = this.props.price - PRICES[type];
    //     this.setState({ingredients: ingredients, totalPrice: updatedPrice});
    // }
    
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
        // const queryParam = [];
        // Object.keys(this.props.ingredients).forEach((key) => {
        //     queryParam.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ingredients[key]));
        // });

        // queryParam.push('price='+this.props.price);
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: queryParam.join('&')            
        // });

        this.props.history.push('/checkout');
    }

    resetState = () => {
        const ingredients = {...this.props.ingredients};
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

        if(this.props.ingredients) {
            Object.keys(this.props.ingredients).forEach((key) => {
                disableInfo[key] = this.props.ingredients[key] <= 0;
            });
    
            orderSummary = <OrderSummary 
                                    close={this.closeModalHandler}
                                    purchase={this.onPurchaseHandler}
                                    ingredients={this.props.ingredients}
                                    price={this.props.price}/>;
            if(this.state.loading) {
                orderSummary = <Spinner />;
            } 



            burger = (
                        <Auxiliary>
                            <Burger ingredients={this.props.ingredients}/>
                            <BuildControls 
                                addmore={this.props.addIngredient} 
                                remove={this.props.removeIngredient}
                                disableinfo={disableInfo}
                                price={this.props.price}
                                placeorder={this.showModalHandler}/>
                        </Auxiliary>
                     );
        }

        if(this.state.error) {
            burger = <p style={{textAlign:'center'}}>{this.state.error} : Unable to perform the action.</p>
        }


        return (
            <Auxiliary>
                <Modal close={this.closeModalHandler} show={this.state.show}>
                    {orderSummary}
                </Modal>
                { burger }
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (value) => dispatch(addIngredient(value)),
        removeIngredient: (value) => dispatch(removeIngredient(value)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));