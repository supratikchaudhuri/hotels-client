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
        <MDBNavbar color="blue" dark expand="md">
          <MDBNavbarBrand>
            <Link to={'/'}><strong className="white-text">Innkeeper</strong></Link>
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
                {userInfo && userInfo.isAdmin && (
                <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Admin View</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/dasboard">Dashboard</MDBDropdownItem>
                  <MDBDropdownItem href="/product-list">Products</MDBDropdownItem>
                  <MDBDropdownItem href="/order-list">Orders</MDBDropdownItem>
                  <MDBDropdownItem href="/userlist">Users</MDBDropdownItem>
                </MDBDropdownMenu>
                </MDBDropdown>
              )}
              </MDBNavItem>
              
              <MDBNavItem>
                {userInfo && userInfo.isSeller && (
                <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Seller View</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/products/seller">Products</MDBDropdownItem>
                  <MDBDropdownItem href="/orderes/seller">Orders</MDBDropdownItem>
                </MDBDropdownMenu>
                </MDBDropdown>
              )}
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
                    <MDBDropdownItem href="/profile">Profile</MDBDropdownItem>
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



