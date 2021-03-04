import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBTooltip } from 'mdbreact';
import Rating from "./Rating"
import { Link } from 'react-router-dom';

const ProductCard = ({item}) => {
  return (
    <section style={{width: '25%', margin: '20px'}} className='text-center my-5  sm-12 md-4'>
    <Link to={`product/${item._id}`}>
      
      <MDBRow>
        <MDBCol  className='mb-lg-12 mb-4'>
          <MDBCard wide ecommerce>
            <MDBCardImage
              cascade
              src={item.image}
              top
              alt='sample photo'
            />
            <MDBCardBody cascade className='text-center'>
              <a href='/' className='text-muted'>
                <h5>{item.category}</h5>
              </a>
              <MDBCardTitle>
                <strong>
                  <a href='/'>{item.name}</a>
                </strong>
              </MDBCardTitle>
              <MDBCardText>{item.description}</MDBCardText>

              <Rating rating={item.rating} numReviews={item.numReviews}/>

              <MDBCardFooter className='px-1'>
                <span className='float-left font-weight-bold'>
                  <strong>{item.price}</strong>
                </span>
                <span className='float-right'>
                  <MDBTooltip domElement placement='top'>
                    <i className='grey-text fa fa-heart mr-3' />
                    <span>Add to Whishlist</span>
                  </MDBTooltip>{' '}
                  <MDBTooltip domElement placement='top'>
                    <i className='grey-text fa fa-shopping-cart' />
                    <span>Add to Cart</span>
                  </MDBTooltip>
                </span>
              </MDBCardFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        
      </MDBRow>
    </Link>
    </section>
  );
};

export default ProductCard;


