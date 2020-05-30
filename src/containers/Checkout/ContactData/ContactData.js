import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                label: 'Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    min: 3,
                    max: 8
                }
            },
            email :{
                label: 'Email Address',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter E-Mail Address'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            street: {
                label: 'Street Address',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            postalCode: {
                label: 'Postal Code',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Postal Code'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            country:{
                label: 'Country',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Country'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            deliveryMethod:{
                label: 'Mode of delivery',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {label: 'Fastest', value: 'fastest'},
                        {label: 'Slowest', value: 'slowest'},
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    }

    orderBurger = (event) => {
        event.preventDefault();
        console.log(this.state);

        const userData = {};
        Object.keys(this.state.orderForm).forEach((key) => {
            userData[key] = this.state.orderForm[key].value;
        });

        this.setState({ loading: true });
        const dataTosave = {
            ingredients : {...this.props.ingredients},
            price: this.props.price,
            userData: userData
        }

        this.props.onSaveOrder(dataTosave);
    }

    changeHandler = (event, element) => {
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedElement = {...updatedForm[element.id]};

        updatedElement.value = event.target.value;
        updatedElement.touched = true;

        updatedElement.valid  = this.checkValidity(updatedElement.value, updatedElement.validation);

        updatedForm[element.id] = updatedElement;
        
        let formIsValid = true;
        Object.keys(updatedForm).forEach((key) => {
            formIsValid = updatedForm[key].valid && formIsValid
        });

        this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
    }

    checkValidity(value, rules) {
        let isValid  = true;

        if(rules && rules.required && isValid) {
            isValid = value.trim().length > 0;
        }

        if(rules && rules.min && isValid) {
            isValid = value.trim().length >= rules.min;
        }

        if(rules && rules.max && isValid) {
            isValid = value.trim().length <= rules.max;
        }

        
        return isValid;
    }

    render() {

        const inputElements = [];
        Object.keys(this.state.orderForm).forEach((key) => {
            inputElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        });

        let form = <form onSubmit={this.orderBurger}>
                {inputElements.map((element)=>{
                    return <Input key={element.id} 
                                  elementType={element.config.elementType} 
                                  elementConfig={element.config.elementConfig} 
                                  changed={(event) => this.changeHandler(event, element)}
                                  invalid={!element.config.valid}
                                  touched={element.config.touched}/>
                })}
                <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>;
        if(this.props.loading) {
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

const mapStateToProps = (state) => {
    return {
        loading: state.orders.loading,
        error: state.orders.error,
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveOrder: (data) => dispatch(actions.saveOrder(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));