import React from 'react';

import {StyledOrder, IngredientSpan }from '../../styledComponents/styledOrder';

const order = (props) => {
    const ingredients = [] //you could also use the same Llogic as in Burger.js
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    } // Creates an IngredientArray [{ingredienName: string, ingredientAmount: number}, {ingredientName : number}, etc.]

    const ingredientOutput = ingredients.map(ig =>{
    return <IngredientSpan 
    key={ig.name}>{ig.name}: {ig.amount}
    </IngredientSpan>
    });

    return (
        <StyledOrder>
            <h4>Ingredients:</h4>
            {ingredientOutput}
            <p>Price: <strong>{props.price.toFixed(2)} USD </strong></p>
        </StyledOrder>
    );
}

export default order;