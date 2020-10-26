import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

import Layout from '../components/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Logout from '../containers/Authentification/Logout/Logout';
import * as actions from '../store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('../containers/Authentification/auth');
});

class App extends Component {
  state = {}
  componentDidMount() {
    this.props.onAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
      </Switch>
      )
    }

    return (
      <Layout show={this.props.show} >
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {// is needed to guard the Routes
  return {
    isAuthenticated: state.auth.idToken !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckTokenValidation())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

