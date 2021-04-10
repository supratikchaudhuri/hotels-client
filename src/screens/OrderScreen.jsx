import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import BillingDetailsCard from '../components/BillingDetailsCard';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = (props) => {

    const dispatch = useDispatch()
    // const {orderId} = useParams();
    const orderId = props.match.params.id;
    console.log(orderId);
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;

    const [sdkReady, setSdkReady] = useState(false)
    const orderPay= useSelector((state) => state.orderPay);
    const {error: errorPay, loading: loadingPay, success: successPay} = orderPay;

    // console.log(order);
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
              setSdkReady(true);
            };
            document.body.appendChild(script);
        }
    
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch(detailsOrder(orderId));
        } 
        else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch({type: ORDER_PAY_RESET});
        dispatch(payOrder(order, paymentResult));
    };

    return (
        <>
        {
            loading ? <LoadingBox></LoadingBox> :
            error ? <MessageBox>{error}</MessageBox> :
            <>
            <div className="whole-page" style={{ overflowX: "hidden" }}>
                <div className="left-flex">
                    <MDBCol style={{ width: "70vw" }}>
                    <MDBCard>
                    {
                        order.orderItems.map(item => (
                            <div className="order-items-card" key={item.product}>
                                <MDBCardImage className="img-fluid" style={{maxWidth: '200px'}} src={item.image}
                                waves />
                                <MDBCardBody>
                                    <MDBCardTitle>Card title</MDBCardTitle>
                                    <MDBCardText>{item.name}</MDBCardText>
                                    <MDBCardText>{item.description}</MDBCardText>
                                    <MDBCardText>{item.qty}</MDBCardText>
                                </MDBCardBody>
                            </div>
                        ))
                    }
                    </MDBCard>
                    </MDBCol>

                    <div style={{display: 'flex', marginTop: '20px'}}>
                        <MDBCol style={{ maxWidth: "26rem" }}>
                        <MDBCard>
                        {
                            <MDBCardBody>
                            <MDBCardTitle>Booking Status</MDBCardTitle>
                                
                            {order.isPaid ? 
                                <>   
                                <MDBCardText style={{color: 'green'}}>Booking paid</MDBCardText> 
                                <MDBCardText><strong>Paid at:</strong> 312312</MDBCardText>
                                <MDBCardText><strong>Pament method:</strong> 12312</MDBCardText>
                                </>
                                :
                                <MDBCardText style={{color: 'red'}}>Booking payment is due</MDBCardText>
                            }
                            </MDBCardBody>
                        }
                        </MDBCard>
                        </MDBCol>

                        <BillingDetailsCard billingDetails={order.billingDetails}/>
                    </div>
                </div>

                <div className="right-flex">
                <MDBRow>
                <MDBCol style={{width: '30vw'}}>
                    <MDBCard>
                    <MDBCardBody className='elegant-color white-text rounded-bottom'>
                        <MDBCardTitle>Order Summary</MDBCardTitle>
                        <hr className='hr-light' />
                        <MDBCardText className='white-text'>
                            <strong>Amount:</strong> {order.itemsPrice}
                        </MDBCardText>
                        <MDBCardText className='white-text'>
                            <strong>Convinence Fee (1%)</strong>: {order.convineincePrice}
                        </MDBCardText>
                        <MDBCardText className='white-text'>
                        <strong> Tax(6%)</strong>: {order.taxPrice}
                        </MDBCardText>
                        <MDBCardText className='white-text'>
                            <strong>Total</strong>: {order.totalPrice}
                        </MDBCardText>
                        
                        {/* <MDBBtn color="yellow accent-3" onClick={successPaymentHnadler}> Proceed To Checkout </MDBBtn> */}
                        {
                            !order.isPaid && (
                                <div className="payment-button">
                                    {errorPay && <MessageBox>{errorPay}</MessageBox>}

                                    {loadingPay && <LoadingBox></LoadingBox>}

                                    {!sdkReady ? <LoadingBox></LoadingBox> :
                                    <PayPalButton amount ={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>}
                                </div>
                            )
                        }
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
                </div>
            </div>
            </>
        }
        </>
    )
}

export default OrderScreen
        