import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import { BuildControls, Price, OrderButton } from '../../../styledComponents/styledBuildControls';
import Aux from '../../../hoc/auxiliary';

const controls = [
    { label: 'Salad', type: 'salad' }, //type refers to the BurgerIngredient.js switch statement
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },

];

const buildControls = (props) => {

    return (
        <Aux>
            <BuildControls>
                <Price>Current Price: {props.price.toFixed(2)} $</Price> {/*Price in decimal Number*/}
                {controls.map(ctrl => { //returns The ingredientButtons
                    return <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)} //gives the needed type for the addIngredientHandler in the reducerFunction
                        removed={() => props.ingredientRemoved(ctrl.type)} // gives the needed type for the removeIngredientHander in the reducerFunction
                        disabled={props.disabled[ctrl.type]}
                    /> //returns all the elements of control in js.5
                })}
                            <OrderButton
                             disabled={!props.purchaseable} 
                             onClick={props.ordered}
                            >{props.authenticated ? 'ORDER NOW' : 'Sign In Now' }
                            </OrderButton>
            </BuildControls>
        </Aux>
    );
}

export default buildControls;