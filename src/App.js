import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/Burgerbuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders'; 
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import logout from './containers/Auth/logout/logout';

class App extends Component {

  componentDidMount = () => {
    this.props.onAutoAuth();
  }

  render() {
    return (
      <Layout>
          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={logout} />
          </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoAuth: () => dispatch(actions.chekAuthState())
  }
}

export default connect(null, mapDispatchToProps)(App);
