import axios from "axios"
import { CART_ADD_ITEM, REMOVE_CART_ITEM, SAVE_BILLING_DETAILS } from "../constants/cartConstants";

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            qty: qty,
            image: data.image,
            available: data.available,
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveBillingDetails = (data) => async(dispatch) => {
    console.log(data);
    dispatch({
        type: SAVE_BILLING_DETAILS,
        payload: data
    });
    localStorage.setItem('billingDetails', JSON.stringify(data));
}