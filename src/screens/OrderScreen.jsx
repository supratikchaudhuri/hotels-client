import React, { useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBBtn } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CheckoutSteps from '../components/CheckoutSteps';
import BillingDetailsCard from '../components/BillingDetailsCard';

const OrderScreen = (props) => {

    const dispatch = useDispatch()
    const {id} = useParams();
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;
    console.log(order);
    useEffect(() => {
        dispatch(detailsOrder(id));
    }, [dispatch, id])

    return (
        <>
        {
        loading ? <LoadingBox></LoadingBox> :
        error ? <MessageBox>{error}</MessageBox> :
            <>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

            <div className="whole-page">
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
                                
                            {!order.isPaid ? 
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
                        
                        <MDBBtn color="yellow accent-3" >Proceed To Checkout</MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
                </div>
            </div>
            </>
        }
        </>

        // <>
        // {
        //     loading ? <LoadingBox></LoadingBox> :
        //     error ? <MessageBox>{error}</MessageBox> :
        //     <>
        //     <MDBCol style={{ width: "70vw", marginTop: '20px' }}>
        //         <MDBCard>
        //         {
        //             order.orderItems.map(item => (
        //                 <div className="order-items-card" key={item.product}>
        //                     <MDBCardImage className="img-fluid" style={{maxWidth: '200px'}} src={item.image}
        //                     waves />
        //                     <MDBCardBody>
        //                         <MDBCardTitle>Card title</MDBCardTitle>
        //                         <MDBCardText>{item.name}</MDBCardText>
        //                         <MDBCardText>{item.description}</MDBCardText>
        //                         <MDBCardText>{item.qty}</MDBCardText>
        //                     </MDBCardBody>
        //                 </div>
        //             ))
        //         }
        //         </MDBCard>
        //     </MDBCol>
        //     <MDBCol style={{ width: "70vw", marginTop: '20px' }}>
        //         <MDBCard>
        //         {
        //             <MDBCardBody>
        //                 <MDBCardTitle>Booking Status</MDBCardTitle>
                         
        //                 {order.isPaid ? 
        //                     <>   
        //                     <MDBCardText style={{color: 'green'}}>Booking paid</MDBCardText> 
        //                     <MDBCardText><strong>Paid at:</strong> 312312</MDBCardText>
        //                     <MDBCardText><strong>Pament method:</strong> 12312</MDBCardText>
        //                     </>
        //                     :
        //                     <MDBCardText style={{color: 'red'}}>Booking payment is due</MDBCardText>
        //                 }
        //             </MDBCardBody>
        //         }
        //         </MDBCard>
        //     </MDBCol>
        //     </>
        // }
        // </>
    )
}

export default OrderScreen
        