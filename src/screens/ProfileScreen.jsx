import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactCardFlip from 'react-card-flip';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { getUserDetails, updateProfileAction } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails =  useSelector(state => state.userDetails);
    const {user, loading, error} = userDetails;

    const updateProfile = useSelector(state => state.updateProfile);
    const {
        success: successUpdate, 
        loading: loadingUpdate, 
        error: errorUpdate
    } = updateProfile;

    useEffect(() => {
        if(!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(getUserDetails(userInfo._id));
        }
        else {
            setName(user.name);
        }
    }, [userInfo._id, user, dispatch])

   
    const [isFlipped, setIsFlipped] = useState(false);
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
      
    const flip = () => {
        setIsFlipped(!isFlipped);
    };

    const submitHandler = (e) => {
        if(password !== confirmPassword) {
            alert("Password and confirm password are not matching")
        }
        else {
            dispatch(updateProfileAction({
                _id: user._id, 
                name, 
                password
            }));
            setIsFlipped(!isFlipped);
        }
    }

    return (
        
        loading ? <LoadingBox/> :
        error ? <MessageBox>{error}</MessageBox>
        :
        <>
        { loadingUpdate && <LoadingBox/> }
        { errorUpdate && <MessageBox>{errorUpdate}</MessageBox> }
        { successUpdate && <MessageBox>{"Profile Updated Successfully!"}</MessageBox>}

        <ReactCardFlip  className="flip-card" isFlipped={isFlipped} flipDirection="vertical">
        <div className="profile card-front">
            <MDBCol style={{ maxWidth: "26rem" }}>
            <MDBCard>
                <MDBCardBody>
                <MDBCardTitle>Name: </MDBCardTitle>
                <MDBCardText>{ user.name }</MDBCardText>
                <MDBCardTitle>Email: </MDBCardTitle>
                <MDBCardText>{ user.email }</MDBCardText>

                <button onClick={flip}><EditIcon/></button>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </div>

        <div className="profile card-back">
        <MDBCol style={{ maxWidth: "26rem", marginBottom: '100px' }}>
            <MDBCard>
                <MDBCardBody>
                <button style={{marginRight: '20px !important'}} onClick={flip}><ArrowBackIosIcon/></button>
                <MDBInput
                        label="Name"
                        value={name}
                        group 
                        validate
                        containerClass="mb-0"
                        onChange={e => setName(e.target.value)}
                />
                
                <MDBInput
                        label="Change Password"
                        group 
                        type="password"
                        validate
                        containerClass="mb-0"
                        onChange={e => setPassword(e.target.value)}
                />
                <MDBInput
                        label="Confirm Password"
                        group 
                        type="password"
                        validate
                        containerClass="mb-0"
                        onChange={e => setConfirmPassword(e.target.value)}
                />
                <div>
                    <MDBBtn onClick={submitHandler}>Submit</MDBBtn>
                </div>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
        </div>
        </ReactCardFlip>
        </>
    )
}

export default ProfileScreen
