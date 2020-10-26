import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import { SuccessButton, DangerButton } from '../../styledComponents/styledButton';
import { StyledAuth } from '../../styledComponents/styledSignIn';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidation } from '../../shared/utility';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Adress'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    valid: false,
                    touched: false,
                    validEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true,
                    valid: false,
                    touched: false,
                    minLength: 7,
                }
            },
        },
        isSignUp: true,
    }

    inputChangedHandler = (event, controlName) => {//Changes the Value of EMail and Password and gives it to checkValidation
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                validation: updateObject(this.state.controls[controlName],{
                    valid: checkValidation(event.target.value, this.state.controls[controlName].validation),
                    touched: true,
                })
            })         
        });
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => { //sends Email and Password to firebase
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => { //toggles isSignup
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }


    render() {
        const formElementsArray = []; //Stores the state
        for (let key in this.state.controls) { //the keys are the identifiers such as name ZIPcode etc
            formElementsArray.push({
                id: key,
                config: { ...this.state.controls[key] },
                validation: { ...this.state.controls[key].validation },
            })
            // console.log(formElementsArray)
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.elementValue}
                invalid={!formElement.validation.valid}
                touched={formElement.validation.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} //the id has the same value as the key pairs 
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let error = null
        if (this.props.error) {
            switch (this.props.error) {
                case this.props.error.message.toString() === 'EMAIL_EXISTS':
                    error = <p style={{ textAlign: 'center' }}>Email is already in Use</p>
                    break;
                default: error = <p>Ooops something went wrong</p>
                    break;
            }
        }

        let authRedirect = null; //redierects the user to the checkoutPage or the landing page depending on ig he built or not built a buger
        if (this.props.isAuthenticated && !this.props.building) {
            authRedirect = <Redirect to='/' />
        } else if (this.props.isAuthenticated && this.props.building) {
            authRedirect = <Redirect to='/checkout' />
        }

        return (
            <StyledAuth>
                <h1>{this.state.isSignUp ? 'Registration' : 'Login'}</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <SuccessButton >Submit</SuccessButton>
                </form>
                <DangerButton
                    onClick={this.switchAuthModeHandler}
                > {this.state.isSignUp ? 'Switch to Login' : 'Switch to Registration'}</DangerButton>
                {error}
                {authRedirect}
            </StyledAuth>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);