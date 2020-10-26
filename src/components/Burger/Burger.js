import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Burger from '../../styledComponents/styledBurger';

const burger = (props) => { // Returns a Burger with all the Ingredients from BurgerIngredient.js
    //LOGIC:
    let transformedIngredients = Object.keys(props.ingredients) //turns the keys of Ingredients (Burger.js) into an Array
    .map(igKey => {
        return [...Array(props.ingredients[igKey])] //returns an empty Array with same number of elements than Ingredients picked.
        .map((_, index) => { //gives the needed Values to the BurgerIngriedent Componenent
             return <BurgerIngredient key={igKey + index} type={igKey} />
        }) 
    })
    .reduce((arr, el) => { // helps to get an empty array if no ingredients are picked yet
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) { //default Message
        transformedIngredients = <p> Please start adding Ingredients!</p> 
    }

    return ( /* The Bread is hardCoded because it needs to be always there*/
        <Burger>
            <BurgerIngredient type='bread-top' /> 
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </Burger>
     );
}
 
export default burger;