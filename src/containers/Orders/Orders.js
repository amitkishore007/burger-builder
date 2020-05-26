import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axiosInstance from '../../axios-orders';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        axiosInstance.get('orders.json')
            .then((response) => {
                const { data } = response;

                const orders = [];

                Object.keys(data).forEach((id) => {
                    orders.push({
                        ...data[id],
                        id: id
                    })
                })

                this.setState({ loading: false, orders: orders });                
            })
            .catch((error) => {
                this.setState({ loading: false });
            })
    }

    render() {
         let orders = this.state.orders.map((order) => {
            return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        })

        return (
            <div>
                { this.state.loading ? <Spinner /> : orders }
            </div>
        )
    }
}


export default withErrorhandler(Orders, axiosInstance);