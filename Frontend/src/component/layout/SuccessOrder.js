import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function SuccessOrder() {
    return (
        <Fragment>
            <div className='my-10 mb-[140px] min-h-[30rem] flex justify-center w-full'>
                <div className='p-10  flex flex-col justify-center'>
                    <i className="my-4 text-center text-6xl md:text-7xl lg:text-8xl fa-regular fa-circle-check" style={{ color: "#FF6B00" }}></i>
                    <p className='text-center text-2xl md:text-3xl lg:text-4xl text-[#FF6B00] my-4'>🎉 Your Order has been placed successfully 🎉</p>
                   
                    <Link to="/orders" className='bg-black p-4 text-center text-white rounded-full mt-2 mx-20'>View Orders</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default SuccessOrder
