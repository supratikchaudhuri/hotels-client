import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const BillingDetailsCard = ({billingDetails}) => {
    return (
        <MDBCol style={{ maxWidth: "26rem" }}>
        <MDBCard>
            <MDBCardBody>
            <MDBCardTitle>Billing Details</MDBCardTitle>
            <MDBCardText><strong>Address: </strong>{billingDetails.address}.</MDBCardText>
            </MDBCardBody>
        </MDBCard>
        </MDBCol>
    )
}

export default BillingDetailsCard
