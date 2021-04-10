import React, { useState } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBDropdown } from "mdbreact";
import {Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';

function Navbar(props) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = (prev) => {
        setIsOpen(!isOpen)
    }

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const signoutHandler = () => {
        dispatch(signout());
    };
    

    return (
        <MDBNavbar color="deep-purple accent-4" dark expand="md">
          <MDBNavbarBrand>
            <Link to={'/'}><strong className="white-text">Navbar</strong></Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="#!">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">Features</MDBNavLink>
              </MDBNavItem>
              
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="/bookings">
                  Bookings
                    {cartItems.length > 0 && 
                    <span id='badge'>{cartItems.length}</span>} 
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
              {
                userInfo ? (
                <>
                <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">{userInfo.name}</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/order-history">Order History</MDBDropdownItem>
                  <MDBDropdownItem onClick={signoutHandler} href="/">Sign out</MDBDropdownItem>
                </MDBDropdownMenu>
                </MDBDropdown>
                </>
                ) : (
                <MDBNavLink to="/signin">
                  Sign in
                </MDBNavLink>
                )
              }
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
    )
}

export default Navbar
