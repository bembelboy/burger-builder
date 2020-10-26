import React from 'react';
import PropTypes from 'prop-types';

import {BreadBottom, BreadTop, Seeds1, Seeds2, Meat, Cheese, Salad, Bacon} from '../../../styledComponents/styledBurgerIngredients';

const BurgerIngredient = (props) => {

    //Logic:

    let ingredient = null //Starting Ingredient or shows if invalid action occured

    switch (props.type) { //switches the ingredient depending on the button that was clicked
        case ('bread-bottom'):
            ingredient = <BreadBottom />
            break;
        case ('bread-top'):
            ingredient = (
                <BreadTop>
                    <Seeds1 />
                    <Seeds2 />
                </BreadTop>
            );
            break;
        case ('meat'):
            ingredient = <Meat />
            break;
        case ('cheese'):
            ingredient = <Cheese />
            break;
        case ('salad'):
            ingredient = <Salad />
            break;
        case ('bacon'):
            ingredient = <Bacon />
            break;
        default:
            ingredient = null;
    }

    return ingredient
}

BurgerIngredient.propTypes = { //Checks if the requested Value is a string
    type: PropTypes.string.isRequired,
};

export default BurgerIngredient;