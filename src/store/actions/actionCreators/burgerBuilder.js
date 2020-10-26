import axios from '../../../axioxInstances/axios-orders';

import * as actionTypes from '../actionTypes';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADDINGREDIENT,
        ingredientName: ingName,
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVEINGREDIENT,
        ingredientName: ingName,
    };
};

const setIngredients = (ingredients) => { //SynchronousPart of initIngredients
    return {
        type: actionTypes.SETINGREDIENTS,
        ingredients: ingredients,
    };
};

const fetchedIngredientsFailed = () => { //sets error in BurgerBuilderReducer to true if data cant be fetched
    return {
        type: actionTypes.FETCHEDINGREDIENTSFAILED
    }
}

export const initIngredients = () => { //initializes Ingredients
    return dispatch => {
        axios.get('https://burgerbuilderrobv.firebaseio.com/ingredients.json')
            .then(response => {
               // console.log(response.data)
               dispatch(setIngredients(response.data));
            })
            .catch(error => { 
                dispatch(fetchedIngredientsFailed())
            });
    }
}