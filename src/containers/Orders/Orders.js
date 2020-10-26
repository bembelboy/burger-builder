import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './Order';
import axios from '../../axioxInstances/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() { //needed to fetch the Order Data from the server 
        return this.props.onFetchOrders(this.props.token, this.props.userId) //is also possible with getState in the order.js ActionCreator
    }
    render() {

        let orders = (
        <div>
            {this.props.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} //the + sign secures that the price is passed as number and not as a string
                    />)
            })}
        </div>
        )

        if (this.props.loading) {
            orders = <Spinner />
        }

        return (
            orders
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.idToken,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); //exported in App.js