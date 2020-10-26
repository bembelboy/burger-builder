import React, { Component } from 'react';
import Aux from '../../../hoc/auxiliary';
import { SuccessButton, DangerButton } from '../../../styledComponents/styledButton';


class OrderSummary extends Component {
    
    render() {

        const ingredientSummary = Object.keys(this.props.ingredients) //Gets the keys as an Array
            .map((el, index) => {// iterates over them and pushes them into list items
                return (
                    <li key={index + el}>
                        <span
                            style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                        >{el} </span> : {this.props.ingredients[el]}
                    </li>
                );// gets the values from the og Object
            })

        return (
            <Aux>
                <h3 style={{ textAlign: 'center', borderBottom: 'solid 1px', marginBottom: '5%', paddingBottom: '5%' }}>Your Order</h3>
                <ul style={{ textAlign: 'left', listStyleType: 'none', marginLeft: '33%', }}>
                    {ingredientSummary}
                </ul>
                <p style={{ textAlign: 'center', borderTop: 'solid 1px ', paddingTop: '5%' }}><strong>Total Price: {this.props.totalPrice.toFixed(2)}$</strong></p>
                <p style={{ fontWeight: 'bold', textAlign: 'center', borderTop: 'solid 1px ', paddingTop: '5%' }}>Continue to Checkout ?</p>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <DangerButton onClick={this.props.modalClosed} >Cancel</DangerButton>
                    <SuccessButton onClick={this.props.purchaseContinue} >Continue</SuccessButton>
                </div>
            </Aux>
        );
    }
}

export default OrderSummary;