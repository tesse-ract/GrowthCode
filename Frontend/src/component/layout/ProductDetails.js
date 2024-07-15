import p1 from './image/p2.png'
import ReviewCard from './ReviewCard'
import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../reducers/GetProductDetails';
import { useParams } from 'react-router-dom';
import { addItemToCart } from '../../reducers/AddToCart';

function ProductDetails() {

  const [quantity, setQuantity] = useState(1);
  const [add, setAdd] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.productDetailSlice); //reducer name

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }else{
    console.log("product in pDetaials ", product);
  }

  //INCREMENT AND DECREMENT
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  //ADD TO CART LOGIC
  const addToCart = () => {
    // Create an item object with product details and quantity
    const item = {
      productId: id,
      productImg:product.images,
      name: product.name,
      rating: product.ratings,
      price: product.price,
      quantity: quantity,
    };

    dispatch(addItemToCart(item));
    setAdd(true);

  };


  return (
    <Fragment>
      <div className='productDetails p-5  w-full flex justify-center'>
        <div className='productDetails w-11/12 lg:w-8/12 flex flex-col md:flex-row '>

          <div className="productImage mt-2">
            <img className="rounded-2xl h-64 w-full object-cover sm:h-96" src={product.images[0].url || p1} alt="product_Image" />
          </div>


          <div className='mt-4 md:w-6/12 md:ml-6'>
            <div className='text-xl md:text-4xl font-bold'>
              <h2 className='w-full'>{product.name}</h2>
            </div>

            <div className='productRating mt-2 mb-2 flex '>
              <div className='star mr-2'>
                <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
                <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
                <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
                <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
                <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
              </div>
              <div className='points'>
                {product.ratings}/5
              </div>
            </div>
            <div className='productPrice font-bold md:text-4xl text-2xl mt-2 mb-2'><h2>${product.price}</h2>
            </div>
            <div className='productDescription mt-2 mb-2'>
              <p>{product.description}</p>
            </div>

            <div className='productLine'></div>

            <div className='mt-2 mb-2'><h2 className='text-black inline font-bold text-xl' >Status: <p className={`inline ml-1 text-xl font-bold ${product.stock ? 'text-green-600' : 'text-red-600'}`}>{product.stock ? 'InStock' : 'Out of Stock'}</p> </h2></div>

            <div className='productLine'></div>

            <div className='productBtn mt-4 flex flex-row justify-start '>

              <div className='bg-[#f0f0f0] p-3 w-40 flex flex-row  rounded-r-full rounded-l-full hover:cursor-pointer justify-evenly'>
                <button className='minus px-2' onClick={decrementQuantity}><b>-</b></button>
                <div className='count'><b>{quantity}</b></div>
                <button className='plus px-2' onClick={incrementQuantity}><b>+</b></button>
              </div>


              <div className='border-2 p-3 w-96 text-white bg-black rounded-r-full rounded-l-full ml-4 hover:cursor-pointer text-center ' onClick={addToCart} > {!add ? (<p>Add To Cart</p>) : (<p>Added</p>)}
              </div>

            </div>
          </div>
        </div>
      
      </div>


      <div className='productReview w-full flex justify-center flex-col mb-4'>
        <div className='reviewElement w-10/12   justify-center mx-auto'>

          <div className='reviewHeading text-center mt-6'>
            <p className='text-xl font-medium text-center'>Rating & Review</p>
          </div>

          <div className='w-full flex flex-col justify-center'>

            <div className='reviewLine border-b-2 border-[#0000001a] mt-2 mb-4'></div>

            <div className='review&btn flex flex-row justify-between'>
              <div className='reviewCount'>
                <p className='font-bold text-2xl'>All Review({product.numOfReviews})</p>
              </div>
              <div className='writeReview border-2 p-2 w-40 text-white bg-black rounded-r-full rounded-l-full ml-4 hover:cursor-pointer text-center '>
                write Reivew
              </div>
            </div>

            <div className='userReview flex flex-row flex-wrap justify-between'>

              {product.numOfReviews ? (Object.values(product.reviews).map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))):(<p className=' items-center'>No Review for this product</p>)}
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductDetails
