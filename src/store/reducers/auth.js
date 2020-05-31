import * as actions from '../../store/actions/actionType';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    expiresIn: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:{
            return {
                ...state,
                loading: true
            }
        }
        
        case actions.AUTH_SUCCESSS: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null
            }
        }
        
        case actions.AUTH_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case actions.LOGOUT: {
            return {
                ...state,
                loading: false,
                error: null,
                token: null,
                expiresIn: null,
                userId: null
            }
        }

        default:
            return state;
    }
}

export default reducer;