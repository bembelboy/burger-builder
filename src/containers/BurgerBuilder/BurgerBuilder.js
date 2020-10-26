import React, { Component } from 'react';
import axios from '../../axioxInstances/axios-orders';
import { connect } from 'react-redux';

import * as  burgerBuilderActions from '../../store/actions/index';
import Aux from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {

    state = {
        purchasing: false, //needed for the OrderSummary to show
    }

    componentDidMount() {
       // console.log(this.props)
        this.props.initIngredients()
    }

    updatePurchaseState(updatedIngredients) {// Changes the Burger
        const ingredients = updatedIngredients;
        const sum = Object.keys(ingredients) //return  the keys out of the ingredients Object into an array
            .map(igKey => {
                return ingredients[igKey] //iterates over the object and returns the values of the Object in an array
            })
            .reduce((sum, el) => { //reduces the array to one number 
                return sum + el;
            }, 0);// 0 is always the starting point

        return sum > 0 //gives true or false back
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }else {
            this.props.history.push('/auth') 
        }
        
    }

    purchaseCancelHandler = () => { //bringredients you back to the order screen
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => { //Brings you to the checkoutPage
        this.props.onInitPurchase(); //sets purchased to false important when you order more than one burger
        this.props.history.push('/checkout'); //Redirects user to checkout
    }


    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) { //checks if an ingredieent is 0 returns true if it is 
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} //added to BuildControls Map Method
                        ingredientRemoved={this.props.onIngredientRemoved} //added to BuildControls Map Method
                        disabled={disabledInfo} // added to OrderButton in BuildControls.js
                        purchaseable={this.updatePurchaseState(this.props.ingredients)} //added to the OrderButton in BuildControls.js
                        ordered={this.purchaseHandler} //added to OrderButton in BuildControls.js
                        price={this.props.price} //added to Price in BuildControls.js
                        authenticated={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.price} //used in an p Element in OrderSummary.js
                    modalClosed={this.purchaseCancelHandler} //used in DangerButton in OrderSummary.js
                    purchaseContinue={this.purchaseContinueHandler} //used in SucessButton in OrderSummary.js
                />
            );
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing} //added in Modal.js
                    modalClosed={this.purchaseCancelHandler} //added in Backdrop.js
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); //axios is the2nd argument in the hoc