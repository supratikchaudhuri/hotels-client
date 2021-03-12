import React, { useEffect, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';


function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
        if(error) {
            alert(error);
        }
    }, [userInfo, redirect, error, props.history])

    return (
        <>
        {loading ? <LoadingBox/> :
        <form  id="form" onSubmit={submitHandler}>
        <MDBContainer>
            <MDBRow>
                <MDBCol md="12">
                <MDBCard>
                    <MDBCardBody className="mx-4">
                    <div className="text-center">
                        <h3 className="dark-grey-text mb-5">
                        <strong>Sign in</strong>
                        </h3>
                    </div>
                    <MDBInput
                        label="email"
                        group autocomplete
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <MDBInput
                        label="password"
                        group 
                        type="password"
                        validate
                        containerClass="mb-0"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                        Forgot
                        <a href="#!" className="blue-text ml-1">

                        Password?
                        </a>
                    </p>
                    <div className="text-center mb-3">
                        <MDBBtn
                        type="submit"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        >
                        Sign in
                        </MDBBtn>
                    </div>
                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                        or Sign in with:
                    </p>
                    <div className="row my-3 d-flex justify-content-center">
                        <MDBBtn
                        type="button"
                        color="white"
                        rounded
                        className="mr-md-3 z-depth-1a"
                        >
                        <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
                        </MDBBtn>
                        <MDBBtn
                        type="button"
                        color="white"
                        rounded
                        className="mr-md-3 z-depth-1a"
                        >
                        <MDBIcon fab icon="twitter" className="blue-text" />
                        </MDBBtn>
                        <MDBBtn
                        type="button"
                        color="white"
                        rounded
                        className="z-depth-1a"
                        >
                        <MDBIcon fab icon="google-plus-g" className="blue-text" />
                        </MDBBtn>
                    </div>
                    </MDBCardBody>
                    <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                        Not a member?
                        <a href={`/register?redirect=${redirect}`} className="blue-text ml-1">
                            Sign Up
                        </a>
                    </p>
                    </MDBModalFooter>
                </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </form>}
        </>
    );
}

export default SigninScreen
