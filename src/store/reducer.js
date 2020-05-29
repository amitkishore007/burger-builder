import * as actionType from './actions';

const PRICES = {
    meat: 0.2, 
    salad: 0.25,
    bacon: 1.2,
    cheese: 0.5
};

const initialState = {
    ingredients: {
        meat: 0, 
        salad: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: {
                let ingredients = {...state.ingredients};
                ingredients[action.payload] += 1;
                const updatedPrice = PRICES[action.payload] + state.totalPrice;

                return {
                    ...state,
                    ingredients: ingredients,
                    totalPrice: updatedPrice
                }
        }
        case actionType.REMOVE_INGREDIENT: {
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

        default:
            return state;
    }
};

export default reducer;