import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false, //is needed if the data cant be fetched properly
    building: false,
}

const INGREDIENT_PRICES = { //Names have to be identical with the ones in the ingredients object
    salad: 0.5,
    cheese: 0.7,
    bacon: 0.7,
    meat: 1.5,
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1, }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient) //is needed to get a deepClone of the ingredients
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient2 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1, }
    const updatedIngredients2 = updateObject(state.ingredients, updatedIngredient2) //is needed to get a deepClone of the ingredients
    const updatedState2 = {
        ingredients: updatedIngredients2,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    }
    return updateObject(state, updatedState2);
}

const setIngredients = (state, action) => {

    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4, //ensures that the price is reset whenever i reload the BurgerBuilderPage
        building: false, //ensures that building is reset
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDINGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVEINGREDIENT: //Note that the variables are named two because you cant declare const twice
            return removeIngredient(state, action);
        case actionTypes.SETINGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCHEDINGREDIENTSFAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
}

export default reducer;