import React from 'react'
import AddItemCard from '../components/AddItemCard'
import Carousel from '../components/Carousel'
import DescriptionCard from '../components/DescriptionCard'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useEffect } from 'react';
import { detailsProduct } from '../actions/productActions';

function ProductScreen() {

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    const {id} = useParams();

    useEffect(() => {
        dispatch(detailsProduct(id));
    }, [dispatch, id])


    return (

        <div className="product-page">
            {loading ? (
                <LoadingBox/>
            ) : error ? (
                <MessageBox>{error}</MessageBox> 
            ) : (
                <>
                    <Carousel product={product}/>

                    <div className="part-2">
                        <DescriptionCard product={product}/>

                        {product.available > 0 && <AddItemCard product={product}/>}
                    </div>
                </>
            )}  
        </div>


        
    )
}

export default ProductScreen
