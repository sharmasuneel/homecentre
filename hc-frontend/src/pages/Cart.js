import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/slices/CartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, amount) => {
    dispatch(addCartItem({ id, amount }))
  };

  const handleRemoveItem = (id) => {
    console.log(cartItems);
    dispatch(removeCartItem(id))
  };

  console.log(cartItems)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckoutProducts = () => {
    console.log(cartItems)
  }

  return (
    <div className='container mx-auto '>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-2xl font-bold text-center mb-6'>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className='text-center text-gray-500'>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className='flex items-center justify-between border-b py-4'
              >
                <div>
                  <h3 className='text-lg font-medium'>{item.name}</h3>
                  <p className='text-sm text-gray-600'>Price: &#8377;{item.price}</p>
                  {/* <p className='text-sm text-gray-600'>
                    Quantity: {item.quantity}
                  </p> */}
                </div>
                <div className='flex items-center'>
                  <button
                    className='px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold mr-2'
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className='text-sm text-gray-600'>
                    {item.quantity}
                  </span>
                  <button
                    className='px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold ml-2 mr-2'
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className='px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded-lg text-sm font-semibold'
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className='mt-6 text-right'>
          <h3 className='text-xl font-semibold'>
            Total: &#8377;{totalPrice.toFixed(2)}
          </h3>
        </div>
        <button
          className={`w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 &#8377;{
            cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={cartItems.length === 0}
          onClick={() => handleCheckoutProducts()}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
