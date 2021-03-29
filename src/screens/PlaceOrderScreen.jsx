import React from 'react'
import { useSelector } from 'react-redux';
import BillingDetailsCard from '../components/BillingDetailsCard';
import CheckoutSteps from '../components/CheckoutSteps';
import OrderItemsCard from "../components/OderItemsCard"
import PaymentMethodCard from '../components/PaymentMethodCard';
import PlaceOrderCard from '../components/PlaceOrderCard';

const PlaceOrderScreen = (props) => {
    const cart = useSelector(state => state.cart);
    const { billingDetails } = cart;
    const {cartItems} = cart;
    const {paymentMethod} = cart;

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

            <div className="whole-page">
                <div className="left-flex">
                    <OrderItemsCard cartItems={cartItems}/>
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        {/* <OrderItemsCard cartItems={cartItems}/> */}
                        
                        <PaymentMethodCard paymentMethod={paymentMethod}/>
                        <BillingDetailsCard billingDetails={billingDetails}/>
                    </div>
                </div>

                <div className="right-flex">
                    <PlaceOrderCard/>
                </div>
            </div>
        </>
    )
}

export default PlaceOrderScreen
