import React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './components/Layout/Layout'
import Checkout from './containers/BurgerBuilder/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import { connect } from 'react-redux'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './Store/Actions/auth'

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={ Auth } />
          <Route path="/" exact component={ BurgerBuilder} />
          <Redirect to="/" />
          </Switch>
               )
        if (this.props.isAuthenticated) {
          routes = (
            <Switch>
             
            <Route path="/checkout" component ={Checkout} />
            <Route path="/orders" component ={Orders} />
            <Route path="/logout" exact component={ Logout } />
            <Route path="/auth" exact component={ Auth } />
            <Route path="/" exact component={ BurgerBuilder} />
            <Redirect to="/" />
            </Switch>

          )
        }

    return (
      <div >
        <Layout>
         {routes}
        </Layout>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
