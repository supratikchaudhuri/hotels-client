import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Footer from './components/Footer.jsx';

import Navbar from "./components/Navbar.jsx"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"


function App() {
  return (
    <div className="App">
    <BrowserRouter>

      <Navbar/>

      <Route exact path="/" component={HomeScreen}/>
      <Route path="/product/:id" component={ProductScreen}/>

      <Footer/>

    </BrowserRouter>
    </div>
  );
}

export default App;