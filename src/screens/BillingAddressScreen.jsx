import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { saveBillingDetails } from '../actions/cartActions';

function BillingAddress(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { billingDetails } = cart;

    if (!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(billingDetails.fullName)
    const [address, setAddress] = useState(billingDetails.address);
    const [requirements, setRequirements] = useState(billingDetails.requirements);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveBillingDetails({
            fullName, address, requirements
        }));
        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <MDBContainer>
                <MDBRow>
                <MDBCol md="12" style={{maxWidth: '50rem', margin: 'auto'}}>
                <form onSubmit={submitHandler}>
                    <p className="h4 text-center mb-4">Billing Details</p>
                    <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
                        Full Name
                    </label>
                    <input type="text" id="defaultFormContactNameEx" className="form-control" htmlFor='fullName' value={fullName} onChange={e => setFullName(e.target.value)}/>
                    <br />
                    <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
                        Billing Address
                    </label>
                    <input type="text" id="defaultFormAddressEx" className="form-control" htmlFor='address' value={address} onChange={e => setAddress(e.target.value)}/>
                    <br />
                    
                    <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                        Special Requirements (Optional)
                    </label>
                    <textarea type="text" id="defaultFormContactMessageEx" className="form-control" htmlFor='requirements' rows="3" value={requirements} onChange={e => setRequirements(e.target.value)}/>
                    <div className="text-center mt-4">
                        <MDBBtn color="primary" outline type="submit">
                            Proceed to Payment
                        </MDBBtn>
                    </div>
                </form>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
    )
}

export default BillingAddress
