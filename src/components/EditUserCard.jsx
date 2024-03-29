import React, { useState } from 'react';
import { MDBJumbotron, MDBContainer, MDBInput, MDBFormInline, MDBBtn } from "mdbreact";
import { useDispatch } from 'react-redux';
import {updateUserPrivilages} from '../actions/userActions'
import { useEffect } from 'react';

function EditUser({user, style}) {
  const dispatch = useDispatch();
  
  const [isSeller, setIsSeller] = useState(user.isSeller);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateUserPrivilages({_id: user._id, isSeller, isAdmin}))
  }

  useEffect(() => {
    setIsSeller(user.isSeller)
    setIsAdmin(user.isAdmin)
  }, [user])

  return (
    <div className='edit-user-card' style={style}>

    <MDBJumbotron fluid>
    <MDBContainer>
        <h2 className="lead"><b>Name: </b>{user.name}</h2>
        <p className="lead"><b>Email: </b>{user.email}</p>
        <div className='edit-User-div'>
          <p className="lead" style={{"margin-right" : "10px"}}>Grant Seller Privilages?</p>
          <MDBFormInline>
            <MDBInput
              onClick={() => {setIsSeller(true)}}
              checked={isSeller}
              label='Yes'
              type='radio'
              id='radio-yes'
              containerClass='mr-5'
            />
            <MDBInput
              onClick={() => {setIsSeller(false)}}
              checked={!isSeller}
              label='No'
              type='radio'
              id='radio-no'
              containerClass='mr-5'
            />
          </MDBFormInline>
        </div>

        <div className='edit-User-div'>
          <p className="lead">Grant Admin Privilages?</p>
          <MDBFormInline>
            <MDBInput
              onClick={() => {setIsAdmin(true)}}
              checked={isAdmin}
              label='Yes'
              type='radio'
              id='radio-yes'
              containerClass='mr-5'
            />
            <MDBInput
              onClick={() => {setIsAdmin(false)}}
              checked={!isAdmin}
              label='No'
              type='radio'
              id='radio-no'
              containerClass='mr-5'
            />
          </MDBFormInline>
        </div>
    </MDBContainer>
    <div className = "btn-div-edit-user">
      <MDBBtn color="success" style={{"margin-right": "20px"}} onClick={handleEdit}>Submit</MDBBtn>
      <MDBBtn color="danger">Cancle</MDBBtn>
    </div>
    </MDBJumbotron>
    </div>
  )
}

export default EditUser