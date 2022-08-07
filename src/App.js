import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Footer from './components/Footer.jsx';

import Navbar from "./components/Navbar.jsx"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import BookingScreen from "./screens/BookingScreen"
import SigninScreen from './screens/SigninScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import BillingAddress from './screens/BillingAddressScreen.jsx';
import PaymentMethodScreen from './screens/PaymentMethodScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import OrderHistoryScreen from './screens/OrderHistoryScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.js';
import AdminRoute from './components/AdminRoute.js';
import UserListScreen from './screens/UserListScreen.jsx';

import Test from './screens/Test.jsx';



function App() {
  return (
    <div className="App">
    <BrowserRouter>

      <Navbar/>

      <Route exact path="/signin" component={SigninScreen}/>
      <Route exact path="/register" component={RegisterScreen}/>
      <PrivateRoute exact path="/profile" component={ProfileScreen}/>
      {/* <AdminRoute exact path="/admin" component={ProfileScreen}/> */}
      <AdminRoute exact path="/userlist" component={UserListScreen}/>
      <Route exact path="/order-history" component={OrderHistoryScreen}/>
      <Route exact path="/order/:id" component={OrderScreen}/>
      <Route exact path="/placeorder" component={PlaceOrderScreen}/>
      <Route exact path="/payment" component={PaymentMethodScreen}/>
      <Route exact path="/shipping" component={BillingAddress}/>
      <Route exact path="/bookings/:id?" component={BookingScreen}/>
      <Route exact path="/" component={HomeScreen}/>
      <Route path="/product/:id" component={ProductScreen}/>

      <Route path="/test" component={Test}/>
      {/* <Footer/> */}

    </BrowserRouter>
    </div>
  );
}

export default App;