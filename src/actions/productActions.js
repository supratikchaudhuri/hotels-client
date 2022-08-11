import axios from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCTS_BY_SELLER_DETAILS_REQUEST, PRODUCTS_BY_SELLER_DETAILS_FAIL, PRODUCTS_BY_SELLER_DETAILS_SUCCESS } from "../constants/productConstants";

export const listProducts = () => async(dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const {data} = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }
    catch(err) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.message})
    }
}


export const detailsProduct = (productID) => async(dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST});

    try {
        const {data} = await axios.get(`/api/products/${productID}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    }
    catch(err) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message})
    }
}

export const fetch_product_by_seller_list = (userId) => async(dispatch) => {
    dispatch({type: PRODUCTS_BY_SELLER_DETAILS_REQUEST});

    try{
        const {data} = await axios.get(`/api/products/seller-listings/${userId}`)
        console.log(data);
        dispatch({type: PRODUCTS_BY_SELLER_DETAILS_SUCCESS, payload: data});
    } catch(err) {
        dispatch({type: PRODUCTS_BY_SELLER_DETAILS_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message})
    }
}