export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';


export const addIngredient = (value) => {
    return {
        type: ADD_INGREDIENT,
        payload: value
    }
}

export const removeIngredient = (value) => {
    return {
        type: REMOVE_INGREDIENT,
        payload: value
    }
}