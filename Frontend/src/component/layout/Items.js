import React from 'react'
import p2 from './image/p3.png';
import { Link } from 'react-router-dom';

export default function Items({ product }) {
  // if (!product) {
  //   return null; // Or render some fallback UI
  // }
  console.log(product.images);
  return (
    <>
      <div className='m-2 w-64 shadow-md p-2 rounded-2xl'>
      <Link to={`/product/${product._id}`} className='item1 '>
                        <div className=' rounded-3xl'>
                            <img src={product.images[0].url || p2} alt='course' height={180} className=' rounded-3xl'/>
                        </div>
                        <div className='heading '>
                            <p className='font-bold text-xl'>{product.name}</p>
                        </div>
                        <div className='rating flex '>
                            <div className='star mr-2'>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            <i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                            </div>
                            <div className='points'>
                                {product.ratings}/5
                            </div>
                        </div>
                        <div className='price font-bold'>${product.price}</div>
      </Link>
      </div>
    </>
  )
}
