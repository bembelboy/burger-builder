import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        showButtons: true,
    }

    checkoutCancelledHandler = () => { //Brings you back to the lat Page
        this.props.history.goBack(); //Method is available beacause Checkout is a direct child of BrowserRouter
    }

    checkoutContinuedHandler = () => {//Brings User to the Contact Page
        this.props.history.replace('checkout/contact-data'); //Available beacause Checkout is a direct child of BrowserRouter
        this.setState(prevState => ({
            showButtons: !prevState.showButtons,
        }))
    }


    render() {
        let summary = <Redirect to='/' /> //redirects the user to the startingPage when the ingredients cant be loaded
        const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null; //redirects the user to the HomePage if the Purchasing is conplete

        if (this.props.ingredients) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        showButtons={this.state.showButtons}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }
        return (
             summary 
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.orders.purchased //false initially
    }
}


export default connect(mapStateToProps)(Checkout); //imported in App.js