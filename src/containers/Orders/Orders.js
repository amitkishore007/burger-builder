import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axiosInstance from '../../axios-orders';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

class Orders extends Component {

    state = {
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
         let orders = this.props.orders.map((order) => {
            return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        });

        if(orders.length === 0) {
            orders = <p style={{textAlign:'center'}}>No Record Found!</p>;
        }

        return (
            <div>
                { this.props.loading ? <Spinner /> : orders }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.orders.loading,
        error: state.orders.error,
        orders: state.orders.orders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axiosInstance));