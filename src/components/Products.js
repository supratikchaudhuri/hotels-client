import React, {useEffect, useState} from 'react';
import ProductCard from "./ProductCard";
import axios from "axios";

import LoadingBox from "./LoadingBox"
import MessageBox from "./MessageBox"

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data} = await axios.get("/api/products");
                setProducts(data);
                setLoading(false)
            } 
            catch(err) {
                setError(err); 
                setLoading(false)
            }
        }

        fetchData();
    }, []);

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