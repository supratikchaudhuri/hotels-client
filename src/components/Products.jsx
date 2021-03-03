import React from 'react'
import ProductCard from "./ProductCard";
import data from "../data.js"

function Products() {
    return (
        <div class="products">
            {data.products.map(item => {
                return <ProductCard key = {item._id} item={item}/>
            })}
        </div>
    )
}

export default Products
