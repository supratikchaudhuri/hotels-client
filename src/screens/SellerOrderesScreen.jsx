import React, { useEffect } from 'react'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useSelector, useDispatch } from 'react-redux';
import { fetch_product_by_seller_list } from '../actions/productActions';
import { MDBBtn } from 'mdbreact';

function SellerOrderesScreen() {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;

  const products_by_seller_list = useSelector(state => state.productsBySellerDetails);
  const {loading, error, products_by_seller} = products_by_seller_list;


  useEffect(() => {
    dispatch(fetch_product_by_seller_list(userInfo._id));
  }, [dispatch]);

  const getOderDetails = (product, customer) => {
    console.log(customer, product);
  }

  return (
    <div>
      <h1>Order History</h1>
      {
        loading ? <LoadingBox/> :
        error ? <MessageBox>{error}</MessageBox> 
        :
        <table className="table">
        <thead>
          <tr>
          <th>Product</th>
          <th>Ordered By</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
        
          {products_by_seller.map((product, index) => (
            <React.Fragment key = {'product-' + index}>
              {product.orderedBy.map((customer, index) => (
                <tr key={'customer-'+index}>
                  <td>{product.name}</td>
                  <td>{customer.customerId}</td>
                  <td>
                  <MDBBtn color="primary" size="sm" outline
                    onClick={() => getOderDetails(product._id, customer.customerId)}
                  >
                  More Info
                  </MDBBtn>
                  </td>
                </tr>
              ))}
            </React.Fragment> 
          ))}
        </tbody>
        </table>
      }
  </div>
  )
}



export default SellerOrderesScreen



