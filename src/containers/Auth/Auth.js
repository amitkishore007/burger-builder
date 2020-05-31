import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        form: {
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
            password: {
                label: 'Password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    min: 6,
                    max: 12
                }
            },
        },
        formIsValid: false
    }

    changeHandler = (event, element) => {
        const updatedForm = {
            ...this.state.form
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

        this.setState({ form: updatedForm, formIsValid: formIsValid });
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


    onAuth = (event, authType) => {
        event.preventDefault();
        const userData = {};
        Object.keys(this.state.form).forEach((key) => {
            userData[key] = this.state.form[key].value;
        });

        this.props.onAuth(userData, authType);
        return false;
    }


    render() {

        const inputElements = [];
        Object.keys(this.state.form).forEach((key) => {
            inputElements.push({
                id: key,
                config: this.state.form[key]
            })
        });

        let form = <form>
                {inputElements.map((element)=>{
                    return <Input key={element.id} 
                                  elementType={element.config.elementType} 
                                  elementConfig={element.config.elementConfig} 
                                  changed={(event) => this.changeHandler(event, element)}
                                  invalid={!element.config.valid}
                                  touched={element.config.touched}/>
                })}
                <Button type="Success" disabled={!this.state.formIsValid} clicked={(event) => this.onAuth(event, 'login')}>Login</Button>
                <Button type="Success" disabled={!this.state.formIsValid} clicked={(event) => this.onAuth(event, 'signup')}>Signup</Button>
            </form>;
        if(this.props.loading) {
            form = <Spinner />;
        }
        
        return (
            <div className={classes.Auth}>
                { this.props.isAuthenticated ? <Redirect to="/" /> :null }
                { this.props.error? <p>{this.props.error}</p> : null }
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (userData, type) => dispatch(actions.auth(userData, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);