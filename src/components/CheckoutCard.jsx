import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';

const CheckoutCard = (props) => {
    const {cartItems} = props

  return (
    <MDBCol className='CheckoutCard'>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle> 
            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </MDBCardTitle>

          <Link to={`/signin?redirect=/shipping`}>
            <MDBBtn gradient=" purple" disabled={cartItems.length === 0}>Proceed To Checkout</MDBBtn>
          </Link>

        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CheckoutCard;