import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import MessageBox from './MessageBox';


function OderItemsCard({cartItems}) {
    return (
        <>
        {
            cartItems.length === 0 ? 
                <MessageBox>
                    Cart is empty
                    <br></br>
                    <a href="/">Browse hotels</a>
                </MessageBox> 
            :
                <MDBCol style={{ width: "70vw" }}>
                <MDBCard>
                {
                    cartItems.map(item => (
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
        }
        </>
    )
}

export default OderItemsCard
