import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    
    render() {
        let items = Object.keys(this.props.ingredients).filter((key) => this.props.ingredients[key] > 0).map((key, index) => {
            return <li key={key+''+index}>{key}: {this.props.ingredients[key]}</li>;
        });
        
        return (
            <div>
                <p>Ingredients</p>
                <ul>
                    {items}
                </ul>
    
                <p>Total Price: ${this.props.price.toFixed(2)}</p>
                <Button type="Danger" clicked={this.props.close}>Cancel</Button>
                <Button type="Success" clicked={this.props.purchase}>Continue</Button>
            </div>
        )
    }
}

export default OrderSummary;