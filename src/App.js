import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/Burgerbuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders'; 

class App extends Component {
  render() {
    return (
      <Layout>
          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
      </Layout>
    );
  }
}

export default App;
