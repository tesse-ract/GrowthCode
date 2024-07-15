import React, { Fragment } from 'react';
import ShippingStatus from './ShippingStatus';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShippingInfo() {
    const shippingInfo = useSelector((state) => state.cart.shippingInfo);
    console.log("shipping info", shippingInfo);

    const cart = useSelector((state) => state.cart);
    // Calculate the total amount
    const totalAmount = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const charge = 20;
    const GST = (18 * totalAmount) / 100;

    return (
        <Fragment>
            <div className='mt-10 mb-8'>
                <ShippingStatus activeStep={1} />

                <div className='mt-10 w-full flex justify-center h-full md:h-screen'>
                    <div className=' flex flex-col lg:flex-row justify-between w-11/12 lg:w-3/4'>
                        <div className=' flex flex-col lg:w-2/3 mb-2 lg:mb-0 lg:mr-10'>
                            <div className=' border-2 border-black p-4 h-fit rounded-xl flex-row'>
                                <div>
                                <h2 className='font-bold text-2xl mb-2'>Shipping Info</h2>
                                </div>
                                
                                <div className="flex flex-row sm:flex-row justify-around mt-3">
                                    <div className='flex flex-col justify-between'>
                                        <p className='font-semibold md:text-xl mb-2'>Address</p>
                                        <p className='font-semibold md:text-xl mb-2'>City</p>
                                        <p className='font-semibold md:text-xl mb-2'>State</p>
                                        <p className='font-semibold md:text-xl mb-2'>Country</p>
                                        <p className='font-semibold md:text-xl mb-2'>Pin Code</p>
                                        <p className='font-semibold md:text-xl mb-2'>Phone Number</p>
                                    </div>
                                    <div className='flex flex-col justify-between items-center'>
                                        <p>:</p>
                                        <p>:</p>
                                        <p>:</p>
                                        <p>:</p>
                                        <p>:</p>
                                        <p>:</p>
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <span>{shippingInfo.address}</span>
                                        <span>{shippingInfo.city}</span>
                                        <span>{shippingInfo.state}</span>
                                        <span>{shippingInfo.country}</span>
                                        <span>{shippingInfo.pinCode}</span>
                                        <span>{shippingInfo.phoneNo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" border-2 border-black w-full lg:w-1/3 rounded-xl p-4 flex flex-col justify-center h-fit">
                            <h2 className='font-bold text-2xl text-center'>Order Summary</h2>
                            <div className='border-y-2 border-black flex flex-row sm:flex-row justify-around mt-4 pb-2'>
                                <div className='flex flex-col justify-between'>
                                    <p className='my-2 font-bold md:text-xl'>Subtotal:</p>
                                    <p className='my-2 font-bold md:text-xl'>Shipping Charges:</p>
                                    <p className='my-2 font-bold md:text-xl'>GST:</p>
                                </div>
                                <div className='flex flex-col justify-between items-center'>
                                    <p>:</p>
                                    <p>:</p>
                                    <p>:</p>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <span>₹{totalAmount.toFixed(2)}</span>
                                    <span>₹{charge}</span>
                                    <span>₹{GST}</span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between mt-2 p-4">
                                <p>
                                    <b>Total:</b>
                                </p>
                                <span>₹{(totalAmount + charge + GST).toFixed(2)}</span>
                            </div>

                            <button className='bg-black m-2 p-4 text-white rounded-full'>
                                <Link to='/payment'>
                                    Proceed To Payment
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ShippingInfo;
