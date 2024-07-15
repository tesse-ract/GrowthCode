import React, { Fragment } from 'react';
import p from './p3.png';
import { removeItem } from '../../../reducers/AddToCart';
import { useDispatch } from 'react-redux';

function CartItems({ item }) {
  //INCREMENT AND DECREMENT
  const dispatch = useDispatch();

  console.log("items in cart", item);

  return (
    <Fragment>
      <div className='w-full flex justify-center'>
      <div className='flex flex-col sm:flex-row border-2 border-[#0000001a] p-4 mb-2 rounded-lg justify-between mx-2 xs:w-8/12 sm:w-full'>

        <div className='mb-4 sm:mr-4 md:mb-0 md:mr-6 flex justify-center'>
          <img className='rounded-2xl' src={item.productImg
[0].url || p} alt='product' width={200} />
        </div>

        <div className='flex flex-col md:flex-row justify-between w-full md:w-10/12'>
          <div className='details flex flex-col justify-between'>
            <div className='heading'>
              <h2 className='font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl'>{item.name}</h2>
            </div>
            <div className='rating flex'>
              <div className='star mr-2'>
                <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
              </div>
              <div className='points'>
                {item.rating}/5
              </div>
            </div>
            <div className='font-bold text-2xl md:text-3xl'>${item.price}</div>
          </div>

          <div className='count flex flex-col justify-between items-end md:items-center'>
            <div className='dltIcon'>
              <i className="fas fa-trash-alt" style={{color: "#FF0000"}} onClick={() => dispatch(removeItem(item.productId))}></i>
            </div>
            <div className='bg-[#f0f0f0] p-3 w-32 flex flex-row rounded-r-full rounded-l-full hover:cursor-pointer justify-evenly mt-4 md:mt-0'>
              {/* <button className='minus px-2'><b>-</b></button> */}
              <div className='count'><b>{item.quantity}</b></div>
              {/* <button className='plus px-2'><b>+</b></button> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  )
}

export default CartItems;
