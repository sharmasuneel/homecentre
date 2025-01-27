import React, { useEffect, useState } from 'react';
import http from '../services/fetch';
import { useParams } from 'react-router';
import ProductComponent from './ProductComponent';
import { useDispatch } from 'react-redux';
import { hideSideBar } from '../redux/slices/AppSlice';

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(hideSideBar())
    http
      .get(`/products/${productId}`)
      .then((res) => {
        setProductDetails(res);
      })
      .catch(() => {
        setProductDetails(null);
      });
  }, []);

  return (
    <>
      {productDetails ? (
        <ProductComponent product={productDetails} />
      ) : (
        <div className='flex flex-1 items-center justify-center bg-gray-100'>
          <h2 className='text-2xl font-semibold text-red-600'>
            {`Can not found Product: ${productId}`}
          </h2>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
