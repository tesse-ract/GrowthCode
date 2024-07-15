import {Fragment, React, useEffect} from 'react';
import img from './image/homeImage.png';
import Items from './Items.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeProducts } from '../../reducers/productSlice.js';
import { Link } from 'react-router-dom';

export default function Home() {

    const { products, loading, error } = useSelector((state) => state.productSlice);
    console.log(products);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchHomeProducts(1));
    }, [dispatch])

    if (loading) {
        return <div>Loading...fetching</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

  return (
    <Fragment>
        <div className='w-full'>
      <div className='home w-full h-auto overflow-hidden mt-8 '>
        <div className='landing flex flex-col lg:flex-row w-full justify-center'>
            <div className='lg:w-8/12 lg:p-16  flex flex-col justify-evenly mb-4 lg:mb-10'>
                <div className='heading font-bold mb-4 pl-2'>
                    <h2 className=' md:text-7xl font-bold xs:text-5xl text-4xl'>Your Path to become a Marketing Mastery</h2>
                </div>
                <div className='para mb-4 mt-4 pl-4'>
                   <p className='md:text-lg'>Unlock Your Potential with Expert-Led Courses, Tools, Case Studies and Templates.</p>
                </div>
                <div className='btn mb-10 pl-2'>
                    <p className='border-2 p-3 px-6 bg-black text-white rounded-r-full rounded-l-full '><Link to='/product'>
                    Learn More
                    </Link></p>
                </div>
                <div className='data flex flex-row pl-2 '>
                    <div className='data1 border-r-2 pr-5 mr-5'>
                        <h2 className='text-3xl font-bold'>200+</h2>
                        <p id='d1'>Courses</p>
                    </div>
                    <div className='data2 border-r-2 pr-5 mr-5'>
                        <h2 className='text-3xl font-bold'>20,000+</h2>
                        <p id='d2'>Downloads</p>
                    </div>
                    <div className='data3'>
                        <h2 className='text-3xl font-bold'>9,000+</h2>
                        <p id='d3'>Happy Students</p>
                    </div>
                </div>
            </div>
            <div className='right'>
                <img src={img} width={1550}  alt='img'/>
            </div>
        </div>
      </div>

      <div className='brandLogo bg-black flex items-center justify-center'>
            <h2 className='text-white font-bold text-sm p-2 lg:text-2xl'>Unlock Your Potential with Expert-Led Courses, Strategic Tools, and Comprehensive Marketing Resources</h2>
        </div>

        <div className='product pb-10 min-h-48'>
                <h2 className='text-5xl font-bold  text-center  mt-16 mb-8 underline md:text-7xl xs:text-5xl'>TRENDING</h2>
                <div className='item-container w-full flex justify-center'>

                    <div className='lg:w-9/12 items flex flex-row flex-wrap justify-evenly '>
                    {
                        products.map((product) => (
                                <Items key={product._id} product={product} /> 
                        ))
                    }
                    
                </div>

                </div>
                <div className='w-full flex justify-center mt-2'>
                    <p className='btn border-2 p-3 px-6 text-black font-bold rounded-r-full rounded-l-full hover:cursor-pointer '>
                    <Link to='/product'>
                    View All
                    </Link>    </p>
                </div>
        </div>
        </div>
    </Fragment>
  )
}
