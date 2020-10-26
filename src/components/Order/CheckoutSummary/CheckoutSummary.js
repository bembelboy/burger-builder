import React from 'react';

import Burger from '../../Burger/Burger';

import { SuccessButton, DangerButton } from '../../../styledComponents/styledButton';
import CheckoutSummary from '../../../styledComponents/styledCheckoutSummary';

const checkoutSummary = (props) => {
    let Buttons;
    if (props.showButtons) {
        Buttons = (
            <div>
                <DangerButton onClick={props.checkoutCancelled} >Cancel</DangerButton>
                <SuccessButton onClick={props.checkoutContinued} >Continue</SuccessButton>
            </div>
        )
    }
    return (
        <CheckoutSummary>
            <h1> Enjoy your meal!</h1>
            <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
                {Buttons}
            </div>
        </CheckoutSummary>
    );
}

export default checkoutSummary; //imported in Checkout.js