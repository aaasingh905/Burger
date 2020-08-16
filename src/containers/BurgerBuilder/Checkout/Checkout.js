import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
//import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Actions/Order'

class Checkout extends Component {

    componentWillMount() {
        this.props.onInitPurchase();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchsedRedirect = this.props.purchased ? <Redirect to="/" /> : null
           summary = (
           <div>
               {purchsedRedirect}
           <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            <Route 
                 path={this.props.match.path + '/contact-data'} 
                 component={ContactData} />
            
            </div>
           );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);