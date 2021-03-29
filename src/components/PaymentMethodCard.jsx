import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const PaymentMethodCard = ({paymentMethod}) => {
    return (
        <MDBCol style={{ maxWidth: "26rem" }}>
        <MDBCard>
            <MDBCardBody>
            <MDBCardTitle>Payment Method</MDBCardTitle>
            <MDBCardText>{paymentMethod}</MDBCardText>
            </MDBCardBody>
        </MDBCard>
        </MDBCol>
    )
}

export default PaymentMethodCard
