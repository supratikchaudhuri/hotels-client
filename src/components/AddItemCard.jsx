import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';

const AddItemCard = ({product}) => {
  return (
      <MDBCol style={{ maxWidth: "30rem"}}>
      <MDBCard>
        <MDBCardBody className='elegant-color white-text rounded'>
        
            <MDBCardTitle>{product.price}</MDBCardTitle>
            <hr className='hr-light' />
            <MDBCardText className='white-text'>
              {product.address}
            </MDBCardText>
            <MDBCardText className='white-text'>
              This is the addressof the hotel, Pune, MAharashtra
            </MDBCardText>
            <div className="addItem-style">

            <MDBInput type="number" className="number-input" placeHolder="Rooms"/>

                <MDBBtn gradient=" purple">Book Now</MDBBtn>
                <a href='/' className='activator waves-effect waves-light mr-4'>
                <MDBIcon icon='share-alt' className='white-text' />
                </a>

            </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default AddItemCard;
