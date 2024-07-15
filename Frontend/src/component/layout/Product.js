import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Items from './Items';
import { fetchHomeProducts, fetchProductsByName, fetchProductsByKeyword } from '../../reducers/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function valuetext(value) {
    return `${value}`;
}

function Product() {
    const [price, setPrice] = useState([20, 200]);
    const [page, setPage] = useState(1);
    const [priceVal, setPriceVal] = useState([0, 1000000]);
    const [category, setCategory] = useState("");

    const handlePriceChange = (event, newValue) => {
        setPrice(newValue);
    };

    const applyFilter = () => {
        setPage(1);
        setPriceVal(price);
    };

    const handleNextPage = () => {
        if(products.length>0){
            setPage(page => page + 1);
        }
        
    };

    const handlePrevPage = () => {
        setPage(page => Math.max(page - 1, 1));
    };

    const { products, loading, error } = useSelector((state) => state.productSlice);
    const dispatch = useDispatch();
    const { keyword } = useParams();

    useEffect(() => {
        if (keyword && category) {
            dispatch(fetchProductsByName({ keyword, page, priceVal, category }));
            
        }else if(keyword){
            dispatch(fetchProductsByKeyword(keyword))
        }
         else {
            dispatch(fetchHomeProducts(page));
        }
    }, [dispatch, keyword, page, priceVal, category]);

    if (loading) {
        return <div>Loading...fetching</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Fragment>
            <div className=" w-full flex justify-center mt-10 mb-10">
                <div className="w-11/12 flex flex-col-reverse lg:flex-row h-full justify-center">
                 <div className="w-full lg:w-1/5 rounded-2xl mr-4 h-auto lg:h-10/12 md:h-2/3 border-2 border-[#0000001a] p-4 mb-4 md:mb-0">
                        <div className=" border-b-2 border-[#0000001a] flex flex-row justify-between pb-2">
                            <p className="font-bold text-xl">Filter</p>
                            <i className="fa-solid fa-filter p-2" style={{ color: "#b0b0b0" }}></i>
                        </div>
                        <div className="priceSlider flex justify-center">
                            <div className="flex flex-col justify-center border-b-2 border-[#0000001a]">
                                <div>
                                    <h2 className="block font-bold">Price</h2>
                                </div>
                                <div >
                                    <Box  className="w-64 xs:w-72 sm:w-96 md:w-[27rem] lg:w-40 " >
                                        <Slider
                                            getAriaLabel={() => 'Price range'}
                                            value={price}
                                            onChange={handlePriceChange}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                            sx={{
                                                '& .MuiSlider-track': {
                                                    color: 'black',
                                                },
                                                '& .MuiSlider-thumb': {
                                                    color: 'black',
                                                },
                                            }}
                                            min={10}
                                            max={10000}
                                        />
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className=" m-3 border-b-2 border-[#0000001a] pb-2">
                            <div>
                                <h2 className="font-bold text-xl">Categories</h2>
                            </div>
                            <div>
                                <li className="list-none text-base text-zinc-600 font-normal p-1 hover:cursor-pointer" onClick={() => setCategory('casestudies')}>Case Studies</li>
                                <li className="list-none text-base text-zinc-600 font-normal p-1 hover:cursor-pointer" onClick={() => setCategory('ebooks')}>E-Book</li>
                                <li className="list-none text-base text-zinc-600 font-normal p-1 hover:cursor-pointer" onClick={() => setCategory('courses')}>Courses</li>
                                <li className="list-none text-base text-zinc-600 font-normal p-1 hover:cursor-pointer" onClick={() => setCategory('adtemplates')}>Ad Templates</li>
                                <li className="list-none text-base text-zinc-600 font-normal p-1 hover:cursor-pointer" onClick={() => setCategory('contentcalendar')}>Content Calendar</li>
                            </div>
                        </div>
                        <div className="applyFilter-btn border-2 p-2 w-40 text-white bg-black rounded-r-full rounded-l-full hover:cursor-pointer text-center mx-auto mt-4">
                            <button onClick={applyFilter}>Apply Filter</button>
                        </div>
                    </div>
                    <div className="w-full mb-4 flex flex-col">
                        <div className=" flex flex-row justify-center w-full mb-4">
                            <div className="flex flex-row justify-between w-11/12">
                                <div>
                                    <h2 className="font-bold text-2xl md:text-4xl">Products</h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap justify-center">
                            {products.length >0 ? (products.map((product) => (
                                <Items key={product._id} product={product} />
                            ))):(<p className='text-2xl font-bold h-96 text-blue-500'>No more product to show</p>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="paginationBox w-full flex justify-center mb-4">
                <div className="pagination_btn flex flex-row items-center border-2 border-black rounded-lg">
                    <div className="border-r-2 cursor-pointer border-black px-4 p-2 font-bold" onClick={handlePrevPage}>{page>1?(<p>Prev</p>):(<p className='text-slate-500'>Prev</p>)}</div>
                    <div className="border-r-2 border-black px-4 p-2 font-bold">{page}</div>
                    <div className="cursor-pointer px-4 p-2 font-bold" onClick={handleNextPage}>{products.length>0?(<p>Next</p>):(<p className='text-slate-500'>Next</p>)}</div>
                </div>
            </div>
        </Fragment>
    );
}

export default Product;
