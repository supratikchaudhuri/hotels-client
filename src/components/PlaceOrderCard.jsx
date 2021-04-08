import React, { useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const PlaceOrderCard = (props) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    
    const amount = cart.cartItems.reduce((a,c) => a + c.qty*c.price, 0);
    const convineince_charge = (0.01 * amount);
    const tax = (0.06 * amount);
    const total = amount+convineince_charge+tax;

    //no error if skipped these3 lines
    cart.itemsPrice = amount;
    cart.taxPrice = tax;
    cart.convineincePrice = convineince_charge;
    cart.totalPrice = total;

    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }

    useEffect(() => {
        if(success) {
            // props.history.push(`/order/${order._id}`);
            history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, success, order, history])

    return (
        <>
        <MDBRow>
        <MDBCol style={{width: '30vw'}}>
            <MDBCard>
            <MDBCardBody className='elegant-color white-text rounded-bottom'>
                <MDBCardTitle>Order Summary</MDBCardTitle>
                <hr className='hr-light' />
                <MDBCardText className='white-text'>
                    <strong>Amount:</strong> {amount}
                </MDBCardText>
                <MDBCardText className='white-text'>
                    <strong>Convinence Fee (1%)</strong>: {convineince_charge}
                </MDBCardText>
                <MDBCardText className='white-text'>
                   <strong> Tax(6%)</strong>: {tax}
                </MDBCardText>
                <MDBCardText className='white-text'>
                    <strong>Total</strong>: {(amount+convineince_charge+tax)}
                </MDBCardText>
                
                <MDBBtn gradient=" blue" onClick={placeOrderHandler}>Proceed To Checkout</MDBBtn>
            </MDBCardBody>
            </MDBCard>
        </MDBCol>
        </MDBRow>

        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox>{error}</MessageBox>}
        </>
    )
}

export default PlaceOrderCard
