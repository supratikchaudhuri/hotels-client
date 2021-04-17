import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCardTitle, MDBCardText, MDBCol, MDBIcon } from 'mdbreact';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddItemCard = (props) => {
  const history = useHistory();
  
  const {product} = props;
  const [qty, setQty] = useState(1);

  const changeQty = (e) => {
    setQty(e.target.value);
    if(qty >= product.available) {
      alert("Required room are not available!");
      setQty(1);
    }
    else if(qty <= 0) {
      alert("Book atleast 1 room.");
      setQty(1);
      return;
    }
  }

  const addToBookings = () => {
    history.push(`/bookings/${product._id}?qty=${qty}`);
  }

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

            <MDBInput type="number" className="number-input" placeHolder="Rooms" value={qty} onChange={changeQty}/>

                <MDBBtn color="blue darken-1" onClick={addToBookings}>ADD ROOMS</MDBBtn>
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
