import React, { Component } from 'react';
import axios from '../../../axioxInstances/axios-orders';
import { connect } from 'react-redux';

import { StyledContactData } from '../../../styledComponents/styledContactData';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { SuccessButton } from '../../../styledComponents/styledButton';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                },
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                },
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Number'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    validSymbols: '0123456789',
                },
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP-Code'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    minLength: 5,
                    maxLength: 5,
                    touched: false,
                    validSymbols: '01234567890',
                },
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                },
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    validEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                },
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastet' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest', //Default value
                validation: {
                    valid: true, //is needed for FormValidation
                },
            },
        },
        formIsValid: false,
    }

    orderHandler = () => { //sends the ContactData to Firebase
        // console.log(this.props);
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) { //restructured OrderForm so we dont have the nested Objects anymore
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = { //Object that is getting sent to Firebase
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => { //stores the Input from the Contact Data in the State
        //console.log(event.target.value)
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value, //stored the given Value
            valid:  checkValidation(event.target.value, this.state.orderForm[inputIdentifier]),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier] : updatedFormElement,
        })//needed for creating a deep Clone of the Value



        updatedFormElement.value = event.target.value; //stored the given Value
        updatedFormElement.validation.valid = checkValidation(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.validation.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement; //Assigment to the Clone
        //console.log(updatedFormElement);

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) { //checks if the wholde form is valid
            formIsValid = updatedOrderForm[inputIdentifier].validation.valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = []; //Stores the state
        for (let key in this.state.orderForm) { //the keys are the identifiers such as name ZIPcode etc
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
                validation: this.state.orderForm[key].validation,
            })
            //console.log(formElementArray)
        }

        let form = (
            <form>
                <h4>Please add your Contact Data here:</h4>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.elementValue}
                        invalid={!formElement.validation.valid}
                        touched={formElement.validation.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} //the id has the same value as the key pairs 
                    />
                ))}
                <SuccessButton type='submit' onSubmit={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</SuccessButton>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <StyledContactData>
                {form}
            </StyledContactData>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));