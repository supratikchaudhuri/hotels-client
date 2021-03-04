import React from 'react'
import AddItemCard from '../components/AddItemCard'
import Carousel from '../components/Carousel'
import DescriptionCard from '../components/DescriptionCard'
import data from "../data.js";
import { useParams } from 'react-router-dom';

function ProductScreen() {
    const {id} = useParams();
    const product = data.products.find((x) => x._id == id)//no strinct matching cause one is string and other is number

    if(!product)
        return (
            <div>Product Not Found</div>
        )

    return (
        <div className="product-page">
            <Carousel product={product}/>

            <div className="part-2">

                <DescriptionCard product={product}/>
                <AddItemCard product={product}/>

            </div>
        </div>
    )
}

export default ProductScreen
