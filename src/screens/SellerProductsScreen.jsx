import React, { useEffect } from 'react'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductCard from '../components/ProductCard'
import { useSelector, useDispatch } from 'react-redux';
import { fetch_product_by_seller_list } from '../actions/productActions';

function SellerProductsScreen() {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  // console.log(userInfo._id);

  const products_by_seller_list = useSelector(state => state.productsBySellerDetails);
  const {loading, error, products_by_seller} = products_by_seller_list;

  useEffect(() => {
    dispatch(fetch_product_by_seller_list(userInfo._id));
  }, [dispatch]);


  return (
    <div class="products">
        {loading ? (
            <LoadingBox/>
        ) : error ? (
            <MessageBox variant='error'>{error}</MessageBox> 
        ) : products_by_seller.length === 0 ? (
            <MessageBox variant='neutral'>You do not have any active listings</MessageBox> 
        ) : (
            <>
            {products_by_seller.map(item => {
                return <ProductCard key = {item._id} item={item}/>
            })}
            </>
        )}  
    </div>
  )
}

export default SellerProductsScreen