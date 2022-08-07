import React, { useState, useEffect } from 'react'
import { MDBBtn } from "mdbreact";
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import EditUserCard from "../components/EditUserCard"
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import {listUsers, deleteUser} from '../actions/userActions'

function UserListScreen() {
    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList

    const userDelete = useSelector(state => state.userDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch, successDelete])

    const deleteHandler = (user) => {
        if(window.confirm("Are you sure?")) {
            dispatch(deleteUser(user._id));
        }
    }

    const [userToEdit, setUserToEdit] = useState({})
    const [editUserCardStyle, setEditUserCardStyle] = useState("none")
    const handleUserEdit = (user) => {
        setUserToEdit(user)
        setEditUserCardStyle("block");
    }

  return (
    <div>
        <h1>Users</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="error">{errorDelete}</MessageBox>}
        {successDelete && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
        
        {
            loading ? (<LoadingBox></LoadingBox>) : 
            error ? (<MessageBox variant="error">{error}</MessageBox>) :
            (
                <MDBTable>
                <MDBTableHead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Is Seller</th>
                    <th>Is Admin</th>
                    <th>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users.map((user) => (
                        <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isSeller ? `Yes`: `No`}</td>
                        <td>{user.isAdmin ? `Yes` : `No`}</td>
                        <td>
                        <MDBBtn tag="a" size="md" color="primary" outline style={{"margin-right": "20px"}} onClick={() => handleUserEdit(user)}>
                            <i class="fas fa-pen"></i>
                        </MDBBtn>
                        <MDBBtn tag="a" size="md" color="primary" outline onClick={() => deleteHandler(user)}>
                            <i class="fas fa-trash"></i>
                        </MDBBtn>
                        </td>
                        </tr>
                    ))}
                </MDBTableBody>
                <EditUserCard 
                    style={{"display": editUserCardStyle}}
                    user={userToEdit}>
                </EditUserCard>  
                </MDBTable>
            )
        }
        
    </div>
  )
}

export default UserListScreen