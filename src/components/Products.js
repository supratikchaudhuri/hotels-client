import React, {useEffect} from 'react';
import ProductCard from "./ProductCard";

import LoadingBox from "./LoadingBox"
import MessageBox from "./MessageBox"
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const Products = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div class="products">
            {loading ? (
                <LoadingBox/>
            ) : error ? (
                <MessageBox>{error}</MessageBox> 
            ) : (
                <>
                {products.map(item => {
                    return <ProductCard key = {item._id} item={item}/>
                })}
                </>
            )}  
        </div>
    )
};

export default Products     