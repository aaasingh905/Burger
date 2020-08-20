import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../withErrorHandler/withErrorhandler';
import classes from './Order.css'
import * as actions from '../../Store/Actions/Order'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
   }
   
 
    render () {
     
        let orders = <Spinner />;
        if( !this.props.loading ) {
            orders= 
                this.props.orders.map(order =>(
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    userDetails={order.orderData}
                    price={order.price}
                   clicked={() => this.props.onDeleteOrders(order.id,this.props.token,this.props.userId)}
                    />
                ))
            
            }
            let price=<div className={classes.Empty}>Your cart is empty !! Start Ordering :) {this.props.totalPrice}</div> 
        if(this.props.totalPrice!==null)   {
            price = <div className={classes.PriceDiv}>Total Price: Rs {this.props.totalPrice}</div> 
        } 
         
        return  (
        <div className={classes.Orders}> 
        {orders}
        {price}   
        </div>
        );
        
    
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        totalPrice: state.order.totalPrice
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId)),
        onDeleteOrders: (id,token,userId) => dispatch(actions.deleteOrders(id,token,userId))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));