import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers.js";
import { myOrderListReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./reducers/orderReducer.js";
import { productDetailsReducer, productListReducer, productsBySellerDetailsReducer } from "./reducers/productReducers.js";
import { updateProfileReducer, userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdatePrivilageReducer } from "./reducers/userReducers.js";

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        billingDetails: localStorage.getItem('billingDetails') ? JSON.parse(localStorage.getItem('billingDetails')) : {},
        paymentMethod: 'PayPal'
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productsBySellerDetails: productsBySellerDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    userDetails: userDetailsReducer,
    updateProfile: updateProfileReducer,
    userUpdatePrivilage: userUpdatePrivilageReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
