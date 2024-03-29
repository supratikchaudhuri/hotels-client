import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { MY_ORDER_LIST_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async(dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      // console.log(order);
      const { data } = await axios.post('/api/orders', order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
        // console.log(data);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    }
    catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const detailsOrder = (orderId) => async(dispatch, getState) => {
  dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const {data} = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(data);
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
  }
  catch(err) {
    dispatch({type: ORDER_DETAILS_FAIL, payload: err})
  }
}

export const payOrder = (order, paymentResult) => async(dispatch, getState) => {
  dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}});

  const {userSignin: {userInfo}} = getState();

  try {
    const {data} = axios.put(`/api/orders/${order._id}`, paymentResult, {
      headers: {Authorization: `Bearer ${userInfo.token}`},
    });
    dispatch({type: ORDER_PAY_SUCCESS, payload: data})
  }
  catch(error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
}

export const myOrderListAction = () => async(dispatch, getState) => {
  dispatch({type: MY_ORDER_LIST_REQUEST});

  const {userSignin: {userInfo}} = getState();
  
  try {
    const {data} = await axios.get('/api/orders/my-orders', {
      headers: {Authorization: `Bearer ${userInfo.token}`},
    });
    dispatch({type: MY_ORDER_LIST_SUCCESS, payload: data})
  }
  catch(error) {
    dispatch({
      type: MY_ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    });
  }
}