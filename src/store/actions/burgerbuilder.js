import * as actions from './actionType';
import axios from '../../axios-orders';

export const addIngredient = (value) => {
    return {
        type: actions.ADD_INGREDIENT,
        payload: value
    }
}

export const removeIngredient = (value) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        payload: value
    }
}

export const fetchIngredientsStart = () => {
    return {
        type: actions.FETCH_INGREDIENTS_START
    }
}

export const fetchIngredients = () => {
    return (dispatch) => {
        dispatch(fetchIngredientsStart());
        axios.get('ingredients.json')
            .then((response) => {
                if(response) {
                    dispatch(fetchIngredientsSuccess(response.data));
                }
            })
            .catch((error) => {
                dispatch(fetchIngredientsFailed(error.toString()));
            });
    }
}

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actions.FETCH_INGREDIENTS_SUCCESS,
        payload: ingredients
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actions.FETCH_INGREDIENTS_FAILED,
        payload: error
    }
}