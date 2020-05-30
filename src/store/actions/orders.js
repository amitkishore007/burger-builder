import * as actions from './actionType';
import axios from '../../axios-orders';

export const fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('orders.json')
            .then((response) => {
                const { data } = response;
                const orders = [];
                Object.keys(data).forEach((id) => {
                    orders.push({
                        ...data[id],
                        id: id
                    });
                });

                dispatch(fetchOrdersSuccess(orders));
            })
            .catch((error) => {
                dispatch(fetchOrdersFailed(error.toString()));
            })
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actions.FETCH_ORDERS_START
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actions.FETCH_ORDERS_FAILED,
        payload: error
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actions.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}

export const saveOrder = (orderData) => {
    return (dispatch) => {
        dispatch(saveOrderStart());
        axios.post('orders.json', orderData)
            .then((response) => {
                dispatch(saveOrderSuccess());
            })
            .catch((error) => {
                dispatch(saveOrderFailed(error.toString()));
            });
    }
}

export const saveOrderStart = () => {
    return {
        type: actions.SAVE_ORDERS_START
    }
}

export const saveOrderSuccess = () => {
    return {
        type: actions.SAVE_ORDERS_SUCCESS
    }
}

export const saveOrderFailed = (error) => {
    return {
        type: actions.SAVE_ORDERS_FAILED,
        payload: error
    }
}

export const orderPurchaseStart = () => {
    return {
        type: actions.ORDER_PURCHASE_START
    }
}
