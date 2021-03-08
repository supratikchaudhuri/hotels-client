import axios from "axios"
import { CART_ADD_ITEM, REMOVE_CART_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/product/${id}`)
    console.log(data);

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