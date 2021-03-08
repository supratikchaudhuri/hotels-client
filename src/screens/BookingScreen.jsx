import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import CheckoutCard from '../components/CheckoutCard';
import { MDBIcon } from 'mdbreact';
import MessageBox from '../components/MessageBox';

function BookingScreen(props) {
    const productID = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }


    return (
        <div className="bookingScreen">
            <h1 style={{margin: '20px', color: 'purple'}}>Bookings Page</h1>
            {cartItems.length === 0 ? 
            <MessageBox>Cart is empty. <Link to='/'>Browse Hotels here</Link></MessageBox> :
            (
                <>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.product} className="items">
                            <div className="itemRow">
                                <div className="col">
                                    <img src={item.image} alt={item.name} className="small-img"/>
                                </div>
                                
                                <div className="col min-30">
                                    <Link to={`/product/${item.product}`} style={{fontWeight: '500', fontFamily: 'sans-serif'}}>{item.name}</Link>
                                </div>

                                <div className="col">
                                    <select 
                                    value={item.qty} 
                                    onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.available).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col">${item.price}</div>

                                <div className="col">
                                    <button onClick={() => removeFromCartHandler(item.product)}><MDBIcon icon="trash-alt" style={{color: 'purple'}}/></button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <CheckoutCard cartItems={cartItems}/>
                </>
            )}
        </div>
    )
}

export default BookingScreen
