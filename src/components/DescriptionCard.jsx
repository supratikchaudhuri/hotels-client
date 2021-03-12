import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const DescriptionCard = ({product}) => {
  return (
    <MDBCol style={{ maxWidth: "30rem"}}>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{product.name}</MDBCardTitle>
          <MDBCardText>Category: {product.category}</MDBCardText>
          <MDBCardText>Description: {product.description}</MDBCardText>
          <MDBCardText>Beds: </MDBCardText>
          {product.available > 0 ? 
            <MDBCardText className="success">{`${product.available} Rooms Available`}</MDBCardText> : 
            <MDBCardText  className="failure">{`Currently Unavailable`}</MDBCardText>}
          <MDBCardText>Rating: {product.rating}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default DescriptionCard;