/** @format */

import React, { useState, useEffect } from 'react';
// import { API } from '../backend';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import PaymentB from './PaymentB';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => (
    <div>
      <h2 className='lead'>Your products</h2>
      {products?.map((product, index) => (
        <Card
          key={index}
          product={product}
          removeFromCart={true}
          addtoCart={false}
          setReload={setReload}
          reload={reload}
        />
      ))}
    </div>
  );

  // const loadCheckout = () => {
  //   return (
  //     <div>
  //       <h1>This section for checkout </h1>
  //     </div>
  //   );
  // };

  return (
    <Base title='Cart Page' description='Ready to checkout'>
      <div className='row text-center '>
        <div className='col-sm-5 py-3 py-sm-0 mb-2'>
          {products?.length > 0 ? loadAllProducts(products) : <h4>No products in the cart</h4>}
        </div>
        <div className='col-sm-5 py-3 py-sm-0 mb-2'>
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
