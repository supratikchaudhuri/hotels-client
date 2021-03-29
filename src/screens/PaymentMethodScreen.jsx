import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';
import { RadioGroup, FormControlLabel, Radio   } from '@material-ui/core';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentMethodScreen = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {billingDetails} = cart;

  if (!billingDetails.address) {
    props.history.push('/shipping');
  }
  
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  }

  return (
    <>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
    <form onSubmit={submitHandler}>
    <MDBCol style={{ maxWidth: "27rem", margin: 'auto' }} className="center-div">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Choose Payment Method</MDBCardTitle>


          <RadioGroup aria-label="gender" name="gender1" onChange={e => setPaymentMethod(e.target.value)}>
            <FormControlLabel value="PayPal" control={<Radio primary/>} label="PayPal" checked={paymentMethod === 'PayPal' ? true : false}/>
            <FormControlLabel value="Google Pay" control={<Radio />} label="Google Pay" />
            <FormControlLabel value="Credit/Debit Cards" control={<Radio />} label="Credit/Debit Cards" />
          </RadioGroup>


          <MDBBtn gradient="blue" type="submit">Proceed</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </form>
    </>
  )
}

export default PaymentMethodScreen;