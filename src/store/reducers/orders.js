import * as actions from '../actions/actionType';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actions.SAVE_ORDERS_START: {
            return {
                ...state,
                loading: true
            };
        }

        case actions.ORDER_PURCHASE_START: {
            return {
                ...state,
                purchased: false
            };
        }

        case actions.SAVE_ORDERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                purchased: true
            };
        }

        case actions.SAVE_ORDERS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        case actions.FETCH_ORDERS_START: {
            return {
                ...state,
                loading: true
            };
        }

        case actions.FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                orders: [...action.payload]
            };
        }

        case actions.FETCH_ORDERS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        default:
            return state;
    }
}

export default reducer;