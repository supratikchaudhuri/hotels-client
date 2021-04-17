import { CART_ADD_ITEM, CART_EMPTY, CART_SAVE_PAYMENT_METHOD, REMOVE_CART_ITEM, SAVE_BILLING_DETAILS } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM: 
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);

            //modify the existing item
            if(existItem) {
                return {
                    ...state,
                    cartItems : state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }
            //add new item
            else {
                return {
                    ...state, 
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_CART_ITEM:
            return {...state, cartItems: state.cartItems.filter(item => item.product !== action.payload)}   
            
        case SAVE_BILLING_DETAILS:
            return {
                ...state,
                billingDetails: action.payload
            }
        
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMehtod: action.data
            }

        case CART_EMPTY:
            return {
                ...state, 
                cartItems: []
            }

        default:
            return state;
    }
}