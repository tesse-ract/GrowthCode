import React, { Fragment } from 'react';
import CartItems from './CartItems';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CartProduct() {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  console.log("user in cart", user);

  // Calculate the total amount
  const totalAmount = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (cart) {
    console.log("cart pro", cart);
  }

  return (
    <Fragment>
      <div className='w-full flex justify-center m-2'>
        <div className='w-full sm:w-9/12 lg:w-9/12 flex flex-col items-center justify-center mt-10 mb-20'>
          <div className='font-bold text-2xl justify-start w-full px-4 lg:px-0 lg:w-3/4'>
            <h2 className='text-4xl mb-2'>Your Cart</h2>
          </div>

          <div className=' flex flex-col justify-between w-full px-4 lg:px-0 lg:w-3/4 max-h-[600px] p-2 rounded-xl border-2 border-[#0000001a] overflow-y-auto'>
            <div className='cartProduct rounded-2xl w-full'>
              {cart.items.length > 0 ? (
                cart.items.map((item) => (
                  <CartItems key={item.productId} item={item} />
                ))
              ) : (
                <p className='w-full h-96 text-red-600 font-bold text-center text-4xl'>
                  CART IS EMPTY
                </p>
              )}
            </div>

            {cart.items.length>0?(<div className='border-2 border-[#0000001a] rounded-2xl h-fit p-5 mt-4'>
              <div className=' font-bold text-2xl border-b-2 border-[#0000001a] pb-4'>
                Order Summary
              </div>
              <div className='flex flex-col md:flex-row justify-between p-2 pb-4'>
                <div className='text-xl'>Total</div>
                <div className='font-bold text-2xl'>${totalAmount.toFixed(2)}</div>
              </div>
              <div className=' border-2 p-3 w-full text-white bg-black rounded-r-full rounded-l-full mt-4 hover:cursor-pointer text-center '>
                <Link to='/shippingDetails' className='block w-full h-full'>
                  Go To Checkout <span style={{ fontSize: "20px" }}>&#8594;</span>
                </Link>
              </div>
            </div>):""}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CartProduct;
