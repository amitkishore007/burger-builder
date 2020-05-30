import * as actions from '../actions/actionType';
const PRICES = {
    meat: 0.2, 
    salad: 0.25,
    bacon: 1.2,
    cheese: 0.5
};

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT: {
                let ingredients = {...state.ingredients};
                ingredients[action.payload] += 1;
                const updatedPrice = PRICES[action.payload] + state.totalPrice;

                return {
                    ...state,
                    ingredients: ingredients,
                    totalPrice: updatedPrice
                }
        }
        case actions.REMOVE_INGREDIENT: {
                let ingredients = {...state.ingredients};
                if(ingredients[action.payload]) {
                    ingredients[action.payload] -= 1;
                }
                const updatedPrice = state.totalPrice - PRICES[action.payload];
                
                return {
                    ...state,
                    ingredients: ingredients,
                    totalPrice: updatedPrice
                }
        }

        case actions.FETCH_INGREDIENTS_START: {
            return {
                ...state,
                loading: true
            }
        }

        case actions.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        }

        case actions.FETCH_INGREDIENTS_SUCCESS:{
            return {
                ...state,
                loading: false,
                error: null,
                ingredients: {...action.payload}
            }
        }

        default:
            return state;
    }
};

export default reducer;