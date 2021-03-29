import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"

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
            payload: error
                // error.response && error.response.data.message
                // ? error.response.data.message
                // : error.message,
        });
    }
}