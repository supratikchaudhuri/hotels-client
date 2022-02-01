import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


function RegisterScreen(props) {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        if(password === confirmPassword)
            dispatch(register(name, email, password));
        else
            alert("Confirm Password didn't match Password")
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
        // if(error)
        //     alert(error);
    }, [userInfo, redirect, error, props.history])

    return (
        <>
        {loading ? <LoadingBox/> :
        <>
        {error && <MessageBox variant="error">{error}</MessageBox>}
        <form  id="form" onSubmit={submitHandler}>
        <MDBContainer>
            <MDBRow>
                <MDBCol md="12">
                <MDBCard>
                    <MDBCardBody className="mx-4">
                    <div className="text-center">
                        <h3 className="dark-grey-text mb-5">
                        <strong>Create Account</strong>
                        </h3>
                    </div>
                    <MDBInput
                        label="name"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={e => setName(e.target.value)}
                    />
                    <MDBInput
                        label="email"
                        group autoComplete
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
                    <MDBInput
                        label="Confirm password"
                        group 
                        type="password"
                        validate
                        containerClass="mb-0"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <div className="text-center mb-3">
                        <MDBBtn
                        type="submit"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                        >
                        Sign up
                        </MDBBtn>
                    </div>
                    </MDBCardBody>
                    <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                        Already have an account ?
                        <a href={`/signin?redirect=${redirect}`} className="blue-text ml-1">

                        Sign in
                        </a>
                    </p>
                    </MDBModalFooter> 
                </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </form>
        </>
        }
        </>
    )
}

export default RegisterScreen
