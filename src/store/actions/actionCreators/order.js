import * as actionTypes from '../actionTypes';
import axios from '../../../axioxInstances/axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
}

const purchaseBurgerFail = error => { //gets triggered when purchase is failing 
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
}

const purchaseBurgerStart = () => {//sets loading to true
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => { //sends the OrderRequest to firebase

    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData) //the .json is firebase Specific
            .then(response => {//when the request is send it will converted to alist item with a unique id
                let id = response.data.name;
                dispatch(purchaseBurgerSuccess(id, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error.response))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}


//ORDERS PAGE :

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders,
    };
}

const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error,
    };
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart()) //displays a Spinner as long as the asynchronous Command is loading
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; // makes sure that you can only see your own orders
        axios.get('/orders.json' + queryParams)
            .then(response => {
                //console.log(response.data) //the Ordes are initially send as an Object so we have to turn it into an array to display it
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key], //fetching the Object without the Key
                        id: key //adding the key to the id Value
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrderFail(error))
            })
    }
}
